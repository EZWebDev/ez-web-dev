# Measurement — EZ Web Development LLC

Covers SEO-GEO-PLAN.md Phase 5: Search Console, Bing Webmaster Tools, GA4 events, weekly AI-visibility checks, and schema validation. Set up in week 1, review weekly (AI checks) and monthly (everything else).

---

## Google Search Console

Already verified for `ezweb.dev` (per the verified facts — confirm this is still true before assuming it needs setup).

- [ ] **Submit sitemap** — Search Console → Sitemaps → submit `https://ezweb.dev/sitemap.xml`. Confirm it's read without errors.
- [ ] **URL Inspection on key pages** — run URL Inspection and "Request Indexing" (if not already indexed) on:
  - Home (`https://ezweb.dev/`)
  - About / founder page
  - Contact page
  - Each of the 4–6 core service pages
- [ ] **Investigate the "Page with redirect" report** flagged 2026-09-16. This is very likely one of:
  - www vs. non-www variant (e.g. `www.ezweb.dev` → `ezweb.dev`, or the reverse)
  - http → https redirect
  - A retired/renamed service URL redirecting to its replacement or to home
  - **This is expected and fine as long as every one of these redirects resolves to a canonical, correct URL.** Check each flagged URL in the report: if it 301s to the right canonical page, no action needed — Google is just reporting it, not penalizing it. Only act if a redirect points somewhere wrong (broken target, wrong page, or a redirect loop).
- [ ] Check **Coverage / Indexing** for "Discovered — currently not indexed" pages — a sign Google found the URL but hasn't crawled/indexed it yet, often resolves itself after Phase 1's SSG ships (per SEO-GEO-PLAN.md 2.1) since pages will render server-side.
- [ ] Re-check monthly: indexed page count should trend toward matching the sitemap's URL count.

---

## Bing Webmaster Tools

**Sign up / manage:** https://www.bing.com/webmasters

- [ ] **Import from Google Search Console** — Bing Webmaster Tools has a one-click "Import from GSC" that pulls verified site + sitemap data, saving a manual re-verification.
- [ ] Confirm sitemap `https://ezweb.dev/sitemap.xml` is listed and processed.
- [ ] **IndexNow** — Bing (and several other engines) support IndexNow, a push-based protocol that notifies Bing immediately when a page changes, instead of waiting for a crawl. Worth enabling once Phase 1's SSG ships and pages have real, stable URLs — check Bing Webmaster Tools' IndexNow section for the API key + submission method. Skip this until the SSG migration is live; no point pushing URLs that are about to change shape.

---

## GA4 events

Set up conversion events for the two actions that actually matter for a service business with a phone number and email as the primary contact paths:

- [ ] **`tel:` link clicks** — GA4 can auto-track "Outbound click" or you can fire a custom event (e.g. `phone_click`) on every `<a href="tel:...">` click. Mark it as a Key Event/conversion.
- [ ] **`mailto:` link clicks** — same pattern, custom event (e.g. `email_click`) on every `<a href="mailto:...">` click. Mark it as a Key Event/conversion.
- [ ] Once the real contact form ships (SEO-GEO-PLAN.md 2.3 — Formspree/Netlify Forms/Cloudflare Worker), add a `form_submit` conversion event too.
- [ ] Review monthly: which pages drive the most phone/email clicks — this tells you which service/local pages are actually working, separate from raw traffic.

---

## Weekly AI-visibility check protocol

Run these exact prompts, once a week, across all six engines. Log every result in the table below (keep the table in a spreadsheet — this doc just defines the format). This is separate from and in addition to Search Console/GA4 — those measure Google's index; this measures what AI engines actually say when asked.

### Prompts to run (same five, every engine, every week)

1. `ez web development llc`
2. `EZ Web Development LLC Hollywood FL`
3. `web design agency Hollywood FL`
4. `who founded ezweb.dev`
5. `SEO company Hollywood Florida`

### Engines to check

| Engine | Where |
|---|---|
| Google AI Mode | google.com → AI Mode tab |
| ChatGPT (search on) | chatgpt.com, with web search/browsing enabled |
| Perplexity | perplexity.ai |
| Claude | claude.ai, with web search enabled |
| Gemini | gemini.google.com |
| Copilot | copilot.microsoft.com (feeds from Bing) |

### What to look for

- **Milestone 1** (per SEO-GEO-PLAN.md §8): the branded query (`ez web development llc`, `EZ Web Development LLC Hollywood FL`) returns **us**, not a competitor (EZ Web LLC/ezweb.work, EZ Web Solution LLC, EZ Web Company, EZ Web Works). Expected timeline: 2–6 weeks after GBP verification + Phase 1 ship.
- **Milestone 2**: the unbranded local query (`web design agency Hollywood FL`, `SEO company Hollywood Florida`) surfaces us at all, even alongside competitors. Expected timeline: 2–4 months.
- **Wrong-entity confusion**: does the engine's answer merge us with a competitor, cite a competitor's URL/city under our name, or otherwise conflate the two? This is the specific failure mode this whole plan exists to fix — log it explicitly every time it happens so you can tell if it's improving.

### Log table template

| Date | Engine | Prompt | Mentioned? (Y/N) | Cited URL | Wrong-entity confusion? | Notes |
|---|---|---|---|---|---|---|
| 2026-09-23 | Google AI Mode | ez web development llc | N | ezweb.work | Y — returned EZ Web LLC (High Ridge MO) | Baseline check before Phase 1/2 ship |
| | | | | | | |

(First row is a placeholder baseline entry — replace with the actual first real check. Add one row per engine per prompt per week; 6 engines × 5 prompts = 30 rows/week if done exhaustively, or spot-check a subset weekly and do the full matrix monthly if that's too much overhead.)

---

## Schema validation

Run on every deploy that touches JSON-LD (App.tsx, seo.tsx, business.ts) — see SEO-GEO-PLAN.md 2.2 for what the schema should contain.

- [ ] **Google Rich Results Test** — https://search.google.com/test/rich-results — test home, one service page, one blog post. Confirms `LocalBusiness`/`ProfessionalService`, `FAQPage`, and `BreadcrumbList` are valid and eligible for rich results.
- [ ] **validator.schema.org** — https://validator.schema.org — broader schema.org spec validation (catches things Rich Results Test doesn't flag, like missing recommended properties).
- [ ] Check for: absolute URLs only (no relative `/` values), consistent `@id` references across entities (`#organization`, `#founder`, `#website`), and that `sameAs` on the live site matches the current `business.sameAs` array.

---

## Target timeline (from SEO-GEO-PLAN.md §8)

- **Branded query in AI Mode and Maps:** 2–6 weeks after GBP verification and the Phase 1 code ship. Primarily an entity-consistency problem — resolves fast once NAP and schema are consistent everywhere.
- **"[City] web developer" local pack / AI citations:** 2–4 months, driven by reviews, citations (Phase 2/4), and local service pages.
- **Non-branded national keywords:** 6–12 months, and only for the chosen niche — explicitly not the goal of this plan (see SEO-GEO-PLAN.md §9).
- **Review cadence:** weekly AI-visibility checks; monthly Search Console/Bing/GA4 review; schema validation on every schema-touching deploy.
