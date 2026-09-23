/**
 * Shared helpers for page titles, dates and page-level JSON-LD.
 * The global ProfessionalService / Person / WebSite graph is emitted by
 * useGlobalSchemas() in seo.tsx; page schemas only reference it by @id.
 */
import { business, absoluteUrl, FOUNDER_ID, ORG_ID, WEBSITE_ID } from '../business'

export type Crumb = { name: string; path: string }
export type FaqItem = { q: string; a: string }
export type JsonLd = Record<string, unknown>

const CONTEXT = 'https://schema.org'

export const orgRef = { '@id': ORG_ID } as const
export const founderRef = { '@id': FOUNDER_ID } as const
export const websiteRef = { '@id': WEBSITE_ID } as const

export const foundingYear = business.foundingDate.slice(0, 4)

/** "<Page topic> | EZ Web Development LLC", unless the topic already carries the brand. */
export function pageTitle(topic: string): string {
  return topic.includes(business.name) ? topic : `${topic} | ${business.name}`
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Deterministic (timezone-free) formatting of a YYYY-MM-DD date, safe for prerendering. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d || m < 1 || m > 12) return iso
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

/** "a, b and c" (or "or"), without relying on Intl for prerender stability. */
export function joinList(items: string[], conjunction: 'and' | 'or' = 'and'): string {
  if (items.length <= 1) return items.join('')
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, ${conjunction} ${items[items.length - 1]}`
}

/** Drop null/undefined entries so optional schemas can be listed inline. */
export function compact(items: (JsonLd | null | undefined | false)[]): JsonLd[] {
  return items.filter((x): x is JsonLd => Boolean(x))
}

export function breadcrumbSchema(items: Crumb[]): JsonLd {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export function faqSchema(faqs: FaqItem[] | undefined, path: string): JsonLd | null {
  if (!faqs || faqs.length === 0) return null
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    url: absoluteUrl(path),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** business.areaServed as schema.org Place subtypes. */
export function areaServedSchema(): JsonLd[] {
  return business.areaServed.map((name): JsonLd => {
    if (name === 'United States') return { '@type': 'Country', name }
    if (/County/.test(name)) return { '@type': 'AdministrativeArea', name }
    if (/, [A-Z]{2}$/.test(name)) return { '@type': 'City', name }
    return { '@type': 'Place', name }
  })
}

/** A page node (WebPage, AboutPage, ContactPage, CollectionPage…) tied to the global graph. */
export function webPageSchema(opts: {
  type?: string | string[]
  path: string
  name: string
  description?: string
  extra?: JsonLd
}): JsonLd {
  const url = absoluteUrl(opts.path)
  return {
    '@context': CONTEXT,
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: websiteRef,
    publisher: orgRef,
    inLanguage: 'en-US',
    ...opts.extra,
  }
}

/** Human label for a sameAs profile URL. */
export function profileLabel(url: string): string {
  if (url === business.gbp.mapsUrl || /google\.[a-z.]+\/maps|maps\.google\./.test(url)) return 'Google Business Profile'
  const known: [RegExp, string][] = [
    [/linkedin\.com/, 'LinkedIn'],
    [/github\.com/, 'GitHub'],
    [/clutch\.co/, 'Clutch'],
    [/bbb\.org/, 'BBB'],
    [/crunchbase\.com/, 'Crunchbase'],
    [/bingplaces\.com|bing\.com\/maps/, 'Bing Places'],
    [/goodfirms\.co/, 'GoodFirms'],
    [/yelp\.com/, 'Yelp'],
    [/facebook\.com/, 'Facebook'],
    [/instagram\.com/, 'Instagram'],
    [/(x|twitter)\.com/, 'X'],
  ]
  for (const [re, label] of known) if (re.test(url)) return label
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')
}

/** Google Business Profile first, then every other verified profile, de-duplicated. */
export function profileLinks(): { url: string; label: string }[] {
  const urls = [business.gbp.mapsUrl, ...business.sameAs.filter((u) => u && u !== business.gbp.mapsUrl)]
  return urls.map((url) => ({ url, label: profileLabel(url) }))
}

/** "EZ Web LLC (ezweb.work, High Ridge, Missouri)" style descriptors for the disambiguation note. */
export function notAffiliatedList(): string[] {
  return business.notToBeConfusedWith.map((c) => {
    const detail = [('domain' in c ? c.domain : undefined), c.location].filter(Boolean).join(', ')
    return detail ? `${c.name} (${detail})` : c.name
  })
}
