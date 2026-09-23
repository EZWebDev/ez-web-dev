# Prompt for a local Claude Code session

Run this from the folder that holds the live ezweb.dev code (or its parent). Paste everything below the line.

---

You are working on the live website for my business, EZ Web Development LLC (https://ezweb.dev). It is hosted on the Netlify project `ezweb-site`. A cloud session could not reach the live site or my machine. It did SEO and GEO (AI search visibility) work in an old GitHub repo instead. Your job is to verify what is actually live and port the useful parts into the real codebase, without breaking anything.

## Step 1: find the live source and confirm it

1. Find the local folder whose build deploys to Netlify `ezweb-site`. Check `netlify status` inside candidate folders, `.netlify/state.json`, and `netlify sites:list`. The live site has Netlify forms named `contact`, `audit`, `audit-law`, `audit-source` and `workshop`. The right codebase contains all of them.
2. Tell me the folder, the framework, the build command, whether Netlify deploys from Git or from the CLI, and the latest deploy date. Stop and ask if more than one folder could be the source.

## Step 2: audit the live site as crawlers see it

Use curl against https://ezweb.dev. Test with a normal user agent and with `-A "GPTBot"`, `-A "ClaudeBot"` and `-A "PerplexityBot"`. Report, per key page (home, about, services, contact, blog index, one blog post):
- Is the page text in the raw HTML, or only after JavaScript runs?
- The title, meta description, canonical URL, robots meta and JSON-LD blocks. Do the JSON-LD blocks parse?
- Business name, address and phone on the page. Do they match exactly `EZ Web Development LLC`, `1909 Tyler Street Suite 308, Hollywood, FL 33020`, `(561) 692-6868`?

Also check:
- `/robots.txt`, `/sitemap.xml`, `/llms.txt`
- The status code of a made-up URL (it should be 404, not 200)
- `http://` to `https://` and www to apex redirects
- Trailing-slash behavior, because Search Console flagged "Page with redirect" on 2026-09-16

Write the findings to `docs/live-audit-YYYY-MM-DD.md` before changing any code.

## Step 3: compare with the cloud session's work

Clone or fetch `https://github.com/EZWebDev/ez-web-dev`, branch `claude/ez-web-search-visibility-w4ggtd`, into a temp folder. It is a different, older React/Vite codebase, so port ideas and content, not files wholesale. Read:
- `CLAUDE.md`: writing rules, banned words, the never-invent-facts rule, and the build gate. Copy it into the live repo and adapt the paths.
- `docs/SEO-GEO-PLAN.md`: the full plan and status.
- `docs/CITATION-KIT.md`, `docs/MEASUREMENT.md`, `docs/REVIEWS-AND-AUTHORITY.md`: off-site work, no code.
- `ezweb/src/business.ts`: verified business facts, and the design of the schema.org `@graph`. It uses `https://ezweb.dev/#organization`, `#founder` and `#website`.
- `ezweb/scripts/audit-copy.mjs`: the AI-slop copy detector (`--strict` exits 1).
- `ezweb/scripts/check-seo.mjs`: per-page head-tag checks.
- `ezweb/src/services.tsx`, `ezweb/src/locations.ts`, `ezweb/src/blogPosts.tsx`: audited copy.
- The generated `robots.txt` rules for AI crawlers, and the `llms.txt` format.

Produce a gap table: item | live site today | branch has it | port? (yes/no/adapt) | notes. Show it to me before editing.

## Step 4: port, after I approve the gap table

Priority order:
1. **Crawlable HTML.** If the live site renders content only with JavaScript, make every page ship full HTML with head tags and JSON-LD in the initial response, using the framework's own static or server rendering.
2. **One consistent entity.** Use the exact name, address and phone everywhere: footer, contact page, JSON-LD `ProfessionalService`/`LocalBusiness` with `@id`, a Person `#founder` (Ezra Pinsky), and a WebSite. `sameAs` must include the Google Business Profile link `https://maps.google.com/?cid=15049505616001444936`.
3. **Crawler files.** A robots.txt that allows search and AI crawlers, plus a sitemap with real lastmod dates, an `llms.txt`, a real 404 status, and canonical URLs that don't redirect.
4. **Entity page.** An About section, or a short post, that states who we are, and a polite note that we are not EZ Web LLC (ezweb.work, High Ridge MO), EZ Web Solution LLC (Euless TX) or EZ Web Company (Clearwater FL).
5. **Build gate.** The copy audit script wired into the build with `--strict`, so a failing audit fails the Netlify deploy. Add `CLAUDE.md`.
6. **Keep what works.** Keep every existing form (`contact`, `audit`, `audit-law`, `audit-source`, `workshop`) and page working. Do not remove or rename any live URL without a 301.

## Facts and corrections from me (these override anything in the branch)

- We do NOT meet clients in person, visit their offices, photograph their space or train their staff on site. All work is remote. The Tyler Street address is our business address only.
- Full Website Packages is no longer offered. Remove it.
- We manage Google Ads AND Meta ads, and we offer white-label Google and Meta ads management to other agencies.
- Use "we" and "agency". Do not use "studio".
- Never invent clients, results, stats, reviews, prices, turnaround promises or years of experience. If a sentence needs a fact you can't verify, ask me.
- Google Business Profile rules: a business that does not meet customers at its address should hide the address and list a service area instead. Before publishing the street address in schema or on pages, ask me whether the profile shows or hides the address, and match it. If it is hidden, use the city, state and service area in `LocalBusiness` schema and keep the full address off the site.
- The Florida Sunbiz record (L22000242599) still shows a Plantation address. I will fix that myself. Don't put the Plantation or Hallandale addresses anywhere.

## Rules

- Work on a new git branch. Commit in small steps with clear messages.
- Run the build, the copy audit and your checks before every commit.
- **Do not deploy to production.** When ready, run `netlify deploy` without `--prod` (a draft deploy), rerun the Step 2 curl checks against the draft URL, and send me the draft URL with a before/after summary. I will approve the production deploy.
- After I approve, suggest pushing this codebase to a private GitHub repo, so future cloud sessions work on the real site. Ask before creating it.
