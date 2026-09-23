# Citation Kit — EZ Web Development LLC

Copy-paste kit for every off-site listing (SEO-GEO-PLAN.md Phase 2). Use these blocks verbatim — do not paraphrase per-platform. Every value here is sourced from `ezweb/src/business.ts`; if you change something there, update it here too.

---

## Canonical NAP (byte-identical everywhere)

```
Name:     EZ Web Development LLC
Address:  1909 Tyler Street Suite 308, Hollywood, FL 33020
Phone:    (561) 692-6868
Website:  https://ezweb.dev
Email:    ezra@ezweb.dev
Hours:    Mon–Fri · 9am–5pm ET
Category: Internet marketing service
```

Verified against the live Google Business Profile on 2026-09-17. This is the source of truth — if any directory shows something different, fix the directory, not this block.

---

## NAP mismatches to fix first

These three inconsistencies actively hurt entity trust (Google and AI engines cross-check NAP across sources). Fix before mass-submitting to new directories, or you're propagating the wrong address.

| # | Where | Problem | Fix | Who |
|---|---|---|---|---|
| 1 | Florida Sunbiz (L22000242599) | Principal/mailing address on file is **610 NW 103rd Ave, Plantation, FL 33324** — does not match the GBP/Hollywood address | File an **Annual Report** (if this is the current filing year and it's still open) or an **Articles of Amendment** at [sunbiz.org](https://sunbiz.org) → search L22000242599 → "File Annual Report" or "Amendment". Updates principal address and mailing address to 1909 Tyler Street Suite 308, Hollywood, FL 33020. This is a state filing only Ezra (as the LLC's authorized member) can submit — it needs the Sunbiz login/PIN tied to the filing. | **Ezra** |
| 2 | Service agreement template | Letterhead shows **800 SE 4th Ave STE 801, Hallandale Beach, FL 33309** — a third, different address | Update the template's letterhead/footer to the canonical Hollywood address before it goes out on any new agreement | Ezra (template lives outside this repo — not a `ezweb/` file) |
| 3 | Email signature | Signature (ezra@ezweb.dev) currently has no address | Add the canonical address + phone to the signature block, matching the NAP above exactly | Ezra |

Do not submit any new directory listing until #1 is at least filed (in progress is fine — directories can't verify Sunbiz in real time, but a mismatch that's been flagged and not fixed is worse than one nobody's checked).

---

## Description at 4 lengths

All four start with the same entity sentence. Use the length that fits the field; don't write a new one.

### Tagline (50 char max)
```
Web design & SEO in Hollywood, FL
```
(49 chars)

### Short (160 char max — GBP short description, meta description, Twitter/X bio)
```
EZ Web Development LLC is a web development and SEO studio in Hollywood, Florida, founded in 2022 by Ezra Pinsky. Serving South Florida & nationwide.
```
(155 chars)

### Medium (300 char max — LinkedIn "About" summary line, Crunchbase short description, Clutch tagline)
```
EZ Web Development LLC is a web development and SEO studio in Hollywood, Florida, founded in 2022 by Ezra Pinsky. We design and build fast custom websites, run monthly SEO and AI-search visibility programs, improve landing-page conversion, and manage Google Ads for South Florida businesses.
```
(296 chars)

### Long (750 char max — Google Business Profile description, LinkedIn Company "About", BBB/Yelp/GoodFirms long bio)
```
EZ Web Development LLC is a web development and SEO studio in Hollywood, Florida, founded in 2022 by Ezra Pinsky. We design and build fast custom websites, run monthly SEO and content programs, improve landing-page conversion, and manage Google Ads and AI Search Visibility (GEO) campaigns for small businesses, professional services firms, and e-commerce brands.

Our services: Custom Web Design & Development, Full Website Packages, Monthly SEO & Content, AI Search Visibility (GEO), Landing Page & CRO, and Google Ads Management.

We serve Hollywood, Fort Lauderdale, Miami, and all of Broward and Miami-Dade counties, plus clients nationwide. Reach us at ezra@ezweb.dev or (561) 692-6868.
```
(697 chars — this is the field to use as-is on GBP; it fits with room to spare)

---

## sameAs tracking table

Every live URL below gets appended to the `business.sameAs` array in `ezweb/src/business.ts` and the site redeployed. **This repo change is out of scope for this document** — track status here, then hand the confirmed URL list to whoever ships the Phase 1 PR (or file it yourself if you have write access to `ezweb/`).

| Platform | URL once live | Added to `business.sameAs`? |
|---|---|---|
| Google Business Profile (maps) | `https://maps.google.com/?cid=15049505616001444936` | ✅ already in business.ts |
| GitHub org | `https://github.com/EZWebDev` | ✅ already in business.ts |
| Bing Places | | ☐ |
| Apple Business Connect | (no public profile URL — internal to Apple Maps/Siri) | n/a |
| LinkedIn Company Page | | ☐ |
| LinkedIn — Ezra personal | | ☐ (optional: personal profiles aren't always added to org sameAs — use judgment) |
| Clutch | | ☐ |
| GoodFirms | | ☐ |
| DesignRush | | ☐ |
| BBB | | ☐ |
| Yelp | | ☐ |
| Crunchbase | | ☐ |
| Nextdoor | | ☐ |
| Hollywood (FL) Chamber of Commerce | | ☐ |
| Greater Fort Lauderdale Chamber | | ☐ |
| Facebook Page | | ☐ |
| Instagram | | ☐ |
| X (Twitter) | | ☐ |
| YouTube | | ☐ |

**Instructions:** as each profile goes live, paste its final URL into the table above, then add it to the `sameAs` array in `ezweb/src/business.ts` (uncomment/replace the matching placeholder line), commit, and redeploy. Batch these — don't redeploy for every single new URL; do it weekly.

---

## Per-platform setup — priority order

Each entry: sign-up URL → fields to fill → which description length to use → category → checkbox.

### 1. Google Business Profile — highest priority
**Sign up / manage:** https://business.google.com

- [ ] **Hours** — currently shows "Add hours". Set Mon–Fri 9:00 AM–5:00 PM, closed Sat/Sun, to match `hoursDisplay`.
- [ ] **Primary category** — already set to *Internet marketing service*. Leave as-is (this is the verified live category — don't change it without reason).
- [ ] **Secondary categories** — add if they exist in the GBP category picker (they may not all be available; verify each in the picker rather than assuming):
  - Website designer — verify in GBP category picker
  - Marketing agency — verify in GBP category picker
  - Search engine optimization service — verify in GBP category picker
- [ ] **Services list** — add all six with 1-sentence descriptions: Custom Web Design & Development; Full Website Packages; Monthly SEO & Content; AI Search Visibility (GEO); Landing Page & CRO; Google Ads Management.
- [ ] **Business description** — use the **Long (750 char)** block above.
- [ ] **Photos checklist** — logo (square), cover photo, and 5+ real photos: office/workspace, Ezra headshot, a screenshot of a real project (with client permission), a "team at work" shot if available. No stock photos — Google downweights them.
- [ ] **Q&A seeds** — post and self-answer 3–4 questions to seed the section before customers do:
  - "What areas do you serve?" → Hollywood, Fort Lauderdale, Miami, and all of Broward and Miami-Dade counties, plus clients nationwide.
  - "What services do you offer?" → list the six services.
  - "Who founded EZ Web Development LLC?" → Founded in 2022 by Ezra Pinsky.
  - "Do you offer SEO and AI search visibility?" → Yes — monthly SEO & content, and AI Search Visibility (GEO) campaigns.
- [ ] **Posts cadence** — one GBP Post per week minimum (service highlight, blog link, or short update). Posts expire after 7 days on Search, so weekly keeps the profile "active" in Google's eyes.
- [ ] **Review request script** (send after every completed project, via email or SMS):
  > "Thanks for working with us! If you have a minute, a Google review helps other [city] businesses find us: [review link]. We appreciate it either way."
  - **Review link format:** `https://search.google.com/local/writereview?placeid=<PLACE_ID>`
  - **Finding the Place ID:** go to https://developers.google.com/maps/documentation/places/web-service/place-id, search "EZ Web Development LLC Hollywood FL" in the Place ID Finder tool, or open the GBP listing on Google Maps → Share → Copy Link, and extract the ID from the URL (or use the CID `15049505616001444936` with Google's CID-to-Place-ID lookup). Once found, swap it into the URL above and reuse it everywhere (this doc, review-request templates, footer link).
  - See `docs/REVIEWS-AND-AUTHORITY.md` for the full review process and FTC-compliant messaging.
- [ ] Verify GBP still shows "No reviews" is resolved once the first review lands.

### 2. Bing Places for Business
**Sign up:** https://www.bingplaces.com

- [ ] Use the **import from Google Business Profile** flow (Bing Places supports syncing an existing GBP listing) — this auto-fills NAP, hours, and category from GBP, minimizing manual entry errors.
- [ ] Confirm imported category maps to something equivalent to "Internet marketing service"; adjust if Bing's taxonomy differs.
- [ ] Description: **Medium (300 char)** block.
- [ ] Note: a Bing Places account already exists under ezra@ezweb.dev for other businesses — check that account first before creating a new one, to avoid a duplicate account conflict.

### 3. Apple Business Connect
**Sign up:** https://businessconnect.apple.com

- [ ] Sign in with Apple ID tied to ezra@ezweb.dev.
- [ ] Fill NAP exactly as canonical block above.
- [ ] Category: closest Apple Maps equivalent to "Internet marketing service" / "Website designer" — verify in Apple's picker.
- [ ] Description: **Short (160 char)** block (Apple Business Connect fields are short).
- [ ] Add logo + at least 1 photo.
- [ ] This feeds Siri and Apple Maps directly — worth doing even though it has no public web profile URL to add to `sameAs`.

### 4. LinkedIn
**Company page sign up:** https://www.linkedin.com/company/setup/new/

- [ ] Company name: `EZ Web Development LLC`.
- [ ] Website: `https://ezweb.dev`.
- [ ] Industry: Marketing & Advertising, or IT Services (pick the closer LinkedIn taxonomy match).
- [ ] Company size: 1 (self-employed / sole founder — be accurate, don't inflate).
- [ ] Tagline: **Tagline (50 char)** block.
- [ ] About section: **Long (750 char)** block.
- [ ] Founded: 2022.
- [ ] Location: Hollywood, FL.
- [ ] Logo + cover image.

**Ezra's personal profile:**
- [ ] Headline: `Founder, EZ Web Development LLC · Web Development & SEO`.
- [ ] About: 2–3 sentences using the entity sentence, in first person ("I founded EZ Web Development LLC in 2022...").
- [ ] Experience entry: Title "Founder", Company "EZ Web Development LLC" (link it to the company page above so LinkedIn cross-links them), Location "Hollywood, FL", Start date May 2022.

### 5. Clutch.co
**Sign up:** https://clutch.co/profile/create

- [ ] NAP + description: **Medium (300 char)** for tagline field, **Long (750 char)** for the full profile description.
- [ ] Category: Web Development / Web Design (Clutch's own taxonomy — pick closest).
- [ ] Services: list all six.
- [ ] After profile is live, request 2–3 past-client reviews — Clutch verifies by phone call, which is exactly why AI engines trust Clutch citations. See `docs/REVIEWS-AND-AUTHORITY.md`.

### 6. GoodFirms
**Sign up:** https://www.goodfirms.co/become_member

- [ ] Same NAP, **Medium (300 char)** description.
- [ ] Category: Web Development Companies.
- [ ] Add services and a link to the portfolio/services pages on ezweb.dev.

### 7. DesignRush
**Sign up:** https://www.designrush.com/agency/get-listed

- [ ] NAP, **Medium (300 char)** description.
- [ ] Category: Web Design & Development.

### 8. BBB (Better Business Bureau)
**Sign up:** https://www.bbb.org/get-listed

- [ ] Free profile is sufficient — accreditation is optional, not required for a citation.
- [ ] NAP + **Short (160 char)** description in the business summary field.
- [ ] Category: Internet Marketing Services / Web Site Design.

### 9. Yelp
**Sign up:** https://biz.yelp.com

- [ ] NAP, hours, **Short (160 char)** description.
- [ ] Category: Web Design, Marketing.
- [ ] Note: Yelp was cited for competitor EZ Web Solution LLC (Euless, TX) — a filled-out, active Yelp profile is a direct disambiguation play.

### 10. Crunchbase
**Sign up:** https://www.crunchbase.com/add-new

- [ ] Organization type: Company.
- [ ] Founded date: 2022-05-25.
- [ ] Founder: Ezra Pinsky (link to his Crunchbase person profile if creating one).
- [ ] Description: **Medium (300 char)**.
- [ ] Website + location.

### 11. Nextdoor
**Sign up:** https://business.nextdoor.com

- [ ] Business page with NAP, **Short (160 char)** description.
- [ ] Category: closest match to Internet marketing service.
- [ ] Nextdoor is hyperlocal — useful specifically for Hollywood/Broward neighborhood visibility, separate from the AI-citation goal.

### 12. Hollywood (FL) Chamber of Commerce
**Sign up:** https://www.hollywoodchamber.org (membership/join page)

- [ ] Requires paid membership in most chambers — confirm cost before joining.
- [ ] Member directory listing: NAP + **Short (160 char)** description + logo.
- [ ] See `docs/REVIEWS-AND-AUTHORITY.md` for the local-link angle (chamber directories are a legitimate local backlink).

### 13. Greater Fort Lauderdale Chamber of Commerce
**Sign up:** https://www.ftlchamber.com (membership/join page)

- [ ] Same as above — confirm membership cost/tier.
- [ ] Directory listing with NAP + **Short (160 char)** description.

### 14. Facebook Page
**Sign up:** https://www.facebook.com/pages/create

- [ ] Page name: `EZ Web Development LLC`.
- [ ] Category: Website Designer / Marketing Agency.
- [ ] About: **Medium (300 char)** description.
- [ ] NAP in the Page Info section, hours matching GBP.

### 15. Instagram
**Sign up:** https://www.instagram.com (convert to Business account, link to Facebook Page)

- [ ] Handle ideally `@ezwebdevelopment` or closest available.
- [ ] Bio: **Tagline (50 char)** + link to ezweb.dev.
- [ ] Category: Website Designer.

### 16. X (Twitter)
**Sign up:** https://x.com

- [ ] Handle ideally `@ezwebdev` or closest available.
- [ ] Bio: **Short (160 char)** description (X bio limit is 160 chars).
- [ ] Location: Hollywood, FL.
- [ ] Link: ezweb.dev.

### 17. YouTube
**Sign up:** https://www.youtube.com (create a channel under the ezra@ezweb.dev Google account — this is the same account as GBP)

- [ ] Channel name: `EZ Web Development LLC`.
- [ ] About: **Medium (300 char)** description + NAP in the channel description (YouTube "About" tab supports a business address field, which doubles as a citation).
- [ ] Link to ezweb.dev.

### 18. GitHub org profile (`EZWebDev`)
**Already exists:** https://github.com/EZWebDev

- [ ] Org profile bio: **Tagline (50 char)**.
- [ ] Org website field: `https://ezweb.dev`.
- [ ] Location field: Hollywood, FL.
- [ ] Create `.github` repo with `profile/README.md` — see `docs/GITHUB-ORG-README.md` for ready-to-paste content.
- [ ] Already in `business.sameAs` ✅.

---

## After each listing goes live

1. Screenshot or save the live URL.
2. Update the sameAs table above.
3. Batch-add new URLs to `business.sameAs` in `ezweb/src/business.ts` and redeploy (weekly, not per-listing).
4. Log the date in `docs/MEASUREMENT.md`'s weekly check if it changes what an AI engine cites.
