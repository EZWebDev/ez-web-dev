/**
 * Single source of truth for business identity (NAP), founder, and profile links.
 *
 * Every schema.org entity, the footer, the contact page, sitemap, llms.txt and
 * RSS feed read from this file. Keep the NAP byte-identical to the Google
 * Business Profile (live since 2026-09-17) and to every other citation.
 */

export const SITE_UPDATED = '2026-09-23'

export const business = {
  /** Legal name as registered with the Florida Division of Corporations (L22000242599). */
  legalName: 'EZ Web Development LLC',
  /** Florida Division of Corporations document number (public record on sunbiz.org). */
  floridaDocumentNumber: 'L22000242599',
  /** Name used in every schema entity and citation. Must match Google Business Profile exactly. */
  name: 'EZ Web Development LLC',
  /** Short wordmark used in the header logo only. */
  shortName: 'EZ Web',
  alternateNames: ['EZ Web', 'EZ Web Development', 'ezweb.dev'],
  domain: 'ezweb.dev',
  url: 'https://ezweb.dev',
  email: 'ezra@ezweb.dev',
  /** E.164 for schema / tel: links. */
  phone: '+15616926868',
  /** Display format, identical to the Google Business Profile. */
  phoneDisplay: '(561) 692-6868',
  address: {
    streetAddress: '1909 Tyler Street Suite 308',
    addressLocality: 'Hollywood',
    addressRegion: 'FL',
    postalCode: '33020',
    addressCountry: 'US',
  },
  /** Approximate coordinates for 1909 Tyler St, Hollywood FL. Verify against the GBP map pin. */
  geo: { latitude: 26.0118, longitude: -80.1462 },
  foundingDate: '2022-05-25',
  founder: {
    name: 'Ezra Pinsky',
    givenName: 'Ezra',
    familyName: 'Pinsky',
    jobTitle: 'Founder',
    email: 'ezra@ezweb.dev',
    /** Add LinkedIn / GitHub / X profile URLs here as they are created. */
    sameAs: [] as string[],
  },
  /** Primary Google Business Profile category. */
  category: 'Internet marketing service',
  priceRange: '$$',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  ],
  hoursDisplay: 'Mon–Fri · 9am–5pm ET',
  /** Primary metro and service area, most specific first. */
  primaryCity: 'Hollywood',
  primaryRegion: 'Florida',
  metro: 'South Florida',
  areaServed: [
    'Hollywood, FL',
    'Fort Lauderdale, FL',
    'Miami, FL',
    'Broward County, FL',
    'Miami-Dade County, FL',
    'South Florida',
    'United States',
  ],
  /** One-sentence entity statement. Reuse verbatim on Home, About, GBP, LinkedIn, Clutch, etc. */
  description:
    'EZ Web Development LLC is a web development and SEO agency in Hollywood, Florida, founded in 2022 by Ezra Pinsky. We design and build fast custom websites, run monthly SEO and AI-search visibility programs, improve landing-page conversion, and manage Google and Meta ads for businesses in South Florida and nationwide.',
  /** Google Business Profile identifiers (from the "Your Business Profile is live" notice, 2026-09-17). */
  gbp: {
    cid: '15049505616001444936',
    mapsUrl: 'https://maps.google.com/?cid=15049505616001444936',
    shortName: 'EZ Web Development LLC',
  },
  /** Verified profile URLs. Append each new citation here (Phase 2). Empty strings are ignored. */
  sameAs: [
    'https://maps.google.com/?cid=15049505616001444936',
    'https://github.com/EZWebDev',
    // 'https://www.linkedin.com/company/…',
    // 'https://clutch.co/profile/…',
    // 'https://www.bbb.org/…',
    // 'https://www.crunchbase.com/organization/…',
    // 'https://www.bingplaces.com/…',
  ].filter(Boolean),
  /** Businesses with similar names that are NOT us. Used for the neutral disambiguation note. */
  notToBeConfusedWith: [
    { name: 'EZ Web LLC', location: 'High Ridge, Missouri', domain: 'ezweb.work' },
    { name: 'EZ Web Solution LLC', location: 'Euless, Texas' },
    { name: 'EZ Web Company', location: 'Palm Harbor / Clearwater, Florida', domain: 'ezweb.company' },
    { name: 'EZ Web Works', location: '' },
  ],
} as const

export const ORG_ID = `${business.url}/#organization`
export const FOUNDER_ID = `${business.url}/#founder`
export const WEBSITE_ID = `${business.url}/#website`

export const fullAddressLine = `${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`

export const absoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) return path
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  return `${business.url}${clean.startsWith('/') ? clean : `/${clean}`}` || business.url
}
