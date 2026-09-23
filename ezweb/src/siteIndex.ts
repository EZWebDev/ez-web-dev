/**
 * Enumerates every indexable page with metadata. Used by the prerenderer,
 * sitemap.xml, llms.txt and the RSS feed. Keep in sync with the routes in App.tsx.
 */
import { SITE_UPDATED } from './business'
import { services } from './services'
import { locations } from './locations'
import { blogPosts } from './blogPosts'

export type PageMeta = {
  path: string
  title: string
  description: string
  /** YYYY-MM-DD */
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
  kind: 'static' | 'service' | 'location' | 'blog'
  /** Excluded from sitemap/llms but still prerendered (e.g. /404). */
  noindex?: boolean
}

export function getSiteIndex(): PageMeta[] {
  const staticPages: PageMeta[] = [
    { path: '/', title: 'EZ Web Development LLC', description: 'Web development and SEO agency in Hollywood, Florida.', lastmod: SITE_UPDATED, changefreq: 'weekly', priority: 1.0, kind: 'static' },
    { path: '/about', title: 'About', description: 'About EZ Web Development LLC and founder Ezra Pinsky.', lastmod: SITE_UPDATED, changefreq: 'monthly', priority: 0.7, kind: 'static' },
    { path: '/services', title: 'Services', description: 'Web design, SEO, AI search visibility, CRO, and Google and Meta ads.', lastmod: SITE_UPDATED, changefreq: 'weekly', priority: 0.8, kind: 'static' },
    { path: '/contact', title: 'Contact', description: 'Contact EZ Web Development LLC in Hollywood, FL.', lastmod: SITE_UPDATED, changefreq: 'monthly', priority: 0.6, kind: 'static' },
    { path: '/blog', title: 'Blog', description: 'Articles on web design, SEO and AI search.', lastmod: SITE_UPDATED, changefreq: 'weekly', priority: 0.7, kind: 'static' },
    { path: '/404', title: 'Page not found', description: 'Page not found.', lastmod: SITE_UPDATED, changefreq: 'yearly', priority: 0, kind: 'static', noindex: true },
  ]
  const servicePages: PageMeta[] = services.map((s) => ({
    path: `/services/${s.slug}`, title: s.title, description: s.description, lastmod: s.updated, changefreq: 'monthly', priority: 0.8, kind: 'service',
  }))
  const locationPages: PageMeta[] = locations.map((l) => ({
    path: `/locations/${l.slug}`, title: l.title, description: l.description, lastmod: l.updated, changefreq: 'monthly', priority: 0.7, kind: 'location',
  }))
  const blogPages: PageMeta[] = blogPosts.map((p) => ({
    path: `/blog/${p.slug}`, title: p.title, description: p.description, lastmod: (p as { updated?: string }).updated ?? p.date, changefreq: 'monthly', priority: 0.6, kind: 'blog',
  }))
  return [...staticPages, ...servicePages, ...locationPages, ...blogPages]
}
