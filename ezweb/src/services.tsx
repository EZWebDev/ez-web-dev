/**
 * Service catalog. Five services we actively sell. Rendered at /services/<slug>.
 * Content is owned by the content agent; the page component and schema live in App.tsx.
 */
export type Service = {
  slug: string
  /** Service name used as H1 and schema name (no brand suffix). */
  name: string
  /** Short label shown on cards. */
  eyebrow: string
  /** Title tag (<= 35 chars; the page appends " | EZ Web Development LLC"). */
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
    title: 'Custom Web Design & Development',
    description: 'Custom websites and web apps built for speed, search and easy editing: WordPress, Shopify and React builds from a Hollywood, FL agency.',
    summary: 'Fast, accessible websites and web apps on WordPress, Shopify or custom React, built to rank and easy to maintain.',
    intro: [
      'We design and build websites and web applications that load quickly on a phone and that your team can update without calling a developer. Most projects are a WordPress site on a lean custom theme, a Shopify store, or a custom React application such as a client portal, booking tool or internal dashboard.',
      'Search setup ships with the site. Page titles, redirects from your old URLs, schema markup, Google Analytics 4 and Search Console are in place on launch day, so there is no separate SEO project to buy afterward.',
    ],
    sections: [
      {
        heading: 'What’s included',
        body: [
          'The design is drawn for your content and your customers. We do not start from a theme demo and swap in your logo. A typical project includes:',
        ],
        bullets: [
          'Discovery call and sitemap: which pages you need and what each one must do',
          'Page designs for mobile and desktop, reviewed and approved before development starts',
          'Development on the right platform: WordPress, Shopify, or a custom React/Vite application',
          'Technical SEO foundations: clean URLs, titles and meta descriptions, heading structure, schema markup, an XML sitemap and redirects from old URLs',
          'Core Web Vitals and accessibility work: compressed images, minimal scripts, readable contrast and keyboard-friendly navigation',
          'Google Analytics 4 and Google Search Console set up and verified',
          'A short written guide for editing pages, plus documentation for anything custom',
        ],
      },
      {
        heading: 'Choosing the right platform',
        body: [
          'The platform follows from the job. WordPress suits content-heavy sites and teams that want to edit pages and publish posts themselves. Shopify suits stores that need checkout, inventory and shipping handled reliably. A custom React application makes sense when the site has to do something no theme or plugin does well, such as logged-in dashboards, quoting tools, calculators or integrations with your other systems.',
          'We will tell you when a simpler option is the better fit. A five-page service site rarely needs a custom application, and a complex internal tool should not be forced into a page builder.',
        ],
      },
      {
        heading: 'How we work',
        body: [
          'Each stage ends with something you can click through or mark up, and the next stage starts only after you approve it.',
        ],
        bullets: [
          'Discovery: goals, audience, competitors, existing analytics and content',
          'Structure: sitemap, page outlines and the primary action on each page',
          'Design: key page layouts reviewed with you, then the rest of the site',
          'Build: development on a staging site you can click through',
          'Quality checks: real phones, forms, Lighthouse speed tests, redirects and tracking',
          'Launch and handoff: hosting and DNS cutover, Search Console submission and a walkthrough on a video call',
        ],
      },
      {
        heading: 'Who it’s for',
        body: [
          'Most custom projects start from one of these situations:',
        ],
        bullets: [
          'A template site the business has outgrown, or one nobody on staff can edit',
          'An online store that has slowed down as apps and scripts piled up',
          'A marketing site that needs a custom tool next to it, such as a client portal, quote calculator or dashboard',
        ],
      },
      {
        heading: 'Timeline and what you need to provide',
        body: [
          'A typical marketing site of five to fifteen pages takes roughly four to eight weeks from kickoff to launch. Custom applications and larger stores take longer and are scoped in phases with dates agreed up front. The biggest variable is content: page copy, photos and logos. We also need access to your domain, hosting and any existing Google accounts.',
          'If writing copy is the bottleneck, we can draft it from a short interview and your existing materials, and you edit it for accuracy.',
        ],
      },
      {
        heading: 'After launch',
        body: [
          'Maintenance is available once the site is live: software and plugin updates, backups, uptime and security monitoring, hosting, and small content edits. It is optional, but skip it and plugins fall behind; unpatched plugins are one of the most common ways WordPress sites get compromised.',
        ],
      },
    ],
    deliverables: ['Sitemap & page designs', 'WordPress, Shopify or React build', 'Technical SEO & Core Web Vitals', 'Analytics, editing guide & handoff'],
    faqs: [
      {
        q: 'How much does a custom website cost?',
        a: 'Every project gets a fixed written quote after a short discovery call, so you know the price before work starts. The number depends on how many page types the site needs, the platform, and any custom features. Larger projects can be split into phases.',
      },
      {
        q: 'How long does it take to build a website?',
        a: 'Most small-business marketing sites take about four to eight weeks from kickoff to launch. The timeline depends mainly on how quickly content and feedback come back. Custom web apps and larger stores are planned in phases with dates agreed at the start.',
      },
      {
        q: 'Should I use WordPress, Shopify or a custom build?',
        a: 'Shopify if selling products online is the core of the business. WordPress if you publish a lot of content and want to edit it yourself. A custom React build when you need something off-the-shelf tools handle poorly. We recommend one after discovery and put the tradeoffs in writing.',
      },
      {
        q: 'Will I be able to update the site myself?',
        a: 'Yes. WordPress and Shopify sites come with a short written guide for editing pages, adding posts or products, and swapping images. For custom applications we build editing tools where you need them and document the rest.',
      },
      {
        q: 'Will a redesign hurt my Google rankings?',
        a: 'It should not, if the old URLs are handled. We map every old URL to its new page with a 301 redirect and keep the titles and content that already rank. After launch we watch Google Search Console to catch crawl errors early.',
      },
      {
        q: 'Do you only work with businesses in South Florida?',
        a: 'No. Projects run by phone, email, video call and shared documents, so we work with businesses anywhere in the United States.',
      },
      {
        q: 'Who owns the website when it’s finished?',
        a: 'You do. You own the domain, content, design files and code, and accounts are set up in your name or transferred to you at launch.',
      },
    ],
    serviceType: 'Web design and development',
    keywords: [
      'custom web design',
      'web development South Florida',
      'WordPress developer Hollywood FL',
      'Shopify developer',
      'React web app development',
      'website redesign',
      'Core Web Vitals optimization',
    ],
    related: ['landing-page-cro', 'monthly-seo-content', 'ai-search-ranking'],
    updated: '2026-09-23',
  },
  {
    slug: 'monthly-seo-content',
    name: 'Monthly SEO & Content',
    eyebrow: 'Organic Growth',
    title: 'Monthly SEO & Content Services',
    description: 'Monthly SEO: keyword research, technical and Core Web Vitals fixes, local pages and content written to rank, tracked in Google Search Console.',
    summary: 'Technical fixes, page improvements and new content each month, reported against Search Console data.',
    intro: [
      'Monthly SEO and content is ongoing work on your site. Each month we fix technical problems, improve pages you already have, and publish new pages aimed at the searches your customers type.',
      'Organic results take months. The work adds up, though: a page we improve in March is still bringing in searches in December, and next month’s work starts from there instead of from zero.',
    ],
    sections: [
      {
        heading: 'What happens each month',
        body: [
          'The mix changes as the site improves. Early months lean toward technical fixes and existing pages; later months lean toward new content.',
        ],
        bullets: [
          'Technical SEO: crawl and indexing issues, broken links, redirects, duplicate pages, sitemap and robots.txt health',
          'Core Web Vitals and Lighthouse fixes on the page templates that matter most',
          'On-page optimization: titles, meta descriptions, headings, internal links and schema markup',
          'New content: service pages, location pages, guides and FAQs based on keyword research',
          'Refreshes of pages that sit on page two or have lost traffic',
          'Google Business Profile updates for local businesses',
          'A monthly report and a short review call',
        ],
      },
      {
        heading: 'How we decide what to write',
        body: [
          'Keyword research starts with Google Keyword Planner and your own Google Search Console data, which shows the exact queries already bringing people to your site. We group related searches into topics, match each topic to the one page that should rank for it, and prioritize by how close each search is to a buying decision.',
          'That usually means service and location pages come before blog posts. A page that explains a service clearly, answers common questions and shows where you work will often do more for leads than a general article.',
        ],
      },
      {
        heading: 'Who it’s for',
        body: [
          'It works best when the website itself is sound and the goal is more leads from Google without paying for each click. Good fits include local service businesses competing in a defined area, stores that need category and product pages to rank, and organizations whose articles never show up in search.',
          'If the site itself is the problem, for example very slow, hard to crawl or built on a platform that blocks basic SEO, we will say so and may recommend fixing the foundation first.',
        ],
      },
      {
        heading: 'How we measure results',
        body: [
          'Each monthly report shows impressions, clicks and average position from Google Search Console; organic sessions and conversions from Google Analytics 4; and rankings for a short list of priority terms. For local businesses it adds Google Business Profile calls, direction requests and website clicks.',
          'Each report lists the pages we changed and what happened afterward, so progress can be traced to specific work.',
        ],
      },
      {
        heading: 'Timeline and expectations',
        body: [
          'Technical fixes can show an effect within weeks once Google recrawls the site. New content and competitive terms usually take three to six months to settle. No one controls Google’s results, so we do not promise rankings. You get the plan in writing and a report each month that shows what changed.',
          'From you we need access to Search Console, Analytics and your CMS, and about half an hour a month from someone who can check new content for accuracy.',
        ],
      },
      {
        heading: 'How content gets written',
        body: [
          'Pages open with the answer, name your actual services and towns, and skip the warm-up paragraph. We write the draft and you check the facts. Nothing is published without your approval.',
        ],
      },
    ],
    deliverables: ['Keyword research & topic map', 'Technical SEO & Core Web Vitals', 'New and refreshed content', 'Monthly Search Console reporting'],
    faqs: [
      {
        q: 'How long does SEO take to work?',
        a: 'Technical fixes can show results within a few weeks of Google recrawling the site. New pages and competitive keywords usually take three to six months to reach stable positions. Progress is gradual, which is why we report monthly against Search Console data.',
      },
      {
        q: 'Do you guarantee first-page rankings?',
        a: 'No. Nobody outside Google controls its rankings, and an agency that guarantees them is a warning sign. You get a written plan, the work in it, and a monthly report showing what changed.',
      },
      {
        q: 'Do you write the content, or do I?',
        a: 'We write it. You give us a short interview or notes, then check each draft before it goes live. That check matters: you will catch details about your own services that an outside writer gets wrong.',
      },
      {
        q: 'Do you do local SEO?',
        a: 'Yes. Local SEO includes service and location pages, Google Business Profile optimization, consistent name, address and phone details across directories, and local schema markup. For a service business that depends on nearby customers, this is usually the place to start.',
      },
      {
        q: 'Can you do SEO on WordPress and Shopify sites?',
        a: 'Yes. We work directly in WordPress, Shopify and custom React sites, so technical fixes are made in the site itself rather than handed back to you as a list of recommendations.',
      },
      {
        q: 'What is the difference between SEO and AI search visibility?',
        a: 'They overlap. SEO focuses on ranking in Google’s traditional results, while AI search visibility focuses on being named and cited in AI-generated answers from Google AI Mode, ChatGPT and Perplexity. Both depend on a crawlable site with consistent business information, so the work overlaps and the two are often run together.',
      },
    ],
    serviceType: 'Search engine optimization',
    keywords: [
      'monthly SEO services',
      'SEO company Hollywood FL',
      'local SEO South Florida',
      'SEO content writing',
      'technical SEO audit',
      'Google Search Console',
    ],
    related: ['ai-search-ranking', 'custom-web-design', 'landing-page-cro'],
    updated: '2026-09-23',
  },
  {
    slug: 'ai-search-ranking',
    name: 'AI Search Visibility (GEO)',
    eyebrow: 'AI Era SEO',
    title: 'AI Search Visibility (GEO)',
    description: 'Help Google AI Mode, ChatGPT and Perplexity find, understand and cite your business: entity consistency, schema, citations and crawlable pages.',
    summary: 'Entity, schema and citation work so AI answers can find and accurately describe your business.',
    intro: [
      'More people now ask Google AI Mode, AI Overviews, ChatGPT and Perplexity who to hire or what to buy, and those tools answer with a short list of named businesses. AI search visibility, also called generative engine optimization (GEO), is the work of making your business easy for those systems to find, understand, trust and cite.',
      'You cannot buy a place in an AI answer, and no trick forces a mention. The work is groundwork you can check. It means the same business facts everywhere they appear, structured data that says who you are, pages that answer questions in plain HTML, and profiles on the sites these engines already cite. We use the same methods on this site.',
    ],
    sections: [
      {
        heading: 'How AI answer engines choose which businesses to name',
        body: [
          'AI answers are assembled from sources the system can retrieve and cross-check: your website, business directories, review sites, maps listings, social profiles and articles that mention you. When those sources agree on who you are, what you do and where you are, the engine can describe you with confidence. When they conflict or are missing, it tends to name someone else or confuse you with a similarly named company. That is why GEO starts with facts and consistency, not content volume.',
        ],
      },
      {
        heading: 'What’s included',
        body: [
          'The work covers your own site and the wider web, because AI engines read both.',
        ],
        bullets: [
          'Entity audit: how Google AI Mode, ChatGPT and Perplexity describe your business today, and which sources they cite',
          'Entity consistency: one canonical name, address, phone, category and description, applied to your site and every profile',
          'Structured data: an Organization or LocalBusiness schema graph with stable @id references, founder, services, areas served and sameAs links to official profiles',
          'Citations and directory profiles: Google Business Profile, Bing Places, Apple Business Connect, LinkedIn, and relevant industry and review sites, created or corrected',
          'Crawlable HTML: key pages that deliver their text, headings and schema in the initial HTML, not only after JavaScript runs',
          'Crawler access: robots.txt rules that allow the search and AI crawlers you want, such as Googlebot, Bingbot, OAI-SearchBot and PerplexityBot',
          'llms.txt: a plain-text summary of your business and key pages for AI tools that read it',
          'Answer-ready content: FAQs, service pages and comparisons that state facts directly and can be quoted accurately',
        ],
      },
      {
        heading: 'How we measure it',
        body: [
          'We write a fixed set of prompts that match how your customers ask, such as “best [service] in [city]” and questions about your company by name. Those prompts run on a schedule in Google AI Mode, ChatGPT and Perplexity. Each run records whether your business is mentioned, whether the description is accurate, and which sources were cited.',
          'The report also includes Google Search Console data, referral traffic from AI tools in Google Analytics 4, and the status of each citation. AI answers vary from one run to the next, so we look at trends across many prompts rather than any single result.',
        ],
      },
      {
        heading: 'What we will not promise',
        body: [
          'No one can guarantee that an AI system will name your business. We can remove the reasons an engine would skip or misdescribe you, then show you, prompt by prompt, whether that changes.',
        ],
      },
      {
        heading: 'Who it’s for',
        body: [
          'Businesses that customers research by asking questions: professional services, local service companies, specialty e-commerce brands and nonprofits. It matters most if your business shares a name with other companies, if AI tools currently describe you inaccurately, or if competitors show up in AI answers and you do not.',
        ],
      },
      {
        heading: 'Timeline and what you need to provide',
        body: [
          'The audit and on-site fixes usually take two to four weeks. Directory profiles depend on each platform’s verification process, and changes in AI answers tend to appear gradually over the following weeks and months as sources are recrawled.',
          'We need access to your website, Google Business Profile and existing directory accounts, plus written confirmation of the official business facts.',
        ],
      },
    ],
    deliverables: ['Entity audit & fact sheet', 'Schema graph & sameAs', 'Directory citations', 'Prompt tracking & reporting'],
    faqs: [
      {
        q: 'What is generative engine optimization (GEO)?',
        a: 'GEO is the practice of making a business easy for AI answer engines to find, understand and cite. It focuses on consistent business facts, structured data, crawlable pages and trusted third-party profiles, so tools like Google AI Mode, ChatGPT and Perplexity can describe the business accurately.',
      },
      {
        q: 'Is GEO different from SEO?',
        a: 'GEO builds on SEO rather than replacing it. Traditional SEO focuses on ranking pages in search results, while GEO focuses on whether AI-generated answers mention and cite your business. A crawlable, well-structured site with consistent facts helps both.',
      },
      {
        q: 'Can you guarantee my business will appear in ChatGPT or Google AI Mode?',
        a: 'No. AI answers are generated fresh for each query and no outside party controls them. We fix what keeps engines from citing you, add the profiles and markup they look for, and log mentions over time.',
      },
      {
        q: 'How do you track AI search visibility?',
        a: 'We run a fixed set of customer-style prompts in Google AI Mode, ChatGPT and Perplexity on a regular schedule and log whether your business is named, how it is described and which sources are cited. Search Console data and AI referral traffic from Google Analytics 4 go in the same report.',
      },
      {
        q: 'What is llms.txt, and do I need one?',
        a: 'llms.txt is a Markdown file at the root of a website that summarizes the business and links to its most important pages for AI tools. It is a proposed convention, not an official standard, and not every AI system reads it. It is cheap to add, so we include it, but it supplements good pages and schema rather than replacing them.',
      },
      {
        q: 'Should I block AI crawlers in robots.txt?',
        a: 'If you want to be cited in AI answers, generally no. Search crawlers such as OAI-SearchBot and PerplexityBot need to read your pages in order to cite them. Some businesses block crawlers used only for model training while allowing search crawlers, and we can set up rules either way.',
      },
      {
        q: 'How long before AI answers mention my business?',
        a: 'It varies. On-site fixes take effect as soon as pages are recrawled, but new directory profiles and third-party mentions take weeks to months to be picked up. We track the same prompts over time so you can see when mentions start to appear.',
      },
    ],
    serviceType: 'Generative engine optimization',
    keywords: [
      'generative engine optimization',
      'GEO services',
      'AI search optimization',
      'get cited in ChatGPT',
      'Google AI Mode optimization',
      'Perplexity SEO',
      'entity SEO',
    ],
    related: ['monthly-seo-content', 'custom-web-design'],
    updated: '2026-09-23',
  },
  {
    slug: 'landing-page-cro',
    name: 'Landing Page & Conversion Rate Optimization',
    eyebrow: 'Conversions',
    title: 'Landing Page Design & CRO',
    description: 'Landing pages and CRO: clearer offers, faster pages, on-site surveys and A/B tests that turn more of your existing traffic into calls, leads and sales.',
    summary: 'Research, on-site surveys, speed fixes and tests that turn more visitors into leads and customers.',
    intro: [
      'Conversion rate optimization (CRO) is the work of getting more of the people who already visit your site to call, book, fill out a form or buy. It is often the cheapest growth available. You have already paid for those visitors in ad spend or SEO work; CRO gets more of them to act.',
      'We build new landing pages for ad campaigns and individual services, and we fix existing pages using analytics, short on-site surveys and A/B tests where the traffic supports them.',
    ],
    sections: [
      {
        heading: 'What’s included',
        body: [
          'CRO projects start with measurement and end with a written record of what changed and why.',
        ],
        bullets: [
          'Conversion tracking audit: calls, forms, bookings and purchases measured correctly in Google Analytics 4 and your ad accounts before anything changes',
          'Page review: clarity of the offer, the path to the main action, form length, trust signals and mobile usability',
          'On-site surveys: short questions asked of real visitors, such as what almost stopped them from getting in touch',
          'Speed fixes: images, scripts and layout shifts that slow a page down or make it jump',
          'New landing pages built for specific ads, services or offers',
          'A/B tests where traffic is high enough to reach a reliable result',
          'A written summary of each change and what was learned',
        ],
      },
      {
        heading: 'How we work',
        body: [
          'Every change starts from evidence. We look at where visitors drop off in analytics, what they say in surveys, and how the page behaves on a phone. From that we write a short list of hypotheses, each with the reason we expect it to help, and prioritize by likely impact and effort.',
          'When a page has enough traffic, we test changes against the original. When it does not, we make the clearly justified fixes directly and compare results over a longer period, because a test that cannot reach a reliable answer is not worth running.',
        ],
      },
      {
        heading: 'What usually makes the biggest difference',
        body: [
          'Button colors almost never move the number. These usually do:',
        ],
        bullets: [
          'A headline that says exactly what you do and for whom',
          'An offer that matches the ad or search that brought the visitor',
          'Fewer form fields',
          'Reviews and credentials near the top of the page',
          'A page that loads quickly on a phone',
        ],
      },
      {
        heading: 'Who it’s for',
        body: [
          'Businesses running Google or Meta ads that want a better return on their spend, service firms whose sites get traffic but few inquiries, and e-commerce stores that want more visitors to reach checkout. It is also a sensible first project when a full redesign is not in the budget.',
        ],
      },
      {
        heading: 'Timeline and what you need to provide',
        body: [
          'An audit and first round of fixes usually takes two to four weeks, and a new landing page typically takes one to three weeks depending on copy and approvals. Testing programs run month to month.',
          'We need access to Google Analytics, your Google Ads or Meta ad accounts if you use them, and your website or CMS, plus someone who can tell us which leads turned into customers.',
        ],
      },
      {
        heading: 'How we measure results',
        body: [
          'The primary measure is the conversion rate of the page or funnel for the action that matters, such as calls, qualified form submissions or completed orders. Where possible we also track lead quality and revenue, because a page that produces more leads of worse quality is not an improvement.',
        ],
      },
    ],
    deliverables: ['Tracking audit & baseline', 'Research, surveys & hypotheses', 'Landing pages & tests', 'Results log & learnings'],
    faqs: [
      {
        q: 'What is conversion rate optimization?',
        a: 'It is the work of raising the share of visitors who call, book or buy. Analytics and short visitor surveys show what stops people from acting. CRO fixes those things one at a time and measures each change.',
      },
      {
        q: 'What is a good conversion rate for a landing page?',
        a: 'The one to beat is your own page’s current rate. Published averages vary too much by industry, offer, traffic source and what counts as a conversion to be a useful target, so we set a baseline first and measure from there.',
      },
      {
        q: 'How much traffic do I need for A/B testing?',
        a: 'Enough to reach a statistically reliable result in a reasonable time, which usually means hundreds of conversions per variation rather than dozens. Pages with less traffic benefit more from research-driven fixes and before-and-after comparisons than from formal tests.',
      },
      {
        q: 'Do you build landing pages for Google and Meta ads?',
        a: 'Yes. Each page matches the keywords or ad copy that send traffic to it and loads quickly on mobile. Calls and form submissions are tracked as conversions in Google Analytics 4 and in the ad platform that sent the visitor.',
      },
      {
        q: 'What are on-site surveys?',
        a: 'On-site surveys are one- or two-question prompts shown to visitors while they browse, such as “What’s stopping you from booking today?” The answers reveal objections and missing information that analytics alone cannot show.',
      },
      {
        q: 'Do I need a full redesign to improve conversions?',
        a: 'Usually not. Most conversion problems can be fixed on the existing site by clarifying the offer, simplifying forms, adding proof and improving speed. A redesign makes sense only when the platform itself blocks those changes.',
      },
    ],
    serviceType: 'Conversion rate optimization',
    keywords: [
      'conversion rate optimization',
      'landing page design',
      'CRO services',
      'A/B testing',
      'Google Ads landing pages',
      'on-site surveys',
    ],
    related: ['google-ads', 'custom-web-design', 'monthly-seo-content'],
    updated: '2026-09-23',
  },
  {
    slug: 'google-ads',
    name: 'Google & Meta Ads Management',
    eyebrow: 'Paid Ads',
    title: 'Google & Meta Ads Management',
    description: 'Google Search, Shopping and Performance Max plus Meta ads on Facebook and Instagram, built on accurate tracking. White-label management for agencies.',
    summary: 'Google and Meta campaigns built on accurate conversion tracking and matched landing pages, with a white-label option for agencies.',
    intro: [
      'We set up and manage paid ads on Google and Meta for local businesses, professional services firms and e-commerce brands. On Meta that means Facebook and Instagram campaigns run from Meta Ads Manager. On Google it means Search, Shopping and Performance Max campaigns, plus remarketing.',
      'We also build websites, so conversion tracking, landing pages and product feeds stay with one person. Those are the pieces that usually fall between an ad agency and a web developer. Other agencies can hire us to run Google and Meta ads for their clients under the agency’s brand.',
    ],
    sections: [
      {
        heading: 'What’s included',
        body: [
          'Management covers the ad accounts, the tracking and the pages the ads send people to.',
        ],
        bullets: [
          'Account audit: structure, wasted spend, tracking accuracy and policy issues in Google Ads and Meta Ads Manager',
          'Conversion tracking for calls, forms, bookings and purchases, with offline conversions where your CRM allows',
          'Google Search campaigns organized by service and intent, with negative keyword lists and location targeting that matches where you actually work',
          'Google Merchant Center and Shopping: feed setup and fixes, disapproval troubleshooting, and Shopping or Performance Max campaigns',
          'Meta campaigns on Facebook and Instagram, with audiences and locations set to the customers you want',
          'Ad copy and assets: headlines, sitelinks and call assets on Google; ad text paired with your images or video on Meta',
          'Landing pages matched to each campaign',
          'Ongoing management: bids, budget pacing, search term review and ad testing',
          'Monthly reporting in plain language',
        ],
      },
      {
        heading: 'Conversion tracking on both platforms',
        body: [
          'On Google, we set up Google Ads conversion tracking and Google Analytics 4, then check that both count the same calls, forms and purchases.',
          'On Meta, we install the Meta Pixel in the browser and the Conversions API on the server. The server events still reach Meta when a browser blocks the pixel. Events sent both ways are deduplicated so each conversion counts once.',
        ],
      },
      {
        heading: 'How we manage campaigns',
        body: [
          'Management starts with tracking. Google and Meta both bid automatically toward whatever counts as a conversion. If that count is wrong, the budget goes to the wrong people, so we verify tracking before increasing spend.',
          'From there, regular work includes reviewing search terms, adding negatives, adjusting bids and budgets, testing new ads and pausing what is not working. We prefer simple accounts. A few campaigns with enough data tend to perform more predictably than many small ones competing for the same budget.',
        ],
      },
      {
        heading: 'Local service businesses',
        body: [
          'For local businesses the priorities are tight geographic targeting, call tracking, ad schedules that match when someone can answer the phone, and negative keywords that screen out job seekers, do-it-yourself searches and out-of-area queries. In South Florida that often means drawing the target area carefully across Broward and Miami-Dade rather than advertising to the whole region.',
        ],
      },
      {
        heading: 'E-commerce and Google Merchant Center',
        body: [
          'For online stores, product data is the campaign. We clean up titles, descriptions, categories, identifiers and images in Google Merchant Center, fix disapprovals, and structure Shopping or Performance Max campaigns so the budget goes to the products that earn the most. Shopify stores connect through the Google & YouTube app, and other platforms through a product feed.',
        ],
      },
      {
        heading: 'White-label ads management for agencies',
        body: [
          'Some agencies sell paid ads to their clients but do not run campaigns in house. We manage those Google and Meta accounts under your agency’s brand.',
          'Your agency keeps the client relationship. Reports come to your agency, ready to pass on under your own name, and questions from the client come through you.',
        ],
        bullets: [
          'Campaign setup and ongoing management in Google Ads and Meta Ads Manager',
          'Conversion tracking with Google Ads, GA4, the Meta Pixel and the Conversions API',
          'Monthly reporting delivered to your agency',
        ],
      },
      {
        heading: 'How we measure results',
        body: [
          'Reports focus on cost per lead or cost per acquisition, conversion value and return on ad spend for e-commerce, and, where you can share it, how many leads became customers. Google and Meta results sit side by side in the same report. Clicks and impressions are included for context, but they are not the goal.',
        ],
      },
      {
        heading: 'Who it’s for',
        body: [
          'Businesses ready to pay for qualified traffic and able to handle the leads it brings. If the website or tracking is not ready, we will recommend fixing that first so ad spend is not wasted. The white-label option is for agencies that want Google and Meta ads handled without hiring for it.',
        ],
      },
    ],
    deliverables: ['Google Ads, GA4, Meta Pixel & Conversions API tracking', 'Google Search, Shopping & Performance Max', 'Facebook & Instagram campaigns', 'White-label option for agencies', 'Management & monthly reports'],
    faqs: [
      {
        q: 'How much should I spend on Google or Meta ads?',
        a: 'It depends on how competitive your market is, what a customer is worth to you and how large an area you serve. For Google we start from Keyword Planner cost estimates and your average customer value. Ad spend is paid directly to Google or Meta, separately from management fees.',
      },
      {
        q: 'How long does it take for paid ads to work?',
        a: 'Ads can produce clicks and leads within days of launch. Automated bidding on both Google and Meta needs several weeks of conversion data to settle, so the first month or two involves more adjustment than later months.',
      },
      {
        q: 'Do you set up conversion tracking?',
        a: 'Yes, and we do it before scaling spend. On Google we use Google Ads conversion tracking and Google Analytics 4. On Meta we use the Meta Pixel together with the Conversions API. Where your CRM allows, we also import offline conversions so bidding optimizes for real customers.',
      },
      {
        q: 'Can you fix Google Merchant Center disapprovals?',
        a: 'Yes. Common causes include mismatched prices, missing shipping or return policy details, missing product identifiers, and landing pages that do not match the feed. We find the cause in Merchant Center diagnostics, correct the feed or the site, and request a review.',
      },
      {
        q: 'Who owns the ad accounts?',
        a: 'You do. Campaigns run in Google Ads and Meta ad accounts owned by your business, with us given manager access. Your data and history stay with you if you ever change providers.',
      },
      {
        q: 'Which ad platforms do you manage?',
        a: 'Google and Meta. On Google that means Search, Shopping, Performance Max and remarketing. On Meta it means Facebook and Instagram campaigns.',
      },
      {
        q: 'Do you offer white-label Google and Meta ads management for agencies?',
        a: 'Yes. We run the campaigns under your agency’s brand and deliver reports to your agency. Your agency keeps the client relationship.',
      },
    ],
    serviceType: 'Paid search and paid social advertising management',
    keywords: [
      'Google Ads management',
      'Meta ads management',
      'Facebook ads management',
      'Instagram ads',
      'PPC agency South Florida',
      'Google Shopping management',
      'Google Merchant Center help',
      'Performance Max',
      'Meta Conversions API',
      'white-label PPC for agencies',
      'white-label Meta ads',
    ],
    related: ['landing-page-cro', 'monthly-seo-content', 'custom-web-design'],
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
  '/services/full-website-packages': '/services/custom-web-design',
}

export const getService = (slug: string) => services.find((s) => s.slug === slug)
