/**
 * Service-area pages. One page per city/county we actively serve.
 * Rendered at /locations/<slug>. Content is owned by the content agent; the
 * page component and schema live in App.tsx.
 */
export type Location = {
  slug: string
  /** City or area name as people search it, e.g. "Fort Lauderdale". */
  name: string
  /** State abbreviation. */
  region: 'FL'
  /** Full display name, e.g. "Fort Lauderdale, FL". */
  displayName: string
  /** Title tag (<= 60 chars). */
  title: string
  /** Meta description (<= 155 chars). */
  description: string
  /** H1. */
  heading: string
  /** Opening paragraph(s). */
  intro: string[]
  /** Sections of unique local copy. */
  sections: { heading: string; body: string[] }[]
  /** Neighborhoods / nearby areas we cover from this city. */
  neighborhoods: string[]
  /** Services most relevant here, by service slug. */
  serviceSlugs: string[]
  faqs: { q: string; a: string }[]
  /** YYYY-MM-DD last content revision. */
  updated: string
}

export const locations: Location[] = [
  {
    slug: 'hollywood-fl',
    name: 'Hollywood',
    region: 'FL',
    displayName: 'Hollywood, FL',
    title: 'Web Design & SEO in Hollywood, FL | EZ Web Development LLC',
    description: 'Custom websites, SEO and Google Ads from a studio based in downtown Hollywood, Florida.',
    heading: 'Web design and SEO in Hollywood, Florida',
    intro: ['EZ Web Development LLC is based at 1909 Tyler Street in downtown Hollywood.'],
    sections: [],
    neighborhoods: ['Downtown Hollywood', 'Hollywood Beach', 'Emerald Hills', 'Hallandale Beach', 'Dania Beach', 'Pembroke Pines'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'google-ads'],
    faqs: [],
    updated: '2026-09-23',
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    region: 'FL',
    displayName: 'Fort Lauderdale, FL',
    title: 'Web Design & SEO in Fort Lauderdale, FL | EZ Web Development LLC',
    description: 'Custom websites, SEO and Google Ads for Fort Lauderdale and Broward County businesses.',
    heading: 'Web design and SEO for Fort Lauderdale businesses',
    intro: ['We are fifteen minutes south of downtown Fort Lauderdale and serve the whole of Broward County.'],
    sections: [],
    neighborhoods: ['Downtown Fort Lauderdale', 'Las Olas', 'Wilton Manors', 'Plantation', 'Davie', 'Pompano Beach'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'landing-page-cro'],
    faqs: [],
    updated: '2026-09-23',
  },
  {
    slug: 'miami',
    name: 'Miami',
    region: 'FL',
    displayName: 'Miami, FL',
    title: 'Web Design & SEO in Miami, FL | EZ Web Development LLC',
    description: 'Custom websites, SEO, AI-search visibility and Google Ads for Miami and Miami-Dade businesses.',
    heading: 'Web design and SEO for Miami businesses',
    intro: ['We work with Miami-Dade businesses from our Hollywood, Florida studio.'],
    sections: [],
    neighborhoods: ['Aventura', 'North Miami Beach', 'Sunny Isles Beach', 'Brickell', 'Wynwood', 'Coral Gables'],
    serviceSlugs: ['custom-web-design', 'ai-search-ranking', 'google-ads'],
    faqs: [],
    updated: '2026-09-23',
  },
]

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug)
