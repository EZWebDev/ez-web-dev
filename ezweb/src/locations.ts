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
  /** Title tag (<= 35 chars; the page appends " | EZ Web Development LLC"). */
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
    title: 'Web Design & SEO in Hollywood, FL',
    description: 'Web design, SEO and Google and Meta ads for Hollywood, FL businesses, from an agency based in downtown Hollywood.',
    heading: 'Web design and SEO in Hollywood, Florida',
    intro: [
      'EZ Web Development LLC is a web development and SEO agency based in downtown Hollywood, near Young Circle and Hollywood Boulevard. Founded in 2022 by Ezra Pinsky, the agency builds websites, runs SEO and AI search visibility programs, and manages Google and Meta ads for local businesses and for clients elsewhere in the country.',
      'The notes below are specific to how people search in Hollywood and what that means for your website.',
    ],
    sections: [
      {
        heading: 'Hollywood’s business mix and what it means for your website',
        body: [
          'Hollywood sits between Fort Lauderdale and Miami, and its economy reflects both. Hospitality and tourism cluster around Hollywood Beach and the Broadwalk, restaurants and shops line downtown Hollywood Boulevard, and professional offices, medical practices, contractors and real estate businesses serve the residential neighborhoods to the west.',
          'Each group needs something different from a website. A beachside restaurant or rental needs fast mobile pages, current hours and menus, and booking links that work on a phone. A law, accounting or medical office needs clear service pages and visible credentials that build trust before the first call. Contractors and home service companies need a page for each service and the areas they cover, with the phone number one tap away.',
        ],
      },
      {
        heading: 'Showing up on Google Maps in Hollywood',
        body: [
          'Google says it ranks local results on relevance, distance and prominence. Distance is the one you cannot change. Someone searching near the beach sees nearby businesses first, so a company west of I-95 can lose map visibility there to a competitor on A1A, and the reverse.',
          'The other two are yours to work on. Start with a complete Google Business Profile and the most accurate primary category. Ask for reviews that mention the services you want to be known for. Keep your name, address and phone identical on your site and every directory. Then give each service its own page, so Google has a specific reason to show you for nearby searches.',
        ],
      },
      {
        heading: 'Seasonal and visitor searches',
        body: [
          'The winter months bring seasonal residents and more visitors, many of them searching on a phone from a hotel or rental. That favors businesses whose sites load quickly on mobile and show hours and location plainly, and whose Google Business Profile details are updated before the season starts rather than during it.',
        ],
      },
      {
        heading: 'Working with us in Hollywood',
        body: [
          'Hollywood clients work with us the same way clients in other states do. We talk by phone or video call, and drafts, designs and reports arrive as shared documents and links. Hours are Monday to Friday, 9am to 5pm Eastern.',
        ],
      },
    ],
    neighborhoods: ['Downtown Hollywood', 'Hollywood Beach', 'Emerald Hills', 'Hallandale Beach', 'Dania Beach', 'Pembroke Pines'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'google-ads'],
    faqs: [
      {
        q: 'Where is EZ Web Development LLC located?',
        a: 'EZ Web Development LLC is based in downtown Hollywood, FL 33020. You can reach us at (561) 692-6868 or ezra@ezweb.dev, Monday to Friday from 9am to 5pm Eastern.',
      },
      {
        q: 'Do you meet clients in person?',
        a: 'Yes, by appointment at our Hollywood office. Most projects run remotely by phone, email and video call, with drafts and reports shared online.',
      },
      {
        q: 'Do you work with businesses in Hallandale Beach, Dania Beach and Pembroke Pines?',
        a: 'Yes. We work with businesses in those nearby cities and across southern Broward County, as well as in Fort Lauderdale and Miami.',
      },
      {
        q: 'How do I get my Hollywood business into Google Maps results?',
        a: 'Start with a verified, fully completed Google Business Profile with the correct primary category, accurate hours and real photos. Keep your name, address and phone identical everywhere, earn reviews steadily, and build clear service pages on your website. Distance to the searcher also matters, so results vary across the city.',
      },
    ],
    updated: '2026-09-23',
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    region: 'FL',
    displayName: 'Fort Lauderdale, FL',
    title: 'Web Design & SEO in Fort Lauderdale',
    description: 'For Fort Lauderdale and Broward County businesses: websites, SEO and Google and Meta ads from an agency based just south in Hollywood, FL.',
    heading: 'Web design and SEO for Fort Lauderdale businesses',
    intro: [
      'Fort Lauderdale is Broward’s county seat and its business center: law and finance offices downtown and on Las Olas Boulevard, marinas and hotels along the water, and service companies in every neighborhood. EZ Web Development LLC works remotely with Fort Lauderdale businesses from its base just south in Hollywood.',
      'Many Fort Lauderdale firms win clients on referrals, and a referral’s first stop is your website. Businesses on the water sell to visitors who have never heard of them. Both need a site that answers questions before anyone calls.',
    ],
    sections: [
      {
        heading: 'Fort Lauderdale’s industries and their websites',
        body: [
          'Downtown Fort Lauderdale has a concentration of law firms, financial advisors, accountants and other professional services. For these firms the website is often where a referral goes to check them out, so clear practice-area pages, credentials and team bios matter more than animation or a clever layout.',
          'The city also runs on the water. Marine businesses, yacht services, and the hotels and restaurants around the beach and Port Everglades sell to many people from out of town. Those customers find you by searching, often on a phone in an unfamiliar area, so the site has to show services, location, hours and contact details without making them dig. Healthcare practices, real estate agents and home service companies make up much of the rest of the market.',
        ],
      },
      {
        heading: 'Competing in Broward search results',
        body: [
          'Search in Fort Lauderdale is competitive because the metro is large and many businesses serve overlapping areas. Someone searching from Victoria Park sees different map results than someone in Plantation or Pompano Beach, because Google weighs the searcher’s distance alongside relevance and prominence.',
          'If you cover all of Broward, start with a verified Google Business Profile that lists your real service areas, plus a page on your site for each major service. Add a city page only where you have something specific to say about that city, such as jobs done there or reviews from customers there. Pages that just swap the city name are easy for Google to ignore.',
        ],
      },
      {
        heading: 'Professional services and trust signals',
        body: [
          'Firms that sell expertise are judged on credibility before anyone calls. That means bios with real qualifications, specific descriptions of what you handle and what you do not, reviews on Google and relevant directories, and schema markup that connects the firm, its people and its services. These are the same signals AI tools draw on when someone asks them for a recommendation.',
        ],
      },
      {
        heading: 'How we work with Fort Lauderdale clients',
        body: [
          'Projects start with a phone or video call about how inquiries reach you today and what happens to them next. That tells us what the site needs to do. The rest of the work runs on video calls and shared documents.',
        ],
      },
    ],
    neighborhoods: ['Downtown Fort Lauderdale', 'Las Olas', 'Victoria Park', 'Wilton Manors', 'Plantation', 'Davie', 'Pompano Beach'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'landing-page-cro'],
    faqs: [
      {
        q: 'Do you have an office in Fort Lauderdale?',
        a: 'No. We are based in Hollywood, just south of Fort Lauderdale. Fort Lauderdale clients work with us by phone, email and video call.',
      },
      {
        q: 'What does a Fort Lauderdale law or accounting firm need on its website?',
        a: 'Clear pages for each practice area or service, professional bios with credentials, visible contact options and reviews. Fast load times, accessible design and schema markup that ties the firm to its people and services help both Google and AI tools describe the firm accurately.',
      },
      {
        q: 'Why does my business appear in Google Maps in one part of Fort Lauderdale but not another?',
        a: 'Google ranks local results partly by distance from the searcher, so visibility naturally changes across the city. You can strengthen relevance and prominence with a complete Google Business Profile, steady reviews and strong service pages, but distance always plays a role.',
      },
      {
        q: 'Can you run Google and Meta ads for a Broward service area?',
        a: 'Yes. We set location targeting on both platforms to match where you actually work. On Google we add negative keywords for areas and searches you do not serve. Calls and forms are tracked so the budget goes toward real leads.',
      },
    ],
    updated: '2026-09-23',
  },
  {
    slug: 'miami',
    name: 'Miami',
    region: 'FL',
    displayName: 'Miami, FL',
    title: 'Web Design & SEO in Miami, FL',
    description: 'Bilingual English and Spanish websites, SEO, AI search visibility and Google and Meta ads for Miami-Dade businesses, from a Hollywood, FL agency.',
    heading: 'Web design and SEO for Miami businesses',
    intro: [
      'Miami-Dade is a crowded search market: dense neighborhoods, customers arriving from other countries and states, and many businesses that sell in both English and Spanish. EZ Web Development LLC is based in Hollywood, in southern Broward County, and works with Miami and Miami-Dade businesses remotely.',
      'Two things matter more here than in most places: building a bilingual site the right way, and competing for map and ad positions that many other businesses want.',
    ],
    sections: [
      {
        heading: 'Serving a bilingual market',
        body: [
          'Many Miami-Dade customers search in Spanish, many search in English, and many switch depending on the topic. A business that serves both audiences needs more than a translate button. Separate, properly translated pages for each language, with hreflang tags that tell Google which version to show, let each page rank on its own for searches in that language.',
          'We build the structure for bilingual sites and work with your bilingual staff or a professional translator on the Spanish copy, rather than publishing raw machine translation that reads poorly to native speakers.',
        ],
      },
      {
        heading: 'Miami’s business districts',
        body: [
          'Miami’s economy spans hospitality and tourism, real estate, healthcare, international trade, finance and technology. Brickell and downtown hold many professional and financial firms, Wynwood and the Design District draw creative and retail businesses, and areas like Coral Gables and Aventura have their own mix of offices, clinics and shops. Many customers arrive from other countries and states, so a Miami site should say on the first screen what you do, where you are, which languages you speak and how to reach you.',
        ],
      },
      {
        heading: 'Local search and AI answers in a crowded market',
        body: [
          'In a dense market, Google’s map results for common services are crowded and distance from the searcher matters a great deal. The businesses that show up are the ones Google can match to the search without guessing. That takes the right primary category on Google Business Profile, detailed service pages, the same name, address and phone across directories, and a steady flow of real reviews.',
          'The same consistency affects whether Google AI Mode, ChatGPT and Perplexity mention a business when someone asks for a recommendation in Miami. These tools favor businesses whose facts line up across many sources, which is why we treat AI search visibility as part of local SEO rather than a separate project.',
        ],
      },
      {
        heading: 'How Miami projects run',
        body: [
          'Everything runs remotely. For a bilingual site, the English and Spanish drafts go out as shared documents, so your staff or translator can mark up the Spanish pages directly. Staging links let you check both versions on a phone before launch.',
        ],
      },
    ],
    neighborhoods: ['Aventura', 'North Miami Beach', 'Sunny Isles Beach', 'Brickell', 'Wynwood', 'Coral Gables'],
    serviceSlugs: ['custom-web-design', 'ai-search-ranking', 'google-ads'],
    faqs: [
      {
        q: 'Do you build bilingual English and Spanish websites?',
        a: 'Yes. We build sites with separate English and Spanish pages and hreflang tags so Google shows the right language to each searcher. The Spanish copy is written or reviewed by your bilingual staff or a professional translator rather than published as raw machine translation.',
      },
      {
        q: 'Are you located in Miami?',
        a: 'No. Our office is in Hollywood, Florida, north of the Miami-Dade county line. Miami clients work with us remotely, over phone, email and video calls.',
      },
      {
        q: 'How can a Miami business show up in AI answers from ChatGPT or Google AI Mode?',
        a: 'Make your business facts consistent everywhere: website, Google Business Profile, directories and social profiles. Add structured data, keep key pages crawlable, and publish clear answers to the questions customers ask. No one can guarantee a mention, but these steps remove the most common reasons AI tools skip a business.',
      },
      {
        q: 'Is Google Ads worth it for a Miami business?',
        a: 'Yes, when tracking is accurate and targeting is tight. Clicks for competitive services in Miami can be expensive. We put spend on high-intent searches in the areas you serve, add negative keywords, and track calls and forms to see the real cost per lead.',
      },
    ],
    updated: '2026-09-23',
  },
]

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug)
