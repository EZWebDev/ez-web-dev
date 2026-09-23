#!/usr/bin/env node
/**
 * Emits dist/sitemap.xml, dist/feed.xml (RSS 2.0) and dist/llms.txt from the same
 * data the site renders: getSiteIndex(), business and blogPosts (loaded from the SSR
 * bundle in dist-ssr/, because the sources contain JSX).
 *
 * robots.txt is static (public/robots.txt) and is NOT written here.
 *
 * SITE_URL (or VITE_SITE_URL) overrides the origin; defaults to business.url
 * (https://ezweb.dev). The build fails if it is set to a non-https or localhost URL.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

try {
  const { config } = await import('dotenv')
  config({ quiet: true })
} catch {
  // dotenv is optional
}

const root = process.cwd()
const distDir = path.resolve(root, 'dist')
const ssrEntry = path.resolve(root, 'dist-ssr', 'entry-server.js')
if (!fs.existsSync(distDir) || !fs.existsSync(ssrEntry)) {
  console.error('[sitemap] dist/ or dist-ssr/entry-server.js not found. Run `npm run build` first.')
  process.exit(1)
}

const { getSiteIndex, business, blogPosts } = await import(pathToFileURL(ssrEntry).href)

const rawSiteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').trim()
if (rawSiteUrl) {
  let u
  try {
    u = new URL(rawSiteUrl)
  } catch {
    console.error(`[sitemap] SITE_URL is not a valid URL: ${rawSiteUrl}`)
    process.exit(1)
  }
  if (u.protocol !== 'https:' || /(^|\.)localhost$|^127\.|^0\.0\.0\.0$|^\[::1\]$/.test(u.hostname)) {
    console.error(`[sitemap] SITE_URL must be a public https:// URL (got ${rawSiteUrl}).`)
    process.exit(1)
  }
}
const SITE_URL = (rawSiteUrl || business.url).replace(/\/+$/, '')
if (SITE_URL !== business.url) {
  console.warn(`[sitemap] Note: SITE_URL (${SITE_URL}) differs from business.url (${business.url}); canonicals in the HTML still use business.url.`)
}

const abs = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.replace(/\/+$/, '')}`)
const xml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const pages = getSiteIndex()
const indexable = pages.filter((p) => !p.noindex)

// ---------------------------------------------------------------- sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (p) => `  <url>
    <loc>${xml(abs(p.path))}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${Number(p.priority).toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)

// ---------------------------------------------------------------- feed.xml (RSS 2.0)
const rfc822 = (d) => new Date(`${d}T12:00:00Z`).toUTCString()
const posts = blogPosts
  .map((p) => ({ ...p, updated: p.updated ?? p.date }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
const author = `${business.founder.email} (${business.founder.name})`
const lastBuild = posts.reduce((max, p) => (p.updated > max ? p.updated : max), posts[0]?.updated ?? '1970-01-01')

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(`${business.name} Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${xml(`Articles on web design, SEO and AI search from ${business.name} in ${business.primaryCity}, ${business.address.addressRegion}.`)}</description>
    <language>en-us</language>
    <copyright>${xml(`© ${business.legalName}`)}</copyright>
    <managingEditor>${xml(author)}</managingEditor>
    <webMaster>${xml(author)}</webMaster>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${posts
  .map(
    (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${xml(abs(`/blog/${p.slug}`))}</link>
      <guid isPermaLink="true">${xml(abs(`/blog/${p.slug}`))}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xml(p.description)}</description>
      <author>${xml(author)}</author>
      <dc:creator>${xml(business.founder.name)}</dc:creator>
${(p.tags ?? []).map((t) => `      <category>${xml(t)}</category>`).join('\n')}
    </item>`.replace(/\n\n/g, '\n'),
  )
  .join('\n')}
  </channel>
</rss>
`
fs.writeFileSync(path.join(distDir, 'feed.xml'), feed)

// ---------------------------------------------------------------- llms.txt (llmstxt.org)
const md = (s) => String(s).replace(/\s+/g, ' ').trim()
const a = business.address
const suffix = new RegExp(`\\s*[|·–-]\\s*${business.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`)
const link = (p) => `- [${md(p.title).replace(suffix, '')}](${abs(p.path)}): ${md(p.description)}`
const byKind = (k) => indexable.filter((p) => p.kind === k)
const staticPage = (pathName) => indexable.find((p) => p.path === pathName)
const confusedWith = business.notToBeConfusedWith
  .map((c) => [c.name, c.location, c.domain].filter(Boolean).join(', '))
  .map((s) => s.replace(/^([^,]+), (.*)$/, '$1 ($2)'))
  .join('; ')

const companyPages = ['/', '/about', '/services', '/locations', '/contact', '/blog'].map(staticPage).filter(Boolean)

const llms = `# ${business.name}

> ${md(business.description)}

Key facts:

- Legal name: ${business.legalName} (also known as ${business.alternateNames.join(', ')})
- Address: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, ${a.addressCountry}
- Phone: ${business.phoneDisplay} (${business.phone})
- Email: ${business.email}
- Website: ${business.url}
- Founder: ${business.founder.name}, ${business.founder.jobTitle}
- Founded: ${business.foundingDate}
- Hours: ${business.hoursDisplay}
- Service area: ${business.areaServed.join('; ')}
- Google Business Profile: ${business.gbp.mapsUrl}
${business.sameAs.length ? `- Profiles: ${business.sameAs.join(', ')}\n` : ''}
Not to be confused with: ${confusedWith}. ${business.name} (${business.domain}) of ${business.primaryCity}, ${business.address.addressRegion} is not affiliated with these businesses.

## Services

${byKind('service').map(link).join('\n')}

## Locations

${byKind('location').map(link).join('\n')}

## Blog

${byKind('blog').map(link).join('\n')}

## Company

${companyPages.map(link).join('\n')}
- [RSS feed](${SITE_URL}/feed.xml): Blog posts as RSS 2.0.
- [Sitemap](${SITE_URL}/sitemap.xml): Every indexable URL with last-modified dates.
`
fs.writeFileSync(path.join(distDir, 'llms.txt'), llms.replace(/\n{3,}/g, '\n\n'))

console.log(`[sitemap] ${SITE_URL}: sitemap.xml (${indexable.length} URLs), feed.xml (${posts.length} posts), llms.txt`)
