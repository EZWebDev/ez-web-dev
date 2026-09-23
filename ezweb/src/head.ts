/**
 * Pure head-tag builders shared by <Seo/> (src/seo.tsx), the SSR entry and the browser.
 * No React, no DOM: safe to import from build scripts via the SSR bundle.
 */
import { business, absoluteUrl, ORG_ID, FOUNDER_ID, WEBSITE_ID } from './business'

export type SeoProps = {
  title: string
  description?: string
  path?: string
  image?: string
  robots?: string
  jsonLd?: object | object[]
  type?: 'website' | 'article'
  /** ISO date (YYYY-MM-DD or full ISO). Only used when type === 'article'. */
  publishedTime?: string
  /** ISO date (YYYY-MM-DD or full ISO). Only used when type === 'article'. */
  modifiedTime?: string
}

export type HeadTag = {
  id: string
  tag: 'title' | 'meta' | 'link' | 'script'
  attrs: Record<string, string>
  /** Text content (title text or JSON-LD). */
  text?: string
}

export type HeadStore = { page: HeadTag[]; global: HeadTag[] }

export const DEFAULT_OG_IMAGE = '/og-image.png'
export const DEFAULT_OG_IMAGE_ALT = `${business.name}: web development & SEO in Hollywood, FL`

export const createHeadStore = (): HeadStore => ({ page: [], global: [] })

/** Ids of every page-level tag <Seo/> may manage. Used to remove tags a new route does not set. */
export const PAGE_TAG_IDS = [
  'seo:description',
  'seo:robots',
  'seo:canonical',
  'seo:og:site_name',
  'seo:og:locale',
  'seo:og:type',
  'seo:og:title',
  'seo:og:description',
  'seo:og:url',
  'seo:og:image',
  'seo:og:image:alt',
  'seo:tw:card',
  'seo:tw:title',
  'seo:tw:description',
  'seo:tw:image',
  'seo:article:published_time',
  'seo:article:modified_time',
  'seo:article:author',
  'seo:ld:page',
]

/** JSON for inline <script>: escape characters that could terminate the element. */
export const safeJson = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

export function buildPageTags({
  title,
  description,
  path = '/',
  image,
  robots = 'index,follow',
  jsonLd,
  type = 'website',
  publishedTime,
  modifiedTime,
}: SeoProps): HeadTag[] {
  const url = absoluteUrl(path || '/')
  const img = absoluteUrl(image || DEFAULT_OG_IMAGE)
  const noindex = /noindex/i.test(robots)
  const tags: HeadTag[] = []
  const meta = (id: string, attrs: Record<string, string>) => tags.push({ id, tag: 'meta', attrs })

  tags.push({ id: 'seo:title', tag: 'title', attrs: {}, text: title })
  if (description) meta('seo:description', { name: 'description', content: description })
  meta('seo:robots', { name: 'robots', content: robots })
  if (!noindex) tags.push({ id: 'seo:canonical', tag: 'link', attrs: { rel: 'canonical', href: url } })

  meta('seo:og:site_name', { property: 'og:site_name', content: business.name })
  meta('seo:og:locale', { property: 'og:locale', content: 'en_US' })
  meta('seo:og:type', { property: 'og:type', content: type })
  meta('seo:og:title', { property: 'og:title', content: title })
  if (description) meta('seo:og:description', { property: 'og:description', content: description })
  if (!noindex) meta('seo:og:url', { property: 'og:url', content: url })
  meta('seo:og:image', { property: 'og:image', content: img })
  if (!image) meta('seo:og:image:alt', { property: 'og:image:alt', content: DEFAULT_OG_IMAGE_ALT })

  meta('seo:tw:card', { name: 'twitter:card', content: 'summary_large_image' })
  meta('seo:tw:title', { name: 'twitter:title', content: title })
  if (description) meta('seo:tw:description', { name: 'twitter:description', content: description })
  meta('seo:tw:image', { name: 'twitter:image', content: img })

  if (type === 'article') {
    const pub = publishedTime
    const mod = modifiedTime || publishedTime
    if (pub) meta('seo:article:published_time', { property: 'article:published_time', content: pub })
    if (mod) meta('seo:article:modified_time', { property: 'article:modified_time', content: mod })
    meta('seo:article:author', { property: 'article:author', content: business.founder.name })
  }

  if (jsonLd) {
    const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    if (items.length) {
      tags.push({
        id: 'seo:ld:page',
        tag: 'script',
        attrs: { type: 'application/ld+json' },
        text: safeJson(items.length === 1 ? items[0] : items),
      })
    }
  }
  return tags
}

const areaServedEntity = (name: string) => {
  if (name === 'United States') return { '@type': 'Country', name }
  if (/County/.test(name)) return { '@type': 'AdministrativeArea', name }
  if (/, [A-Z]{2}$/.test(name)) return { '@type': 'City', name }
  return { '@type': 'Place', name }
}

/** The site-wide entity graph: ProfessionalService/LocalBusiness + founder Person + WebSite. */
export function buildGlobalGraph() {
  const b = business
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': ORG_ID,
        name: b.name,
        legalName: b.legalName,
        alternateName: [...b.alternateNames],
        url: b.url,
        email: b.email,
        telephone: b.phone,
        description: b.description,
        address: { '@type': 'PostalAddress', ...b.address },
        hasMap: b.gbp.mapsUrl,
        openingHoursSpecification: b.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
          opens: h.opens,
          closes: h.closes,
        })),
        areaServed: b.areaServed.map(areaServedEntity),
        foundingDate: b.foundingDate,
        founder: { '@id': FOUNDER_ID },
        sameAs: [...b.sameAs],
        logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png'), width: 512, height: 512 },
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        priceRange: b.priceRange,
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: b.founder.name,
        givenName: b.founder.givenName,
        familyName: b.founder.familyName,
        jobTitle: b.founder.jobTitle,
        email: b.founder.email,
        worksFor: { '@id': ORG_ID },
        ...(b.founder.sameAs.length ? { sameAs: [...b.founder.sameAs] } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: b.name,
        alternateName: [...b.alternateNames],
        url: b.url,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-US',
      },
    ],
  }
}

export const buildGlobalTags = (): HeadTag[] => [
  { id: 'seo:ld:global', tag: 'script', attrs: { type: 'application/ld+json' }, text: safeJson(buildGlobalGraph()) },
]

// ---------------------------------------------------------------------------
// Serialization (SSR)
// ---------------------------------------------------------------------------

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderHeadTags(tags: HeadTag[]): string {
  return tags
    .map((t) => {
      const attrs = Object.entries({ id: t.id, ...t.attrs })
        .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
        .join('')
      if (t.tag === 'title') return `<title${attrs}>${escapeText(t.text ?? '')}</title>`
      if (t.tag === 'script') return `<script${attrs}>${t.text ?? ''}</script>`
      return `<${t.tag}${attrs} />`
    })
    .join('\n    ')
}

