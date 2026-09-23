# EZ Web Development LLC — Search & AI Visibility Plan (SEO + GEO)

**Problem.** Searching "ez web development llc" in Google AI Mode returns four *other* companies (EZ Web LLC / ezweb.work in High Ridge MO, EZ Web Solution LLC in Texas, EZ Web Company in Florida, EZ Web Works) and never ezweb.dev. The AI could describe each competitor's city, services, and profiles because each has a strong, consistent entity footprint. We have none.

**Root cause, in one line.** Crawlers and AI engines see an empty JavaScript shell with no location, no phone, no address, no profiles, and a name that four other businesses also use. We are not losing a ranking fight; we are not in the index as an entity at all.

This plan is ordered by leverage. Phases 1 and 2 are what get us into the answer box. Everything after that compounds.

---


## Implementation status (2026-09-23)

**Done in code (branch `claude/ez-web-search-visibility-w4ggtd`)**
- Canonical NAP taken from the live Google Business Profile: EZ Web Development LLC, 1909 Tyler Street Suite 308, Hollywood, FL 33020, (561) 692-6868. Single source: `ezweb/src/business.ts`.
- Every route is prerendered to static HTML with title, canonical, OG and JSON-LD in `<head>` (`npm run build`, verified by `npm run check:seo`).
- One `@graph` entity: ProfessionalService/LocalBusiness `#organization`, Person `#founder`, WebSite `#website`. Service, FAQPage, BreadcrumbList, BlogPosting with Person author on the relevant pages.
- Six services with long-form copy and FAQs; five retired service URLs 301 to the nearest match.
- Location pages for Hollywood, Fort Lauderdale and Miami.
- About page with founder, Florida document number and a neutral "not to be confused with" note. New entity post at `/blog/ez-web-development-llc-hollywood-fl`.
- Static `robots.txt` allowing AI crawlers, `sitemap.xml`, `feed.xml`, `llms.txt`, real 404, favicon, logo and OG image.
- Netlify config: flat `.html` output so `/about` is served without a redirect, `/path/` 301s to `/path`, www 301s to apex. Vercel and Cloudflare Pages configs also included.

**Owner actions (see `docs/CITATION-KIT.md`, `docs/MEASUREMENT.md`, `docs/REVIEWS-AND-AUTHORITY.md`)**
1. Deploy this branch on Netlify. DNS shows ezweb.dev on Netlify's load balancer and www.ezweb.dev as a CNAME to `ezweb-site.netlify.app`; confirm that site builds from this repo. Settings: base directory `ezweb`, no SPA fallback rule. Then submit `https://ezweb.dev/sitemap.xml` in Search Console and Bing Webmaster Tools.
   - Contact form: in Netlify, open Site configuration > Forms and turn on form detection, then redeploy. Add an email notification for the `contact` form to ezra@ezweb.dev under Forms > Form notifications. Send one test submission after deploy.
2. File a Sunbiz annual report or amendment to change the principal and mailing address from Plantation to the Hollywood address.
3. Add hours to the Google Business Profile, then build the directory profiles in the citation kit. Append each live URL to `business.sameAs` and redeploy.
4. Confirm the service FAQ statements about client ownership of accounts and fixed written quotes match how you work.
5. Start the weekly AI-visibility log in `docs/MEASUREMENT.md`.

## 0. Diagnosis (what the repo actually does today)

| # | Finding | Where | Why it matters |
|---|---|---|---|
| 1 | Site is a client-rendered SPA. Every title, description, canonical, and JSON-LD is injected by `useEffect` after JavaScript runs. | `ezweb/src/seo.tsx`, `ezweb/index.html` | Googlebot renders JS late and inconsistently. GPTBot, ClaudeBot, PerplexityBot, and Bing's AI pipeline largely **do not execute JS**. They see `<div id="root"></div>` and the generic index.html title. This is the single biggest GEO blocker. |
| 2 | Zero location signals. No city, state, address, phone, service area, or hours anywhere in the site or schema. | `App.tsx` Home JSON-LD, Footer | AI Mode disambiguated the four competitors *by city*. We gave it nothing to disambiguate with. |
| 3 | `LocalBusiness` schema has no `address`, `telephone`, or `geo`, and uses relative `url: '/'`. | `App.tsx:72-80` | Invalid for Google's LocalBusiness rich result requirements. Relative URLs in JSON-LD are ignored. |
| 4 | `sameAs` is empty on both Organization and LocalBusiness. | `seo.tsx:39`, `App.tsx:79` | No link to Google Business Profile, LinkedIn, Clutch, BBB, Crunchbase. Entity resolution has nothing to anchor to. Competitors were surfaced via exactly these profiles (LinkedIn, BBB, Clutch). |
| 5 | Three different brand names: "EZ Web", "EZ Web Development LLC", "EZ Web Development". Domain is ezweb.dev. | site-wide | Name collision with EZ Web LLC (ezweb.work). We must pick one canonical legal name and repeat it identically everywhere. |
| 6 | Sitemap and robots.txt are only generated at build time from `SITE_URL`/`VITE_SITE_URL`. If that env var is missing in the deploy, sitemap URLs are `http://localhost:5173/...` and canonicals fall back to `window.location.origin`. | `scripts/generate-sitemap.mjs:17`, `seo.tsx:3` | Must verify what is actually deployed. A localhost sitemap is worse than none. |
| 7 | Every sitemap `lastmod` is set to today's date on every build. | `generate-sitemap.mjs:19-27` | Google learns to distrust `lastmod`; also fakes freshness on stale pages. |
| 8 | Route and blog lists are duplicated by hand in the sitemap script. | `generate-sitemap.mjs:29-52` vs `App.tsx`, `blogPosts.tsx` | Drift risk. Sitemap should import from the same data. |
| 9 | Catch-all `*` route renders Home with HTTP 200. | `App.tsx:477` | Soft-404s. Any bad URL becomes a duplicate of the home page. |
| 10 | No `og:image`, favicon is the Vite logo, no Twitter/OG image for any page. | `index.html`, `public/` | Zero-click and AI answers pull images from OG tags. Vite logo as favicon signals "unfinished template" to Google's site quality signals. |
| 11 | Blog posts: all 8 dated 2025-01-12, author is the Organization, titles say "in 2025", no `datePublished`/`dateModified`/`Person` author in schema. | `blogPosts.tsx`, `App.tsx:439-445` | Weak E-E-A-T. AI engines heavily weight named authors with credentials. Stale year in titles hurts CTR now that it is 2026. |
| 12 | Contact form is a fake `alert()`; no phone, no address, no booking link. | `App.tsx:373` | No conversion path even if traffic arrives. Also Google reads a working contact page as a trust signal. |
| 13 | Positioning is generic and national: "boutique web development & digital marketing agency" with 11 services including micro-influencer and Meta ads. | Home, Services | We compete against every agency in the country on every keyword. A narrow local+niche entity is how a one-person firm gets cited. |
| 14 | Home page shows unverifiable KPIs (+210%, 3.2x ROAS). | `App.tsx:100-104` | Google's helpful-content and AI groundedness both penalize unsupported claims. Replace with real case studies or remove. |
| 15 | No `llms.txt`, no explicit allow rules for AI crawlers, no RSS feed. | `generate-sitemap.mjs:70-74` | Cheap GEO wins currently left on the table. |

---

## 1. Decisions needed before any of this ships (owner: Ezra)

These take ten minutes and block everything else. Every value below must be **byte-identical** everywhere it appears (site, schema, Google Business Profile, every directory).

| Item | Decision | Notes |
|---|---|---|
| Canonical legal name | `EZ Web Development LLC` | Use the exact name on the state LLC filing. Never shorten to "EZ Web" in schema, profiles, or footer. "EZ Web" can remain as the logo/wordmark only. |
| Domain | `https://ezweb.dev` | Confirm www vs non-www, force one with a 301. |
| Business address | ________ | Real street address for Google Business Profile verification. If home-based, set GBP to a service-area business and hide the street address, but the *city/state* is still public and required. |
| Phone | ________ | A single number, ideally local area code. Same number everywhere. |
| Primary city / metro | ________ | This is the word that goes in the H1, the title tag, the schema, and the GBP. Pick the metro people search for, not the suburb. |
| Service area | ________ | 3–8 named cities/counties for `areaServed` and for local service pages. |
| Founder | Ezra ________ (full name, title, headshot, 2-sentence bio) | Becomes the `Person` entity and the author of every blog post. |
| Hours | Mon–Fri 9–5 (already in footer) | Match GBP exactly. |
| Niche | Pick one or two: e.g. "custom web apps + workflow automation for local service businesses" | See Phase 3. The competitor that beat us (EZ Web LLC) wins because its description is one specific sentence. |

---

## 2. Phase 1 — Make the site crawlable and give it an identity (week 1, code)

All of this is in the repo and can ship in one PR.

### 2.1 Pre-render every route to static HTML
- Add build-time pre-rendering so each of the ~25 routes ships as a real HTML file with its `<title>`, meta, canonical, and JSON-LD already in the markup. Two options, in order of preference:
  1. **`vite-react-ssg`** — drop-in for Vite + react-router, keeps the current React code, emits `dist/about/index.html`, `dist/services/custom-web-design/index.html`, etc.
  2. Post-build Playwright script that loads each route from `vite preview` and writes the rendered HTML. Zero dependency changes; slightly more fragile.
- Move `Seo` from `useEffect` to a head-management approach that works during SSG (`vite-react-ssg` provides `<Head>`; or `react-helmet-async`).
- Acceptance test: `curl https://ezweb.dev/services/custom-web-design | grep -c 'application/ld+json'` returns ≥1 with JS disabled.

### 2.2 Fix the entity schema
- Global `Organization` → change to `ProfessionalService` (a `LocalBusiness` subtype) with: legal `name`, `alternateName: "EZ Web"`, `url`, `logo`, `image`, `telephone`, `email`, `address` (`PostalAddress`), `geo`, `areaServed` (list of `City` entities), `openingHoursSpecification`, `founder` (`Person` with `@id`), `sameAs` (GBP, LinkedIn company, LinkedIn personal, Clutch, BBB, Crunchbase, GitHub org), `priceRange`, `knowsAbout`, and `hasOfferCatalog` listing the services.
- Give every entity a stable `@id` (`https://ezweb.dev/#organization`, `https://ezweb.dev/#founder`, `https://ezweb.dev/#website`) and reference them from `Service.provider`, `BlogPosting.author`, and `BlogPosting.publisher`.
- All `url` values absolute. Remove the duplicate `LocalBusiness` block on Home; the global one is enough.
- Add `BreadcrumbList` to service and blog pages.
- Add `FAQPage` to the home page and each service page (3–5 real questions each). FAQ blocks are the most-cited content type in AI answers.
- `BlogPosting`: add `datePublished`, `dateModified`, `author` → Person `@id`, `image`, `mainEntityOfPage`, `wordCount`.

### 2.3 Put the location and contact info in visible HTML (not just schema)
- Footer: full NAP block (name, street or city/state, phone as `tel:` link, email, hours) on every page.
- Home H1/subhead and title tag include the metro: e.g. `Custom Web Development & Automation in [City, ST] | EZ Web Development LLC`.
- New `/contact` content: address, phone, map embed (GBP map link), a real form handler (Formspree, Netlify Forms, or a Cloudflare Worker) and a booking link.

### 2.4 Robots, sitemap, and AI-crawler hygiene
- Commit a static `public/robots.txt` so it never depends on a build env var. Explicitly `Allow: /` for `Googlebot`, `Bingbot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `CCBot`. Point to the sitemap with the absolute production URL.
- `generate-sitemap.mjs`: import services and blog posts from `src/` instead of the hand-copied lists; use per-page real `lastmod` (git last-commit date of the source, or a `updated` field on each post) instead of `today`; fail the build if `SITE_URL` is not an `https://` URL.
- Add `public/llms.txt` (Markdown summary of who we are, where, what we do, key URLs) and `public/llms-full.txt` generated from the service and blog content.
- Add an RSS/Atom feed at `/feed.xml` from `blogPosts`.
- Real 404: render a NotFound component and, with SSG, emit `404.html` so the host returns a true 404.
- Replace `vite.svg` favicon with a real icon set; add a default `og:image` (1200×630) and `og:image` per blog post.

### 2.5 Hosting checks (whoever owns the deploy)
- Confirm `VITE_SITE_URL=https://ezweb.dev` (and `SITE_URL`) is set in the production build environment. Check the live `/sitemap.xml` for `localhost`.
- 301 www → apex (or the reverse), http → https.
- SPA fallback rewrite is fine for unknown paths, but pre-rendered files must be served directly.
- Confirm no `noindex` header from the host (some preview environments add one).

---

## 3. Phase 2 — Build the off-site entity (week 1–2, no code, highest leverage)

This is what the four competitors have and we do not. AI Mode cited **LinkedIn, BBB, Clutch, and the businesses' own sites**. Each one is a free listing.

Do these in order; each later listing should copy the description from the earlier ones word for word.

1. **Google Business Profile** (business.google.com). Category: *Website designer* (primary), *Software company*, *Internet marketing service*. Fill every field: description (750 chars, lead with the one-sentence niche + city), services with prices, hours, phone, website, founding date, photos (logo, cover, 5+ real photos), and post weekly. Verify it (video verification is common for service-area businesses). This alone usually gets a business into the "ez web development llc" branded answer within 2–4 weeks.
2. **Bing Places for Business.** Bing's index feeds ChatGPT search and Copilot. Import from GBP.
3. **Apple Business Connect.** Feeds Siri/Apple Maps and is a strong NAP citation.
4. **LinkedIn Company Page** + Ezra's personal profile listing "Founder, EZ Web Development LLC" with the website. LinkedIn was cited for a competitor.
5. **Clutch.co** and **GoodFirms** profiles. Clutch was cited for a competitor. Ask 2–3 past clients for Clutch reviews; Clutch verifies them by phone, which is why AI trusts them.
6. **BBB** (accreditation optional; a free profile is enough and was cited for a competitor).
7. **Crunchbase**, **DesignRush**, **Yelp**, local Chamber of Commerce, and the state Secretary of State business listing (already public; make sure the name matches).
8. **GitHub organization** (`EZWebDev`) profile README with the same one-sentence description, city, and link. Developer-oriented AI queries often cite GitHub.
9. Add every resulting profile URL to `sameAs` in the schema (Phase 1, item 2.2) and link to GBP and LinkedIn from the footer.

Target: 10+ consistent citations within two weeks. Use one spreadsheet as the source of truth for the NAP and description.

---

## 4. Phase 3 — Positioning and content that AI engines can cite (weeks 2–8)

AI answers described each competitor with **one concrete sentence**. Ours needs to exist and be repeated on the home page, About page, GBP, LinkedIn, and `llms.txt`:

> "EZ Web Development LLC is a [City, State] web development firm founded by Ezra ________ that builds custom web applications, websites, and workflow automation for small businesses in [metro area]."

### 4.1 Page changes
- **Home:** metro in H1, the entity sentence in the first paragraph, an FAQ section, a "Who we work with" section naming 3–5 local industries, real proof (client names/logos with permission, or remove the invented KPIs).
- **About → founder page.** Full bio, headshot, years of experience, stack, links to LinkedIn/GitHub. `Person` schema with `@id`. This page is the E-E-A-T anchor. Update "small senior team" copy if it is one person; AI engines and Google both treat contradictions with LinkedIn as a trust hit.
- **Services:** cut the list from 11 to the 4–6 you actually sell and want to be known for. Each service page gets 600–1,000 words: who it is for, process, deliverables, timeline, starting price, FAQ, and one local example. Thin 4-bullet pages do not get cited.
- **Local service pages:** `/web-development-[city]` for the primary metro and 2–4 surrounding cities, each with unique content (not find-and-replace). Link them from the footer.
- **Blog:** remove "2025" from titles, set real `datePublished`/`dateModified`, author = founder, refresh the two strongest posts. Add a short "Key takeaways" block at the top of each post; AI engines lift these verbatim.

### 4.2 Content cadence (2 posts/month minimum)
- Half local: "What a custom web app costs for a [City] [trade]", "Best web developers in [City]: how to choose".
- Half expertise: build logs, before/after case studies with numbers, tool comparisons. Case studies are the most-cited content format for "who should I hire" queries.
- Every post: named author, date, at least one original image/screenshot, and 2–3 outbound citations to authoritative sources (Google's own docs, etc.). GEO studies consistently show cited, statistics-bearing, quotable content wins.

---

## 5. Phase 4 — Authority and reviews (ongoing from week 2)

- **Reviews:** goal of 10 Google reviews in 60 days. Send a direct review link after every project. Reply to each review (Google weights owner responses).
- **Local links:** Chamber of Commerce, local business associations, sponsor a meetup or youth team (they list sponsors with links), guest post on 2–3 local business blogs, get listed on the city's small-business resource pages.
- **Industry links:** answer questions on relevant subreddits and communities with real expertise and a profile link, publish 1–2 open-source tools or templates on GitHub with a link back.
- **Brand disambiguation:** a short, factual note on the About page ("EZ Web Development LLC of [City, ST] is not affiliated with EZ Web LLC of High Ridge, MO, EZ Web Solution LLC, or EZ Web Company") gives AI engines the exact negative signal they need to stop merging entities. Keep it neutral.

---

## 6. Phase 5 — Measurement (set up in week 1, review monthly)

- Google Search Console + Bing Webmaster Tools: submit the sitemap, request indexing on the home, about, and top service pages, monitor "Discovered — currently not indexed".
- GA4 with the contact-form submission and phone-click as conversions.
- Weekly manual checks (log them in a sheet): search "ez web development llc", "ez web development [city]", "web developer [city]" in Google AI Mode, Google Maps, ChatGPT search, Perplexity, and Bing Copilot. The first milestone is appearing in the branded query; the second is being listed for "[city] web developer".
- Schema validation on every deploy: Google Rich Results Test and validator.schema.org on home, one service page, one blog post.
- Core Web Vitals in PageSpeed Insights after the SSG change (should improve, since first paint no longer waits on the JS bundle).

---

## 7. Sequenced checklist

| Week | Work | Owner |
|---|---|---|
| 1 | Section 1 decisions; create GBP, Bing Places, LinkedIn page; Search Console + Bing WMT | Ezra |
| 1 | Phase 1 code PR: SSG, schema, NAP in footer, robots/sitemap/llms.txt, 404, favicon/OG image, real contact form | Dev (this repo) |
| 2 | Clutch, GoodFirms, BBB, Crunchbase, Apple Business Connect, GitHub org profile; add all to `sameAs` | Ezra |
| 2 | Home + About + Services rewrite with entity sentence, founder page, FAQ blocks, trim services | Dev + Ezra |
| 3–4 | Local service pages; first review requests; blog refresh (dates, author, titles) | Dev + Ezra |
| 4–8 | 2 posts/month, case studies, local links, weekly visibility checks | Ezra |
| 8 | Review: branded query now returns ezweb.dev? If not, audit GBP verification and NAP consistency first, then index coverage | Both |

---

## 8. Expected timeline

- **Branded query ("ez web development llc") in AI Mode and Maps:** 2–6 weeks after GBP verification and Phase 1 ship. This is mostly an entity problem, and entity problems resolve fast once the signals are consistent.
- **"[City] web developer" local pack / AI citations:** 2–4 months, driven by reviews, citations, and the local pages.
- **Non-branded national keywords:** 6–12 months and only for the niche we pick; not the goal of this plan.

## 9. Things this plan deliberately does not do

- Does not chase the broad "digital marketing agency" keyword set. A one-person firm cannot outrank national agencies there, and it dilutes the entity.
- Does not recommend a framework migration (Next/Astro) as a prerequisite. SSG on the current Vite/React stack solves the crawlability problem with a much smaller change. Revisit if the blog grows past ~50 posts or you want a CMS.
- Does not buy links or directory bundles. Two or three verified profiles with real reviews beat 200 low-quality citations for AI trust.
