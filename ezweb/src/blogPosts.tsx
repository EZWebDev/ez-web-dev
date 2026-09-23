import type { ReactNode } from 'react'
import { business } from './business'

export type BlogPost = {
  slug: string
  title: string
  description: string
  /** YYYY-MM-DD original publish date. */
  date: string
  /** YYYY-MM-DD last material revision (omit if never revised). */
  updated?: string
  /** Absolute or root-relative URL of the post's social/hero image. */
  image?: string
  tags?: string[]
  keywords?: string[]
  content: ReactNode
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ez-web-development-llc-hollywood-fl',
    title: 'About EZ Web Development LLC: Web Development & SEO in Hollywood, FL',
    description: 'Who EZ Web Development LLC is: a web development and SEO studio in Hollywood, Florida, founded in 2022 by Ezra Pinsky. Services, service area and contact.',
    date: '2026-09-23',
    tags: ['company'],
    keywords: ['EZ Web Development LLC', 'EZ Web Development Hollywood FL', 'ezweb.dev', 'Ezra Pinsky', 'web development Hollywood Florida'],
    content: (
      <div className="prose">
        <p>EZ Web Development LLC is a web development and SEO studio in Hollywood, Florida, founded in 2022 by Ezra Pinsky. The company designs and builds websites and web applications, runs monthly SEO and AI search visibility programs, improves landing-page conversion, and manages Google Ads for small businesses, professional services firms, e-commerce brands, and nonprofits and educators. This page sets out the basic facts about the company in one place.</p>
        <h2>Company facts</h2>
        <ul>
          <li><strong>Legal name:</strong> EZ Web Development LLC</li>
          <li><strong>Entity type:</strong> Florida limited liability company, Florida Division of Corporations document number L22000242599, formed May 25, 2022</li>
          <li><strong>Founder:</strong> Ezra Pinsky</li>
          <li><strong>Address:</strong> 1909 Tyler Street Suite 308, Hollywood, FL 33020</li>
          <li><strong>Phone:</strong> <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></li>
          <li><strong>Email:</strong> <a href={`mailto:${business.email}`}>{business.email}</a></li>
          <li><strong>Hours:</strong> Monday to Friday, 9am to 5pm Eastern</li>
          <li><strong>Website:</strong> <a href={business.url}>ezweb.dev</a></li>
          <li><strong>Google Business Profile category:</strong> Internet marketing service</li>
        </ul>
        <h2>What the company does</h2>
        <p>The studio’s work falls into six services:</p>
        <ul>
          <li><a href="/services/custom-web-design">Custom web design and development</a>: WordPress sites and maintenance, Shopify stores, and custom React/Vite web applications and dashboards</li>
          <li><a href="/services/full-website-packages">Full website packages</a>: strategy, copy, design, build, SEO setup, analytics, hosting and launch in one project</li>
          <li><a href="/services/monthly-seo-content">Monthly SEO and content</a>: technical SEO, Core Web Vitals and Lighthouse fixes, keyword research and content, tracked in Google Search Console</li>
          <li><a href="/services/ai-search-ranking">AI search visibility (GEO)</a>: entity consistency, schema markup and directory citations so AI answer engines can describe a business accurately</li>
          <li><a href="/services/landing-page-cro">Landing pages and conversion rate optimization</a>: landing pages, on-site surveys and testing</li>
          <li><a href="/services/google-ads">Google Ads management</a>: Search, Shopping and Performance Max campaigns, Google Merchant Center feeds and conversion tracking</li>
        </ul>
        <p>The studio also manages hosting for the sites it builds and maintains.</p>
        <h2>Who the company works with</h2>
        <p>Clients include small businesses, professional services firms, e-commerce brands, and nonprofits and educators. Projects range from a single landing page or a technical SEO fix to full website builds, custom web applications and ongoing monthly SEO or advertising programs.</p>
        <h2>How the studio works</h2>
        <p>EZ Web Development LLC is founder-led. Clients work directly with Ezra Pinsky from the first call through launch and ongoing support, and each project’s scope is agreed in writing before work begins.</p>
        <h2>Service area</h2>
        <p>EZ Web Development LLC serves businesses in Hollywood, Fort Lauderdale and Miami, and across Broward County and Miami-Dade County in South Florida. Local clients can meet in person. The company also works remotely with clients throughout the United States.</p>
        <h2>How to get in touch</h2>
        <p>Call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a> or email <a href={`mailto:${business.email}`}>{business.email}</a> during business hours, or use the <a href="/contact">contact page</a>. In-person meetings at the Hollywood office are by appointment.</p>
        <h2>Not affiliated with similarly named companies</h2>
        <p>Several unrelated businesses have names similar to ours. To avoid confusion, EZ Web Development LLC is not affiliated with:</p>
        <ul>
          <li>EZ Web LLC (ezweb.work) of High Ridge, Missouri</li>
          <li>EZ Web Solution LLC of Euless, Texas</li>
          <li>EZ Web Company (ezweb.company) of Clearwater and Palm Harbor, Florida</li>
        </ul>
        <p>We have no connection to these companies and cannot answer questions about their services or accounts. If you are looking for one of them, please contact them directly. Our website is ezweb.dev, and our email addresses end in @ezweb.dev.</p>
      </div>
    ),
  },
  {
    slug: 'which-website-platform-2025',
    title: 'Which Website Platform Should You Use in 2026? A Plain-English Guide',
    description: 'How to choose between Wix, Squarespace, Webflow, Shopify, WordPress and a custom build in 2026, based on budget, editing, SEO, AI search and growth.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['platforms', 'web-design', 'seo'],
    keywords: ['website platform comparison', 'Wix vs Squarespace', 'Webflow vs WordPress', 'Shopify vs custom website', 'best website platform 2026', 'best website builder for small business'],
    content: (
      <div className="prose">
        <p>Choosing a website platform is less about feature lists than about three questions: how fast you need to launch, how much the site needs to grow, and what it will cost to run over the next few years. Pick well and the platform disappears into the background. Pick badly and you pay for it twice, once to build and again to migrate.</p>
        <h2>Key takeaways</h2>
        <ul>
          <li>Simple brochure site on a small budget: Squarespace or Wix.</li>
          <li>Design-led marketing site with no plugin maintenance: Webflow.</li>
          <li>Selling products online: Shopify.</li>
          <li>Lots of content and a team that edits it: WordPress.</li>
          <li>Logged-in features, custom tools or integrations: a custom build.</li>
          <li>Whatever you choose, check that it serves real HTML, passes Core Web Vitals and lets you control SEO basics.</li>
        </ul>
        <h2>What has changed since 2025</h2>
        <p>Three things shift the decision this year. First, AI search tools such as Google AI Mode, ChatGPT and Perplexity now answer many questions that used to send people to websites, and several of the crawlers behind them read raw HTML without running JavaScript. A platform that delivers your content as plain HTML is easier for them to read and cite.</p>
        <p>Second, Core Web Vitals now measure responsiveness with Interaction to Next Paint (INP), which replaced First Input Delay in 2024. Heavy scripts and stacked third-party apps hurt INP more than they hurt older metrics. Third, every hosted builder now ships AI writing and design helpers. They speed up a first draft, but they do not change which platform fits your business.</p>
        <h2>Squarespace</h2>
        <p><strong>Best for:</strong> solo founders, simple service businesses and portfolios.</p>
        <p><strong>Strengths:</strong> polished templates, easy editing and predictable monthly cost.</p>
        <p><strong>Tradeoffs:</strong> limited control over layout, code and advanced SEO such as custom schema.</p>
        <p><strong>Watch for:</strong> outgrowing it once you need many landing pages, integrations or testing.</p>
        <h2>Wix</h2>
        <p><strong>Best for:</strong> small businesses that want more built-in features than Squarespace, such as bookings or simple stores.</p>
        <p><strong>Strengths:</strong> a large app marketplace and flexible drag-and-drop editing.</p>
        <p><strong>Tradeoffs:</strong> pages can get heavy as apps and effects accumulate, and moving off Wix later means rebuilding.</p>
        <p><strong>Watch for:</strong> app sprawl. Install only what you use and check speed after each addition.</p>
        <h2>Webflow</h2>
        <p><strong>Best for:</strong> design-led brands and marketing teams that want precise control without maintaining plugins.</p>
        <p><strong>Strengths:</strong> clean output, a capable CMS, and a visual workflow that designers and developers both understand.</p>
        <p><strong>Tradeoffs:</strong> a real learning curve, and complex logic still needs custom code or outside services.</p>
        <p><strong>Watch for:</strong> heavy animations that slow the largest content element or shift the layout.</p>
        <h2>Shopify</h2>
        <p><strong>Best for:</strong> e-commerce of almost any size.</p>
        <p><strong>Strengths:</strong> reliable checkout, payments, shipping and inventory, plus direct connections to Google Merchant Center and other sales channels.</p>
        <p><strong>Tradeoffs:</strong> monthly app costs add up, and themes collect leftover code over time.</p>
        <p><strong>Watch for:</strong> duplicate apps, oversized images and tracking scripts that pile up on product pages.</p>
        <h2>WordPress</h2>
        <p><strong>Best for:</strong> content-heavy sites, blogs and teams with editorial workflows.</p>
        <p><strong>Strengths:</strong> the largest ecosystem of themes and plugins, full ownership, and strong SEO control.</p>
        <p><strong>Tradeoffs:</strong> updates, security and plugin conflicts need ongoing maintenance.</p>
        <p><strong>Watch for:</strong> bloated page builders. A lean theme, a short plugin list, managed hosting and a staging site keep WordPress fast and stable.</p>
        <h2>A custom build</h2>
        <p><strong>Best for:</strong> client portals, dashboards, quoting tools, complex integrations and sites where performance or unusual functionality matter most.</p>
        <p><strong>Strengths:</strong> full control over speed, structure, SEO and features, with no platform limits.</p>
        <p><strong>Tradeoffs:</strong> higher upfront cost and a need for an experienced developer to maintain it.</p>
        <p><strong>Typical stack:</strong> React with Vite or a framework like Next.js, prerendered to static HTML where possible, often paired with a headless CMS for editable content.</p>
        <h2>Checks that apply to every platform</h2>
        <ul>
          <li><strong>Core Web Vitals:</strong> Google’s “good” thresholds are LCP at or under 2.5 seconds, INP at or under 200 milliseconds and CLS at or under 0.1, measured on real visits.</li>
          <li><strong>Real HTML:</strong> use “View page source” and confirm your headings and text are there without JavaScript.</li>
          <li><strong>SEO control:</strong> you can edit titles, meta descriptions, URLs, redirects, robots.txt and structured data.</li>
          <li><strong>Ownership:</strong> the domain, content and accounts are in your name.</li>
          <li><strong>Conversion basics:</strong> a clear headline, one primary action per page and forms that work on a phone.</li>
        </ul>
        <h2>Total cost of ownership</h2>
        <p>Compare platforms over three years, not one month. Add the subscription, paid apps or plugins, hosting, developer time for changes, and the likely cost of migrating later. A cheap builder that needs rebuilding in two years can cost more than a sturdier platform chosen at the start.</p>
        <h2>A simple decision flow</h2>
        <ul>
          <li>Do you sell products online? Start with Shopify.</li>
          <li>Do you need logged-in users, custom tools or deep integrations? Go custom.</li>
          <li>Will you publish content every month? WordPress or Webflow.</li>
          <li>Do you need a simple site live this month? Squarespace or Wix.</li>
        </ul>
        <h2>Where we fit</h2>
        <p>We build on WordPress, Shopify and custom React, and we will recommend a hosted builder when that is the better fit. If you want help choosing, see our <a href="/services/custom-web-design">custom web design and development</a> service or <a href="/contact">get in touch</a>.</p>
      </div>
    ),
  },
  {
    slug: 'first-website-mistakes',
    title: 'Top 5 First‑Website Mistakes That Kill Results (and How to Fix Them)',
    description: 'Avoid these common first‑website mistakes—platform choice, slow pages, weak SEO, no CRO, no analytics—and learn how to fix each fast.',
    date: '2025-01-12',
    tags: ['beginner', 'seo', 'cwv', 'cro'],
    keywords: ['website mistakes', 'first website tips', 'website SEO mistakes', 'CRO mistakes', 'how to build first website'],
    content: (
      <div className="prose">
        <p>New site, no results? These are the problems we see most often, and the fastest ways to turn things around.</p>
        <h2>1) Building Before Positioning</h2>
        <p><strong>Symptom</strong>: Pretty site, unclear offer, low conversions.</p>
        <p><strong>Fix</strong>: Define your ideal customer, the main problem you solve, your proof, and one primary call to action per page.</p>
        <p><strong>EZ Web</strong>: Landing Page & CRO, Full Website Packages.</p>
        <h2>2) Choosing the Wrong Platform</h2>
        <p><strong>Symptom</strong>: Can’t edit easily, no integrations, SEO/CWV issues.</p>
        <p><strong>Fix</strong>: Choose the platform that matches goals (see our platform guide).</p>
        <p><strong>EZ Web</strong>: Platform audits, Custom Web Design, Full Website Packages.</p>
        <h2>3) Slow Pages and Failing Core Web Vitals</h2>
        <p><strong>Symptom</strong>: High bounce, low rankings.</p>
        <p><strong>Fix</strong>: Image/CDN hygiene, ship less JS, preconnect/preload, compress fonts.</p>
        <p><strong>EZ Web</strong>: Performance fixes, Core Web Vitals and Lighthouse audits.</p>
        <h2>4) Treating SEO as a “Later” Project</h2>
        <p><strong>Symptom</strong>: Thin pages, no internal linking, no schema.</p>
        <p><strong>Fix</strong>: Topic clusters, service pages, location pages, FAQs, schema.</p>
        <p><strong>EZ Web</strong>: Monthly SEO & Content, AI Search Visibility.</p>
        <h2>5) No Conversion Path (or Too Many)</h2>
        <p><strong>Symptom</strong>: Traffic but no pipeline.</p>
        <p><strong>Fix</strong>: One clear CTA per page, limited form fields, social proof above fold.</p>
        <p><strong>EZ Web</strong>: Landing Page & CRO, Google Ads landing pages.</p>
        <h2>Bonus: Ignoring Analytics, Consent, and QA</h2>
        <p>Set up Google Analytics 4 and Google Search Console, handle cookie consent, and run a QA checklist before launch. Then monitor and iterate.</p>
      </div>
    ),
  },
  {
    slug: 'are-boutique-agencies-dying',
    title: 'Are Boutique Agencies Dying? Why Founder-Led Studios Still Win',
    description: 'Boutique agencies aren’t dying. When a small, founder-led studio is the better choice, when it isn’t, and what to ask before you hire either one.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['agencies', 'strategy'],
    keywords: ['boutique agency', 'small agency vs big agency', 'hire boutique agency', 'benefits of boutique agency', 'founder-led agency'],
    content: (
      <div className="prose">
        <p>“Big teams mean big outcomes” is a common assumption. In practice, layers of account management and hand-offs can slow work down and blur accountability. That does not make large agencies bad. It makes them the right fit for different problems.</p>
        <h2>What has changed</h2>
        <ul>
          <li>AI tools have cut the time needed for routine production work, so headcount matters less than judgment.</li>
          <li>Site speed, technical SEO and AI search visibility reward careful technical work more than volume.</li>
          <li>Buyers increasingly want direct access to the person doing the work.</li>
        </ul>
        <h2>Where small studios have the edge</h2>
        <ul>
          <li><strong>Direct access:</strong> you talk to the person who plans and does the work, not a go-between.</li>
          <li><strong>Short feedback loops:</strong> questions get answered and changes get made without internal hand-offs.</li>
          <li><strong>Focus:</strong> fewer clients at a time means more attention on each one.</li>
          <li><strong>Cost structure:</strong> you pay for the work rather than for layers of management and office overhead.</li>
        </ul>
        <h2>When a boutique isn’t the right fit</h2>
        <p>Around-the-clock support, many simultaneous workstreams, heavy compliance requirements or enterprise-scale media buying usually call for a larger team. A good small studio will tell you that up front and help you find the right partner.</p>
        <h2>Questions to ask any agency</h2>
        <ul>
          <li>Who exactly will do the work on my account?</li>
          <li>Who owns the domain, code, ad accounts and analytics data?</li>
          <li>How will results be measured, and how often will I see them?</li>
          <li>What happens if the main person is unavailable?</li>
          <li>Can I see comparable work, or speak with a past client?</li>
        </ul>
        <h2>A sensible working model</h2>
        <p>Start with a short discovery phase, fix or build the foundation, measure what matters, then improve month by month. Each step should end with clear deliverables and agreed measures of success.</p>
        <h2>What we bring</h2>
        <p>EZ Web Development LLC is a founder-led studio in Hollywood, Florida. We offer <a href="/services/custom-web-design">custom web design and development</a>, <a href="/services/full-website-packages">full website packages</a>, <a href="/services/monthly-seo-content">monthly SEO and content</a>, <a href="/services/ai-search-ranking">AI search visibility</a>, <a href="/services/landing-page-cro">landing pages and CRO</a>, and <a href="/services/google-ads">Google Ads management</a>.</p>
      </div>
    ),
  },
  {
    slug: 'entity-first-seo-ai-answers',
    title: 'Entity-First SEO: How to Get Cited in ChatGPT, AI Mode and Perplexity',
    description: 'A practical guide to getting your business cited in AI answers: entity facts, NAP, schema @id graphs, sameAs, citations, crawlable HTML and llms.txt.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['seo', 'ai', 'geo'],
    keywords: ['AI search SEO', 'entity SEO', 'generative engine optimization', 'get cited in ChatGPT', 'Google AI Mode optimization', 'Perplexity SEO', 'llms.txt', 'schema sameAs'],
    content: (
      <div className="prose">
        <p>When someone asks Google AI Mode, ChatGPT or Perplexity “who’s a good web developer near me?” or “what is [company name]?”, the reply is a short paragraph that names a few businesses and links to the sources it relied on. Getting into that paragraph is less about keywords than about identity. The engine has to know your business exists, understand what it does and where, and find enough sources that agree before it will say so with confidence.</p>
        <p>This guide explains how that works and gives a step-by-step checklist. It is the same process we use on our own site. There are no tricks here, and no one can guarantee a mention, but each step removes a common reason AI tools skip a business or describe it incorrectly.</p>
        <h2>Key takeaways</h2>
        <ul>
          <li>AI answer engines retrieve web pages and cross-check facts. Consistency across sources matters more than content volume.</li>
          <li>Decide your canonical business facts once and use them word for word everywhere.</li>
          <li>Describe your business with a connected schema graph that uses stable <code>@id</code> values and <code>sameAs</code> links.</li>
          <li>Build profiles on the directories and platforms AI tools already cite.</li>
          <li>Serve real HTML to crawlers, and allow the search crawlers you want in robots.txt.</li>
          <li>Measure with a fixed set of prompts over time, not with one-off screenshots.</li>
        </ul>
        <h2>How AI answer engines decide which businesses to mention</h2>
        <p>Most AI search products work in two steps. First they retrieve: they search a web index and pull back pages that look relevant. Google’s AI Overviews and AI Mode draw on Google’s own search index, while tools such as ChatGPT search and Perplexity use a mix of their own crawlers and third-party search indexes. Then they generate: a language model reads those pages and writes an answer, usually citing some of them.</p>
        <p>An entity, in this context, is a distinct real-world thing with attributes: a business with a name, a location, a category, a founder and a website. When the retrieved sources agree on those attributes, the model can state them. When sources disagree, for example two different addresses or a name shared with an unrelated company in another state, the model hedges, blends the two businesses together or leaves you out. Entity-first SEO is the work of making your attributes easy to find and hard to confuse.</p>
        <h2>Step 1: Write down your canonical entity facts</h2>
        <p>Before touching the website, create one source of truth, a simple document or spreadsheet, containing:</p>
        <ul>
          <li>Your legal name, plus the one short name you use publicly</li>
          <li>Your street address in one exact format, with the suite written the same way every time</li>
          <li>One primary phone number</li>
          <li>Your primary business category</li>
          <li>A one-sentence description that says who you are, where you are, what you do and for whom</li>
          <li>Founding year and founder</li>
          <li>Service area</li>
          <li>Your official website and profile URLs</li>
        </ul>
        <p>The one-sentence description matters more than it looks. AI answers often describe a business in a single sentence, and a description that is stated plainly and repeated consistently is the one most likely to be picked up.</p>
        <h2>Step 2: Make your NAP consistent everywhere</h2>
        <p>NAP stands for name, address and phone. Search for your business name and phone number, list every place they appear (directories, social profiles, old listings, review sites, and your own footer and contact page) and correct anything that does not match your canonical facts. Formatting differences such as “Ste” versus “Suite” matter less than real conflicts such as an old address or a former phone number, so fix the conflicts first.</p>
        <p>Put the full NAP in visible text on your site, usually in the footer and on the contact page. Do not rely only on an image, a map embed or schema markup.</p>
        <h2>Step 3: Build a connected schema graph</h2>
        <p>Structured data, written as schema.org markup in JSON-LD, lets you state your facts in a machine-readable form. The biggest improvement over a basic setup is connecting the pieces with stable identifiers so every page describes the same business and person:</p>
        <ul>
          <li>Give your business a single <code>@id</code>, such as <code>https://example.com/#organization</code>, and use a specific type like <code>ProfessionalService</code> or another <code>LocalBusiness</code> subtype where it fits.</li>
          <li>Include <code>name</code>, <code>url</code>, <code>logo</code>, <code>address</code>, <code>telephone</code>, <code>areaServed</code>, <code>foundingDate</code> and <code>openingHoursSpecification</code>, matching your canonical facts exactly.</li>
          <li>Describe the founder as a <code>Person</code> with its own <code>@id</code>, referenced from the business’s <code>founder</code> property.</li>
          <li>Reference the business <code>@id</code> from each <code>Service</code> as its <code>provider</code> and from each <code>BlogPosting</code> as its <code>publisher</code>, and reference the founder as <code>author</code>.</li>
          <li>Add <code>sameAs</code> with the URLs of your official profiles: Google Business Profile, LinkedIn, and every directory or social profile you control.</li>
        </ul>
        <p>The result is a small, consistent graph in which every page points back to the same entities instead of redefining them. Check it with Google’s Rich Results Test and the Schema Markup Validator at validator.schema.org.</p>
        <h2>Step 4: Build citations where AI tools look</h2>
        <p>AI answers often cite third-party profiles alongside company websites, especially for “who should I hire” questions. For most small businesses the most useful profiles are:</p>
        <ul>
          <li><strong>Google Business Profile</strong>, which feeds Google Maps and Google’s local results</li>
          <li><strong>Bing Places for Business</strong>, because Bing’s index powers Microsoft Copilot and is used by other AI search products</li>
          <li><strong>Apple Business Connect</strong>, for Apple Maps and Siri</li>
          <li><strong>LinkedIn</strong>, both a company page and the founder’s personal profile</li>
          <li><strong>Industry directories and review sites</strong>, such as Clutch for agencies, the major home-services directories for trades, and BBB for many categories</li>
          <li><strong>Local and professional organizations</strong>, such as your chamber of commerce and trade associations</li>
        </ul>
        <p>Paste the description from your canonical facts into each profile word for word, and add each profile URL to your <code>sameAs</code> list.</p>
        <h2>Step 5: Serve crawlable, prerendered HTML</h2>
        <p>Many modern sites are single-page applications that send a nearly empty HTML file and build the page with JavaScript in the browser. Googlebot can render JavaScript, though sometimes with a delay, but many other crawlers, including several used by AI search tools, read the raw HTML and do not run scripts. If your text, headings and schema only appear after JavaScript runs, those crawlers may see an empty page.</p>
        <p>To test this, open a page, choose “View page source” (not the element inspector) and search for a sentence from the page and for <code>application/ld+json</code>. You can also fetch the page with curl from the command line. If the content is missing, move to static site generation, server-side rendering or prerendering so every page ships as complete HTML.</p>
        <h2>Step 6: Set robots.txt rules for AI crawlers on purpose</h2>
        <p>Your robots.txt file tells crawlers which pages they may fetch. These are the user agents worth knowing:</p>
        <ul>
          <li><strong>Googlebot:</strong> Google Search, including AI Overviews and AI Mode. Blocking it removes you from Google.</li>
          <li><strong>Google-Extended:</strong> a control for whether your content is used for Google’s Gemini models. Google says it does not affect inclusion in Google Search.</li>
          <li><strong>Bingbot:</strong> Bing search and Microsoft Copilot.</li>
          <li><strong>OAI-SearchBot:</strong> ChatGPT search. <strong>GPTBot</strong> is OpenAI’s crawler for model training, and <strong>ChatGPT-User</strong> fetches pages when a person asks ChatGPT to.</li>
          <li><strong>PerplexityBot:</strong> Perplexity’s search index.</li>
          <li><strong>ClaudeBot</strong>, <strong>Claude-SearchBot</strong> and <strong>Claude-User:</strong> Anthropic’s crawlers for training, search and user-requested fetches.</li>
        </ul>
        <p>If you want to be cited, allow the search crawlers. Whether to allow training crawlers is a separate business decision, and you can allow one while blocking the other. Also check your CDN, firewall or security plugin, which can block these bots even when robots.txt allows them.</p>
        <h2>Step 7: Add an llms.txt file</h2>
        <p>llms.txt is a proposed convention: a Markdown file at yoursite.com/llms.txt that summarizes who you are and links to your most important pages. It is not an official standard, and Google has said its search systems do not use it. Some AI tools and agents do read it, it is quick to write and it cannot hurt, so treat it as a supplement to good pages and schema rather than a replacement. Keep it consistent with your canonical facts.</p>
        <h2>Step 8: Write pages that answer questions directly</h2>
        <p>AI engines quote sentences that state facts plainly. Give each service its own page that says what it is, who it is for, how it works and where you offer it. Add FAQs whose answers begin with the answer rather than a warm-up. Put your one-sentence description on the home page and the About page. Include publish and update dates, a named author, and links to authoritative sources when you make factual claims.</p>
        <h2>Step 9: Deal with name collisions openly</h2>
        <p>If other businesses share or nearly share your name, AI tools may merge them with you. Say clearly on your About page who you are, where you are, and that you are not affiliated with the similarly named companies, and make sure your schema and profiles agree. That gives the engine an explicit source for telling the businesses apart.</p>
        <h2>How to measure AI search visibility</h2>
        <ul>
          <li><strong>Build a prompt set:</strong> 10 to 30 questions customers really ask, including category questions such as “best web developer in Hollywood, FL” and branded questions such as “what is [your company]?”</li>
          <li><strong>Run it monthly</strong> in Google AI Mode, ChatGPT and Perplexity, in a logged-out or fresh session where possible.</li>
          <li><strong>Log three things for each answer:</strong> whether you are mentioned, whether the description is accurate, and which sources are cited. The cited sources show where to build or fix citations next.</li>
          <li><strong>Watch referral traffic</strong> from chatgpt.com, perplexity.ai and similar domains in Google Analytics 4.</li>
          <li><strong>Use Google Search Console</strong> for overall Google performance. Google counts AI Overviews and AI Mode activity within its web search totals rather than reporting it separately.</li>
        </ul>
        <p>Answers vary between runs, so judge trends across the whole prompt set over several months rather than reacting to a single result.</p>
        <h2>Practical checklist</h2>
        <ul>
          <li>Canonical facts document written and approved</li>
          <li>Name, address and phone identical on the website footer, contact page and every profile</li>
          <li>One-sentence description on the home page, About page and every profile</li>
          <li>Schema graph with stable <code>@id</code> values for the business, founder and website</li>
          <li><code>sameAs</code> listing every official profile</li>
          <li>Google Business Profile, Bing Places and Apple Business Connect claimed and complete</li>
          <li>LinkedIn company page and founder profile linked to the website</li>
          <li>Two or three relevant industry directories or review sites</li>
          <li>Key pages show text and schema in “View page source”</li>
          <li>robots.txt allows Googlebot, Bingbot, OAI-SearchBot and PerplexityBot, and your CDN does not block them</li>
          <li>llms.txt published and consistent with your facts</li>
          <li>About page clarifies any similarly named businesses</li>
          <li>Monthly prompt tracking in Google AI Mode, ChatGPT and Perplexity</li>
        </ul>
        <p>If you would rather have this handled for you, our <a href="/services/ai-search-ranking">AI search visibility service</a> covers each of these steps.</p>
      </div>
    ),
  },
  {
    slug: 'google-ads-local-trades-roas-pattern',
    title: 'Google Ads for Local Trades: A Structure That Filters Out Junk Leads',
    description: 'A lead-quality approach to Google Ads for roofers, HVAC and plumbers: negative keywords, location settings, call handling and offline conversion tracking.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['ppc', 'google-ads', 'local'],
    keywords: ['google ads for roofers', 'google ads for HVAC', 'google ads for plumbers', 'local trades ppc', 'best google ads strategy local services'],
    content: (
      <div className="prose">
        <p>Google Ads for roofers, HVAC companies, plumbers and other local trades tend to waste money in the same ways: irrelevant searches, spam and sales calls, and clicks from outside the service area. The fix is to treat the account as a circuit, where every step from the search to the booked job filters out low-quality leads.</p>
        <h2>Key takeaways</h2>
        <ul>
          <li>Build negative keyword lists in three layers: global, industry and geography.</li>
          <li>Target people located in your service area, not people merely interested in it.</li>
          <li>Match the lead format to the job: calls for urgent work, short forms for estimates.</li>
          <li>Optimize toward booked jobs by importing offline conversions, not toward raw leads.</li>
        </ul>
        <h2>Where local ad budgets leak</h2>
        <p>Broad and phrase match keywords can match searches from job seekers, do-it-yourselfers and people looking for suppliers. Automated bidding then learns from whatever counts as a conversion, so if spam calls and wrong-number forms count, the system finds more of them.</p>
        <h2>A three-layer negative keyword framework</h2>
        <ul>
          <li><strong>Global negatives:</strong> jobs, careers, salary, training, DIY, how to, free, used.</li>
          <li><strong>Industry negatives:</strong> parts, wholesale, supplier, materials and manufacturer names you do not service.</li>
          <li><strong>Geographic negatives:</strong> city names outside your area that share words with your targets.</li>
        </ul>
        <p>Review the search terms report weekly at first, then every two weeks once it settles, and add new negatives to shared lists so every campaign benefits.</p>
        <h2>Location settings</h2>
        <p>In campaign settings, choose to target people in or regularly in your target locations rather than people who show interest in them. Draw the target area around where you actually take jobs, and exclude areas you do not serve.</p>
        <h2>Calls versus forms</h2>
        <p>Urgent jobs such as leaks, no-heat or no-cool calls convert best by phone, so use call assets and schedule ads for hours when someone answers. Estimate-based jobs such as roof replacements or new systems suit a short two-step form: ask for the job type and ZIP code first, then contact details. Screen calls with a short greeting or a person, and count only calls above a minimum length as conversions.</p>
        <h2>Landing pages for trades</h2>
        <p>Above the fold, state the service, the area you cover, one piece of proof and a call button. Below that, show license and insurance details, photos of real local jobs and reviews. Keep the form short and make the phone number tappable on mobile.</p>
        <h2>Measurement guardrails</h2>
        <p>Import offline conversions from your CRM or job management software so Google learns which clicks became booked jobs. Filter spam before it counts as a conversion, and shift budget toward the campaigns and keywords that produce booked work, not the ones that produce the most form fills.</p>
        <p>Want help setting this up? See our <a href="/services/google-ads">Google Ads management</a> service.</p>
      </div>
    ),
  },
  {
    slug: 'above-the-fold-cro-patterns',
    title: 'Above the Fold That Converts: 7 Layout Patterns for Landing Pages',
    description: 'Seven practical above-the-fold layouts for service and product pages, and the copy blocks each needs, to improve conversion without a full redesign.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['cro', 'design'],
    keywords: ['landing page above the fold', 'cro patterns', 'increase conversion rate', 'hero section design'],
    content: (
      <div className="prose">
        <p>Most page headers fail because they bury the basics. A visitor should be able to tell within a glance what you offer, who it is for, why they should trust you and what to do next. These seven patterns are practical ways to arrange that space, depending on the page and the audience.</p>
        <h2>Why most headers fail</h2>
        <p>Common problems include vague headlines, rotating sliders that hide the main message, stock photos that say nothing, several competing buttons and proof that sits far down the page. Each one makes the visitor work harder to decide.</p>
        <h2>The seven patterns</h2>
        <h3>1. Problem, promise, proof, action</h3>
        <p>One line each: the problem you solve, the result you promise, one piece of proof and a single call to action. It works for most service pages.</p>
        <h3>2. Offer and form side by side</h3>
        <p>Headline and short benefit list on one side, a short form on the other. Best for estimate or consultation requests from paid traffic.</p>
        <h3>3. Call first</h3>
        <p>For urgent local services, put a large tap-to-call button right under the headline on mobile, with hours and service area next to it.</p>
        <h3>4. Product first</h3>
        <p>For e-commerce, lead with the product image, price, rating and add-to-cart button. Save the brand story for further down.</p>
        <h3>5. Proof first</h3>
        <p>For professional services, open with credentials, review scores or recognizable affiliations beside the headline, since trust is the main hurdle.</p>
        <h3>6. Two paths</h3>
        <p>When two audiences arrive on the same page, such as homeowners and businesses, offer two clearly labeled buttons that lead to tailored pages.</p>
        <h3>7. Question first</h3>
        <p>Start with a simple question or a short quiz, such as the type of project or the size of the space, that routes visitors to the right offer and qualifies them at the same time.</p>
        <h2>Risk reversal and proof density</h2>
        <p>Add whatever genuinely lowers risk: guarantees, warranties, free estimates or “cancel anytime.” Group reviews, ratings and badges in one scannable strip instead of scattering them.</p>
        <h2>Mobile-first composition</h2>
        <p>On a phone, lead with the value statement, then the call to action, then the proof. Avoid autoplaying hero videos and large background images that delay the main content.</p>
        <h2>Testing cadence</h2>
        <p>Run a formal A/B test only when a page gets enough conversions to reach a reliable result, which usually means hundreds per variation. On lower-traffic pages, make research-backed changes and compare performance over several weeks. Record every change and its result so wins can be rolled out to similar pages.</p>
        <p>For help applying these patterns, see our <a href="/services/landing-page-cro">landing page and CRO</a> service.</p>
      </div>
    ),
  },
  {
    slug: 'shopify-performance-budget',
    title: 'Shopify Speed: A 9-Part Performance Budget for Core Web Vitals',
    description: 'A practical nine-part performance budget that developers and marketers can share to keep a Shopify store fast and passing Core Web Vitals.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['shopify', 'performance', 'cwv'],
    keywords: ['shopify performance budget', 'shopify speed optimization', 'core web vitals shopify', 'shopify INP', 'shopify LCP'],
    content: (
      <div className="prose">
        <p>A performance budget is a set of limits that stop a store from slowly getting heavier as apps, scripts and images are added. It gives developers and marketers a shared rule: if a change breaks the budget, something else has to go. These nine parts cover where Shopify stores usually slow down.</p>
        <h2>The targets</h2>
        <p>Google’s “good” thresholds for Core Web Vitals are Largest Contentful Paint (LCP) at or under 2.5 seconds, Interaction to Next Paint (INP) at or under 200 milliseconds, and Cumulative Layout Shift (CLS) at or under 0.1, measured on real visits. Set budgets separately for the home page, collection pages, product pages and cart, because each template has different weight.</p>
        <h2>1. Images</h2>
        <p>Serve responsive sizes with Shopify’s image filters and <code>srcset</code>, compress everything, and lazy-load images below the fold. Never lazy-load the main product or hero image.</p>
        <h2>2. The LCP element</h2>
        <p>Know which element is the largest on each template, usually the hero or first product image, and make it load first. Avoid sliders in that position.</p>
        <h2>3. Fonts</h2>
        <p>Limit font families and weights, use <code>font-display: swap</code>, and preload only the font used above the fold. System fonts are the fastest option.</p>
        <h2>4. Apps</h2>
        <p>List every installed app with what it does and what it loads. Remove duplicates and unused apps, and check the theme for leftover code from apps you have already uninstalled.</p>
        <h2>5. JavaScript</h2>
        <p>Set a maximum amount of JavaScript per template and defer anything not needed for the first view. Heavy scripts are the main cause of poor INP.</p>
        <h2>6. Tracking and pixels</h2>
        <p>Consolidate tracking through the Google tag and Shopify’s customer events where possible, rather than stacking separate snippets for each platform.</p>
        <h2>7. Layout stability</h2>
        <p>Give images and embeds explicit dimensions, and reserve space for review widgets, announcement bars and cookie banners so content does not jump as they load.</p>
        <h2>8. Connection hints</h2>
        <p>Use <code>preconnect</code> for essential third-party domains and <code>preload</code> for the LCP image and main font. Use these sparingly, since too many hints compete with each other.</p>
        <h2>9. Monitoring and regression checks</h2>
        <p>Watch field data in Google Search Console’s Core Web Vitals report and PageSpeed Insights, and run Lighthouse on key templates before publishing theme changes. If a change breaks the budget, roll it back and fix it before trying again.</p>
        <p>Need a hand with a slow store? Our <a href="/services/custom-web-design">custom web design and development</a> service includes Shopify performance work.</p>
      </div>
    ),
  },
  {
    slug: 'local-service-seo-framework',
    title: 'Local Service SEO: The “Service × City × Proof” Framework',
    description: 'A framework for service and location pages that avoids thin content, plus a Google Business Profile checklist and a South Florida example.',
    date: '2025-01-12',
    updated: '2026-09-23',
    tags: ['local-seo', 'content'],
    keywords: ['local service seo', 'service area pages', 'location pages seo', 'google business profile optimization', 'local seo South Florida'],
    content: (
      <div className="prose">
        <p>Most location pages are thin: the same text with a different city name swapped in. Google tends to ignore them, and customers can tell. The “Service × City × Proof” framework turns them into pages that give both searchers and search engines a real reason to connect your business with a place.</p>
        <h2>Key takeaways</h2>
        <ul>
          <li>Build service pages first. Add city pages only where you have real work, reviews or local detail to show.</li>
          <li>Google says local results depend on relevance, distance and prominence. You control relevance and prominence.</li>
          <li>Your Google Business Profile matters as much as your website for map results.</li>
          <li>Keep your name, address and phone identical everywhere.</li>
          <li>Track calls, direction requests and qualified leads, not just rankings.</li>
        </ul>
        <h2>Step 1: Choose target cities realistically</h2>
        <p>Weigh demand, distance and competition. Cities close to your office or where you already have customers are the realistic first targets. Distant, highly competitive cities can wait until the core pages perform. Group your targets into tiers and work through them one quarter at a time.</p>
        <h2>Step 2: Build the matrix</h2>
        <p>List your services down one side and your target cities across the top. Each strong service gets its own page first. Then add a page for a service and city combination only when you can make it genuinely specific: local jobs, local reviews, area details, pricing factors or regulations that differ by place.</p>
        <h2>Step 3: Add proof blocks</h2>
        <p>Proof is what separates a useful location page from a doorway page. Include photos of real local work, short project descriptions, reviews from customers in that area, licenses or permits where relevant, and FAQs specific to the service. Add <code>LocalBusiness</code> and <code>Service</code> schema that matches what the page says.</p>
        <h2>Step 4: Get your Google Business Profile right</h2>
        <p>For map results, your Google Business Profile often matters as much as your website. Work through this list:</p>
        <ul>
          <li><strong>Primary category:</strong> choose the most specific category that describes your main service. It has a large effect on which searches you appear for. Add secondary categories only where they apply.</li>
          <li><strong>Business name:</strong> use your real name exactly. Adding keywords or city names to the name breaks Google’s guidelines and risks suspension.</li>
          <li><strong>Address or service area:</strong> show your address if customers visit you. If you travel to customers, hide the address and list up to 20 service areas instead.</li>
          <li><strong>Hours:</strong> keep regular and special hours current, including holidays and closures.</li>
          <li><strong>Services and description:</strong> list each service and write a plain description that matches your website.</li>
          <li><strong>Photos:</strong> add real photos of your work, team and location, and keep adding them.</li>
          <li><strong>Reviews:</strong> ask every satisfied customer, make it easy with a direct link, and reply to every review, good or bad.</li>
          <li><strong>Website link:</strong> point it at the most relevant page, and make sure that page repeats the same name, address and phone.</li>
        </ul>
        <h2>Step 5: Connect pages with internal links and consistent entities</h2>
        <p>Link each service page to the city pages that offer it and each city page back to its services. Use the same business name, address and phone everywhere, and make your schema reference the same business entity on every page.</p>
        <h2>A South Florida example</h2>
        <p>South Florida shows why the matrix needs judgment. Broward and Miami-Dade counties are packed with separate cities along I-95 and US-1, and customers search by city (Hollywood, Aventura), by neighborhood (Brickell, Las Olas) and by county. Because Google weighs distance, a business in Hollywood will naturally show up more in nearby Hallandale Beach, Dania Beach and Pembroke Pines than in Kendall or Boca Raton.</p>
        <p>A Hollywood-based home service company might build strong pages for each service first, then location pages for the southern Broward cities where it has real jobs and reviews, and add Fort Lauderdale or Miami pages only as that work grows. In parts of Miami-Dade with many Spanish-speaking customers, a properly translated Spanish service page can matter more than yet another English city page. Seasonality also plays a role: winter brings seasonal residents and visitors, and hurricane season is a good reason to keep hours and service notices current on both the website and the Google Business Profile.</p>
        <h2>Step 6: Refresh quarterly and track what matters</h2>
        <p>Each quarter, add new local projects, photos and reviews to your pages and profile. Track calls, direction requests and website clicks in your Google Business Profile performance report, clicks and impressions by page in Google Search Console, and qualified leads in your CRM. Rankings are useful context, but booked work is the measure that matters.</p>
        <p>We apply this framework in our <a href="/services/monthly-seo-content">monthly SEO and content</a> service for businesses in <a href="/locations/hollywood-fl">Hollywood</a>, <a href="/locations/fort-lauderdale">Fort Lauderdale</a>, <a href="/locations/miami">Miami</a> and beyond.</p>
      </div>
    ),
  },
]
