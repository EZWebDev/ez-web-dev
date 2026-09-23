#!/usr/bin/env node
/**
 * Post-build SEO assertions on the static HTML in dist/ (what non-JS crawlers see).
 *
 * For every non-noindex page in getSiteIndex():
 *   - exactly one <title> (non-empty)
 *   - exactly one <link rel="canonical"> equal to https://ezweb.dev + path
 *   - a non-empty <meta name="description">
 *   - at least one application/ld+json script, each parsing as JSON
 *   - non-empty text inside #root
 * Also: 404.html exists and is noindex; sitemap/feed/llms/robots exist; hosting redirect
 * files cover every entry in retiredServiceRedirects. Exits non-zero on any failure.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distDir = path.resolve(root, 'dist')
const ssrEntry = path.resolve(root, 'dist-ssr', 'entry-server.js')
if (!fs.existsSync(ssrEntry)) {
  console.error('[check-seo] dist-ssr/entry-server.js not found. Run `npm run build` first.')
  process.exit(1)
}
const { getSiteIndex, business, retiredServiceRedirects } = await import(pathToFileURL(ssrEntry).href)

const errors = []
const fail = (where, msg) => errors.push(`${where}: ${msg}`)

const fileFor = (p) =>
  p === '/' ? 'index.html' : p === '/404' ? '404.html' : path.join(...p.replace(/^\/+|\/+$/g, '').split('/'), 'index.html')
const expectedCanonical = (p) => (p === '/' ? `${business.url}/` : `${business.url}${p.replace(/\/+$/, '')}`)

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? decode(m[1]) : undefined
}

/** Text content of <div id="root">…</div>: everything between the root opening tag and the entry script. */
const rootText = (html) => {
  const start = html.indexOf('<div id="root">')
  if (start === -1) return ''
  const bodyEnd = html.lastIndexOf('</body>')
  const inner = html.slice(start + '<div id="root">'.length, bodyEnd === -1 ? undefined : bodyEnd)
  return decode(
    inner
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim()
}

const pages = getSiteIndex()
let checked = 0
for (const page of pages) {
  const rel = fileFor(page.path)
  const file = path.join(distDir, rel)
  const where = `${page.path} (dist/${rel})`
  if (!fs.existsSync(file)) {
    fail(where, 'file missing')
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  const head = html.slice(0, html.indexOf('</head>') + 1 || undefined)

  if (page.noindex) {
    const robots = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).find((t) => attr(t, 'name') === 'robots')
    if (!robots || !/noindex/i.test(attr(robots, 'content') ?? '')) fail(where, 'noindex page lacks <meta name="robots" content="noindex…">')
    continue
  }
  checked++

  const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)]
  if (titles.length !== 1) fail(where, `expected 1 <title>, found ${titles.length}`)
  else if (!titles[0][1].trim()) fail(where, '<title> is empty')

  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0])
  const canonicals = links.filter((t) => (attr(t, 'rel') ?? '').toLowerCase() === 'canonical')
  if (canonicals.length !== 1) fail(where, `expected 1 canonical, found ${canonicals.length}`)
  else if (attr(canonicals[0], 'href') !== expectedCanonical(page.path))
    fail(where, `canonical is ${attr(canonicals[0], 'href')}, expected ${expectedCanonical(page.path)}`)

  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0])
  const descs = metas.filter((t) => attr(t, 'name') === 'description')
  if (descs.length !== 1) fail(where, `expected 1 meta description, found ${descs.length}`)
  else if (!(attr(descs[0], 'content') ?? '').trim()) fail(where, 'meta description is empty')

  const robots = metas.find((t) => attr(t, 'name') === 'robots')
  if (robots && /noindex/i.test(attr(robots, 'content') ?? '')) fail(where, 'indexable page has robots noindex')

  const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
  if (!ld.length) fail(where, 'no application/ld+json')
  for (const [, json] of ld) {
    try {
      JSON.parse(json)
    } catch (e) {
      fail(where, `JSON-LD does not parse: ${e.message}`)
    }
  }
  if (!ld.some(([, json]) => json.includes(`"${business.url}/#organization"`))) fail(where, 'global @graph (#organization) missing')

  if (!rootText(html)) fail(where, '#root has no text (not prerendered?)')
}

// Non-page artifacts
for (const f of ['404.html', 'sitemap.xml', 'feed.xml', 'llms.txt', 'robots.txt', 'favicon.svg', 'og-image.png', 'logo.png', 'apple-touch-icon.png']) {
  if (!fs.existsSync(path.join(distDir, f))) fail(`dist/${f}`, 'missing')
}
const sitemap = fs.existsSync(path.join(distDir, 'sitemap.xml')) ? fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8') : ''
if (/localhost|http:\/\//.test(sitemap.replace(/xmlns="http:\/\/www\.sitemaps\.org[^"]*"/, ''))) fail('dist/sitemap.xml', 'contains localhost or http:// URLs')

// Hosting redirect files must cover every retired service URL.
const redirectsFile = path.join(root, 'public', '_redirects')
const vercelFile = path.join(root, 'vercel.json')
const redirects = fs.existsSync(redirectsFile) ? fs.readFileSync(redirectsFile, 'utf8') : ''
let vercel = { redirects: [] }
try {
  vercel = JSON.parse(fs.readFileSync(vercelFile, 'utf8'))
} catch (e) {
  fail('vercel.json', `missing or invalid: ${e.message}`)
}
for (const [from, to] of Object.entries(retiredServiceRedirects ?? {})) {
  if (!new RegExp(`^${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+${to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+301`, 'm').test(redirects))
    fail('public/_redirects', `missing "${from} ${to} 301"`)
  if (!(vercel.redirects ?? []).some((r) => r.source === from && r.destination === to && (r.permanent || r.statusCode === 301)))
    fail('vercel.json', `missing redirect ${from} -> ${to}`)
}

if (errors.length) {
  console.error(`[check-seo] ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}`)
  process.exit(1)
}
console.log(`[check-seo] OK: ${checked} indexable pages verified (+${pages.length - checked} noindex).`)
