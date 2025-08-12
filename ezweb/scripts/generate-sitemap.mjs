#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

// Load .env if available
try {
  const { config } = await import('dotenv')
  config()
} catch {}

const distDir = path.resolve(process.cwd(), 'dist')
if (!fs.existsSync(distDir)) {
  console.error('dist not found. Run `npm run build` first.')
  process.exit(1)
}

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/$/, '') || 'http://localhost:5173'

const today = new Date().toISOString().slice(0, 10)

const staticPaths = [
  { loc: '/', changefreq: 'weekly', priority: 1.0, lastmod: today },
  { loc: '/about', changefreq: 'monthly', priority: 0.6, lastmod: today },
  { loc: '/services', changefreq: 'weekly', priority: 0.8, lastmod: today },
  { loc: '/contact', changefreq: 'monthly', priority: 0.6, lastmod: today },
  { loc: '/blog', changefreq: 'weekly', priority: 0.7, lastmod: today },
]

const services = [
  'monthly-seo-content',
  'ai-search-ranking',
  'backlinks',
  'branding',
  'landing-page-cro',
  'custom-web-design',
  'micro-influencer-marketing',
  'email-marketing',
  'google-ads',
  'meta-ads',
  'full-website-packages',
].map((slug) => ({ loc: `/services/${slug}`, changefreq: 'monthly', priority: 0.7, lastmod: today }))

const blogPosts = [
  { slug: 'which-website-platform-2025', date: '2025-01-12' },
  { slug: 'first-website-mistakes', date: '2025-01-12' },
  { slug: 'are-boutique-agencies-dying', date: '2025-01-12' },
  { slug: 'entity-first-seo-ai-answers', date: '2025-01-12' },
  { slug: 'google-ads-local-trades-roas-pattern', date: '2025-01-12' },
  { slug: 'above-the-fold-cro-patterns', date: '2025-01-12' },
  { slug: 'shopify-performance-budget', date: '2025-01-12' },
  { slug: 'local-service-seo-framework', date: '2025-01-12' },
].map((p) => ({ loc: `/blog/${p.slug}`, changefreq: 'monthly', priority: 0.7, lastmod: p.date }))

const urls = [...staticPaths, ...services, ...blogPosts]

const urlset = urls
  .map((u) => {
    return `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap.trim() + '\n')

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots)

console.log('Generated: dist/sitemap.xml and dist/robots.txt')