/**
 * Service catalog. Six services we actively sell. Rendered at /services/<slug>.
 * Content is owned by the content agent; the page component and schema live in App.tsx.
 */
export type Service = {
  slug: string
  /** Service name used as H1 and schema name (no brand suffix). */
  name: string
  /** Short label shown on cards. */
  eyebrow: string
  /** Title tag (<= 60 chars, brand appended by the page). */
  title: string
  /** Meta description (<= 155 chars). */
  description: string
  /** One-line card summary. */
  summary: string
  /** Opening paragraph(s) under the H1. */
  intro: string[]
  /** Long-form sections (what's included, process, who it's for, etc.). */
  sections: { heading: string; body: string[]; bullets?: string[] }[]
  /** Deliverables list shown in the sidebar. */
  deliverables: string[]
  faqs: { q: string; a: string }[]
  /** schema.org serviceType / additionalType hint. */
  serviceType: string
  keywords?: string[]
  /** Related service slugs. */
  related?: string[]
  /** YYYY-MM-DD last content revision. */
  updated: string
}

export const services: Service[] = [
  {
    slug: 'custom-web-design',
    name: 'Custom Web Design & Development',
    eyebrow: 'Design & Build',
    title: 'Custom Web Design & Development in South Florida',
    description: 'Custom-designed, hand-built websites that load fast, rank, and convert. Figma to production from our Hollywood, FL studio.',
    summary: 'Figma designs and dev-ready builds that are fast, accessible and easy to maintain.',
    intro: [],
    sections: [],
    deliverables: ['Figma files & components', 'Responsive states', 'Accessibility & performance', 'Handoff or build'],
    faqs: [],
    serviceType: 'Web design and development',
    updated: '2026-09-23',
  },
  {
    slug: 'full-website-packages',
    name: 'Full Website Packages',
    eyebrow: 'All-in',
    title: 'Full Website Packages: Strategy, Design, Build & Launch',
    description: 'End-to-end website projects: strategy, copy, design, development, SEO setup, analytics and launch, handled by one team.',
    summary: 'Strategy, design, build and launch end to end.',
    intro: [],
    sections: [],
    deliverables: ['Roadmap & scope', 'Design & build', 'SEO & analytics', 'Launch & support'],
    faqs: [],
    serviceType: 'Website design and development package',
    updated: '2026-09-23',
  },
  {
    slug: 'monthly-seo-content',
    name: 'Monthly SEO & Content',
    eyebrow: 'Organic Growth',
    title: 'Monthly SEO & Content Services',
    description: 'Monthly SEO programs: keyword strategy, on-page fixes, local service pages, blog content and technical SEO that compound.',
    summary: 'Blogs, on-page optimization, local pages, rewrites and newsletters that rank.',
    intro: [],
    sections: [],
    deliverables: ['Keyword strategy & topical clustering', 'On-page SEO & internal links', 'Editorial calendar & production', 'Newsletter & repurposing'],
    faqs: [],
    serviceType: 'Search engine optimization',
    updated: '2026-09-23',
  },
  {
    slug: 'ai-search-ranking',
    name: 'AI Search Visibility (GEO)',
    eyebrow: 'AI Era SEO',
    title: 'AI Search Visibility & Generative Engine Optimization',
    description: 'Get cited in Google AI Mode, ChatGPT, Perplexity and Claude: entity and schema optimization, citations, and answer-ready content.',
    summary: 'Entity, schema and citation work so AI answers name your business.',
    intro: [],
    sections: [],
    deliverables: ['Entity & schema optimization', 'Citation & knowledge graph wins', 'Answer engine content', 'Monitoring & iteration'],
    faqs: [],
    serviceType: 'Generative engine optimization',
    updated: '2026-09-23',
  },
  {
    slug: 'landing-page-cro',
    name: 'Landing Page & Conversion Rate Optimization',
    eyebrow: 'Conversions',
    title: 'Landing Page Design & CRO Services',
    description: 'Landing pages and conversion rate optimization: research, A/B tests, messaging and UX fixes that turn more visits into leads.',
    summary: 'Research, A/B tests and UX fixes that lift conversion rate.',
    intro: [],
    sections: [],
    deliverables: ['Research & heuristics', 'Hypotheses & tests', 'Messaging & friction', 'Analytics & learnings'],
    faqs: [],
    serviceType: 'Conversion rate optimization',
    updated: '2026-09-23',
  },
  {
    slug: 'google-ads',
    name: 'Google Ads Management',
    eyebrow: 'Paid Search',
    title: 'Google Ads Management for Local & E-commerce',
    description: 'Google Search, Shopping, Performance Max and retargeting campaigns with clean tracking, managed by the same team that builds your site.',
    summary: 'Search, Shopping, PMax and retargeting tuned for return.',
    intro: [],
    sections: [],
    deliverables: ['Tracking & attribution', 'Keyword & structure', 'Feed & assets', 'Scaling & guardrails'],
    faqs: [],
    serviceType: 'Pay-per-click advertising management',
    updated: '2026-09-23',
  },
]

/** Old service URLs that no longer exist. Client-side and server-side redirects both read this map. */
export const retiredServiceRedirects: Record<string, string> = {
  '/services/backlinks': '/services/monthly-seo-content',
  '/services/branding': '/services/custom-web-design',
  '/services/micro-influencer-marketing': '/services/google-ads',
  '/services/email-marketing': '/services/monthly-seo-content',
  '/services/meta-ads': '/services/google-ads',
}

export const getService = (slug: string) => services.find((s) => s.slug === slug)
