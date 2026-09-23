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
    description: 'Websites, SEO and Google Ads from a studio on Tyler Street in downtown Hollywood, FL, serving local businesses and clients across Broward County.',
    heading: 'Web design and SEO in Hollywood, Florida',
    intro: [
      'EZ Web Development LLC is a web development and SEO studio at 1909 Tyler Street, Suite 308, in downtown Hollywood, a few blocks from Young Circle and Hollywood Boulevard. Founded in 2022 by Ezra Pinsky, the studio builds websites, runs SEO and AI search visibility programs, and manages Google Ads for local businesses and for clients elsewhere in the country.',
      'For Hollywood businesses, that means a partner who knows the area, can meet in person, and understands how residents, seasonal visitors and nearby shoppers search.',
    ],
    sections: [
      {
        heading: 'Hollywood’s business mix and what it means for your website',
        body: [
          'Hollywood sits between Fort Lauderdale and Miami, and its economy reflects both. Hospitality and tourism cluster around Hollywood Beach and the Broadwalk, restaurants and shops line downtown Hollywood Boulevard, and professional offices, medical practices, contractors and real estate businesses serve the residential neighborhoods to the west.',
          'Each group needs something different from a website. A beachside restaurant or rental needs fast mobile pages, current hours and menus, and booking links that work on a phone. A law, accounting or medical office needs clear service pages and visible credentials that build trust before the first call. A contractor or home service company needs a page for each service and the areas it covers, with a phone number one tap away.',
        ],
      },
      {
        heading: 'Showing up on Google Maps in Hollywood',
        body: [
          'Google says its local results are based on relevance, distance and prominence. In practice, a search for a service in Hollywood shows businesses close to the searcher first, so a company on the west side of the city can lose map visibility to a competitor near the beach, and the reverse.',
          'You cannot move your office, but you can control the rest: a complete and accurate Google Business Profile with the right primary category, reviews that mention the services you want to be known for, the same name, address and phone on your site and every directory, and service pages that give Google clear reasons to connect you with nearby searches.',
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
          'Local clients can meet at the Tyler Street office by appointment or at their own place of business, which helps when we need to photograph a location, see how a shop or office actually runs, or train staff to update the site. Day-to-day work happens over email and video calls, Monday to Friday, 9am to 5pm Eastern.',
        ],
      },
    ],
    neighborhoods: ['Downtown Hollywood', 'Hollywood Beach', 'Emerald Hills', 'Hallandale Beach', 'Dania Beach', 'Pembroke Pines'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'google-ads'],
    faqs: [
      {
        q: 'Where is EZ Web Development LLC located?',
        a: 'EZ Web Development LLC is at 1909 Tyler Street, Suite 308, Hollywood, FL 33020, in downtown Hollywood. You can reach the studio at (561) 692-6868 or ezra@ezweb.dev, Monday to Friday from 9am to 5pm Eastern.',
      },
      {
        q: 'Can we meet in person in Hollywood?',
        a: 'Yes. Local clients can meet at the downtown Hollywood office by appointment or at their own business. Many projects combine an in-person kickoff with video calls for the rest of the work.',
      },
      {
        q: 'Do you work with businesses in Hallandale Beach, Dania Beach and Pembroke Pines?',
        a: 'Yes. Those cities are a short drive from downtown Hollywood, and we work with businesses across southern Broward County as well as in Fort Lauderdale and Miami.',
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
    description: 'Websites, SEO and Google Ads for Fort Lauderdale and Broward County businesses, from a studio in nearby Hollywood, FL, with in-person meetings.',
    heading: 'Web design and SEO for Fort Lauderdale businesses',
    intro: [
      'Fort Lauderdale is the county seat of Broward and the center of much of its business activity, from the offices downtown and along Las Olas Boulevard to the marinas, hotels and service companies spread across the city. EZ Web Development LLC works with Fort Lauderdale businesses from its studio in downtown Hollywood, about 20 to 30 minutes south by car depending on traffic.',
      'We build and improve websites, run SEO and AI search visibility programs, and manage Google Ads, and we are close enough to meet in person anywhere in the city.',
    ],
    sections: [
      {
        heading: 'Fort Lauderdale’s industries and their websites',
        body: [
          'Downtown Fort Lauderdale has a concentration of law firms, financial advisors, accountants and other professional services. For these firms the website is often where a referral goes to check them out, so clear practice-area pages, credentials, team bios and fast, professional design matter more than flashy features.',
          'The city is also closely tied to the water. Marine businesses, yacht services and the hospitality industry around the beach and Port Everglades serve many customers from out of town, which makes a strong search presence and well-organized information about services, locations, hours and contact options especially important. Healthcare practices, real estate professionals and home service companies round out much of the local market.',
        ],
      },
      {
        heading: 'Competing in Broward search results',
        body: [
          'Search in Fort Lauderdale is competitive because the metro is large and many businesses serve overlapping areas. Someone searching from Victoria Park sees different map results than someone in Plantation or Pompano Beach, because Google weighs the searcher’s distance alongside relevance and prominence.',
          'Service-area businesses that cover all of Broward should have a verified Google Business Profile with accurate service areas, a page on their site for each major service, and location pages only for areas where they have something specific to say. Thin pages that just swap the city name are easy for Google to ignore.',
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
          'Projects usually start with a call or a meeting at your office. We are close enough to visit for a kickoff, a photo session or staff training, and the rest runs remotely over video calls and shared documents, on a schedule that suits you.',
        ],
      },
    ],
    neighborhoods: ['Downtown Fort Lauderdale', 'Las Olas', 'Victoria Park', 'Wilton Manors', 'Plantation', 'Davie', 'Pompano Beach'],
    serviceSlugs: ['custom-web-design', 'monthly-seo-content', 'landing-page-cro'],
    faqs: [
      {
        q: 'Do you have an office in Fort Lauderdale?',
        a: 'No. Our office is in downtown Hollywood at 1909 Tyler Street, about 20 to 30 minutes south of downtown Fort Lauderdale. We meet Fort Lauderdale clients at their offices when it is useful and work remotely the rest of the time.',
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
        q: 'Can you run Google Ads for a Broward service area?',
        a: 'Yes. We set location targeting to match where you actually work, add negative keywords for areas and searches you do not serve, and track calls and forms so the budget goes toward real leads.',
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
    description: 'Websites, SEO, AI search visibility and Google Ads for Miami-Dade businesses, including bilingual English and Spanish sites, from nearby Hollywood, FL.',
    heading: 'Web design and SEO for Miami businesses',
    intro: [
      'Miami is one of the most competitive markets in the country for search and advertising, with dense neighborhoods, an international customer base, and many businesses serving customers in both English and Spanish. EZ Web Development LLC works with Miami and Miami-Dade businesses from its studio in Hollywood, in southern Broward County, roughly 30 to 45 minutes from downtown Miami depending on traffic on I-95.',
      'We design and build websites, run SEO and AI search visibility work, and manage Google Ads for Miami businesses, meeting in person when it helps and working remotely otherwise.',
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
        heading: 'Miami’s business landscape',
        body: [
          'Miami’s economy spans hospitality and tourism, real estate, healthcare, international trade and finance, along with a growing number of technology companies. Brickell and downtown hold many professional and financial firms, Wynwood and the Design District draw creative and retail businesses, and areas like Coral Gables and Aventura have their own mix of offices, clinics and shops. With so many customers arriving from other countries and states, sites should say immediately what you do, where you are, which languages you speak and how to reach you.',
        ],
      },
      {
        heading: 'Local search and AI answers in a crowded market',
        body: [
          'In a dense market, Google’s map results for common services are crowded and distance from the searcher matters a great deal. Businesses win by being unmistakably relevant: the right primary category on Google Business Profile, detailed service pages, consistent name, address and phone across directories, and a steady flow of genuine reviews.',
          'The same consistency affects whether Google AI Mode, ChatGPT and Perplexity mention a business when someone asks for a recommendation in Miami. These tools favor businesses whose facts line up across many sources, which is why we treat AI search visibility as part of local SEO rather than a separate project.',
        ],
      },
      {
        heading: 'Working with a Hollywood-based studio',
        body: [
          'Our office is in Hollywood, a short drive from Aventura, Sunny Isles Beach and North Miami Beach, and within reach of Brickell and Coral Gables for in-person meetings. Most of the work happens over video calls and shared documents, so where you are in Miami-Dade does not limit what we can do together.',
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
        a: 'Our office is in Hollywood, Florida, in southern Broward County, roughly 30 to 45 minutes from downtown Miami depending on traffic. We work with Miami-Dade businesses in person when useful and remotely otherwise.',
      },
      {
        q: 'How can a Miami business show up in AI answers from ChatGPT or Google AI Mode?',
        a: 'Make your business facts consistent everywhere: website, Google Business Profile, directories and social profiles. Add structured data, keep key pages crawlable, and publish clear answers to the questions customers ask. No one can guarantee a mention, but these steps remove the most common reasons AI tools skip a business.',
      },
      {
        q: 'Is Google Ads worth it for a Miami business?',
        a: 'It can be, if tracking is accurate and targeting is tight. Clicks for competitive services in Miami can be expensive, so we focus spend on high-intent searches in the areas you serve, add negative keywords, and track calls and forms to measure the real cost per lead.',
      },
    ],
    updated: '2026-09-23',
  },
]

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug)
