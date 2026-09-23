# Reviews & Authority — EZ Web Development LLC

Covers SEO-GEO-PLAN.md Phase 4: review acquisition, local links, guest content, and case studies. Goal from the plan: **10 Google reviews in 60 days**, plus a base of local and industry links.

---

## Review acquisition process

1. **Timing** — send the review request within 24–48 hours of project completion or final invoice payment, while the work is fresh. Don't wait for a scheduled "campaign."
2. **Channel** — email first (higher completion rate for a link click), SMS as a follow-up if no response in 5–7 days.
3. **One ask, one reminder** — send once, then a single polite follow-up after a week if nothing happens. Do not repeatedly nag.
4. **Reply to every review** — positive or negative, within a few days. Google weights owner responses as an engagement signal, and it shows future prospects the business is active.
5. **Track it** — log date sent, client, channel, and whether a review landed, in a simple sheet (not in this repo).

### FTC-compliant rules — do not violate these

- **No incentives.** Never offer a discount, gift card, future-service credit, or anything of value in exchange for a review, positive or otherwise. The FTC's endorsement guidelines (16 CFR Part 465, effective 2024) prohibit compensated or incentivized reviews without clear, conspicuous disclosure — and Google's own policies prohibit incentivized reviews outright, incentivized or not disclosed.
- **No gating.** Never ask "how was your experience?" first and only send the review link to people who respond positively (routing unhappy clients away from the public review flow while funneling happy ones to it). This is explicitly banned by the FTC rule and by Google's review policies. Ask everyone the same way, send everyone the same link.
- **No fake or incentivized reviews from friends/family with no real client relationship.**
- **No review-gating software or "smart" filtering.** If you want a private feedback channel too, offer it as an *additional*, clearly separate option — not as a gate in front of the public review link.

### Review request script — email

Subject: `Quick favor?`

```
Hi [Name],

Thanks again for working with us on [project]! If you have two minutes, a
Google review helps other [city] businesses find EZ Web Development LLC:

[review link]

We read every one and appreciate it either way.

— Ezra
EZ Web Development LLC
(561) 692-6868 · ezweb.dev
```

### Review request script — SMS (follow-up only, with prior consent to text)

```
Hi [Name], it's Ezra from EZ Web Development LLC. If you have a sec, a
quick Google review means a lot: [review link] — thanks again!
```

### Review link format

```
https://search.google.com/local/writereview?placeid=<PLACE_ID>
```

Find the Place ID once via https://developers.google.com/maps/documentation/places/web-service/place-id (Place ID Finder tool — search "EZ Web Development LLC Hollywood FL"), or resolve it from the known GBP CID `15049505616001444936` via Google's CID-to-Place-ID lookup. Reuse the same finished URL everywhere — email templates, SMS, footer, GBP posts. See `docs/CITATION-KIT.md` for where else this link is used.

---

## Local link ideas (Hollywood / Broward specific)

- **Hollywood (FL) Chamber of Commerce** — member directory listing with a link (see `docs/CITATION-KIT.md` for signup). Chambers are a high-trust local backlink and a citation source.
- **Greater Fort Lauderdale Chamber of Commerce** — same, broader metro reach.
- **BNI-type networking groups** — BNI (Business Network International) has Broward/South Florida chapters; membership includes a directory profile with a link, plus warm-referral relationships. Also look at local Chambers' smaller networking mixers, which are often free or low-cost to attend even before joining.
- **Local sponsorships** — sponsoring a youth sports team, a 5K, a school fundraiser, or a local meetup (tech, small-business, or founder groups in Hollywood/Fort Lauderdale) typically gets a sponsor listing with a link on the event or organization's site. Low cost, real local relevance, real link.
- **Client credit footers** — with client permission, add a small "Website by EZ Web Development LLC" (linking to ezweb.dev) in the footer of sites built for clients. This is a natural, contextually relevant backlink from a real, live site — exactly the kind AI engines and Google trust more than a directory listing.
  - **Get explicit permission first** — ask the client, don't add it unilaterally to a delivered site.
  - **Use it naturally** — small footer text, not a banner ad. If a client would rather not have it, respect that; it's a nice-to-have, not a requirement of the engagement.
  - Consider offering it as a small discount or standard inclusion in future contracts ("optional footer credit") rather than negotiating case by case.
- **Local business resource pages** — some South Florida cities and counties maintain small-business resource or vendor pages; check Hollywood's and Broward County's official sites for a submission process.

---

## Guest content ideas

- Pitch a short guest post to a local South Florida small-business blog or a chamber newsletter: practical, non-salesy ("3 things a small business website needs before running Google Ads" or similar — topics genuinely useful to a local business owner).
- Answer real questions with genuine expertise (and a profile link, not a pitch) on relevant subreddits (e.g. r/smallbusiness, r/SEO, r/webdev) and in South Florida small-business Facebook groups — this matches SEO-GEO-PLAN.md Phase 4's "industry links" item.
- Publish 1–2 small open-source tools or templates on the `EZWebDev` GitHub org with a link back to ezweb.dev — developer-oriented AI queries cite GitHub directly (see SEO-GEO-PLAN.md item 8 in Phase 2).
- Offer to be a source for local news outlets covering small-business or tech topics (HARO-style: respond to journalist queries with a genuine, quotable answer and a byline link).

---

## Case study template

For Ezra to fill in with **real, client-permissioned results only**. Do not publish a case study without the client's explicit sign-off on using their name/results, and do not fabricate or estimate numbers to fill gaps — leave a field blank or omit it rather than invent a figure.

```markdown
# [Client name or "A [industry] business in [city]"] — [one-line outcome]

**Client:** [Name, or anonymized description if the client prefers not to be named]
**Industry:** [e.g. HVAC contractor, boutique law firm, e-commerce brand]
**Location:** [City, FL]
**Services provided:** [e.g. Custom Web Design & Development, Monthly SEO & Content]
**Timeline:** [start month/year – end month/year, or "ongoing since [date]"]

## The problem
[1–2 sentences, in the client's own words if possible — what wasn't working
before EZ Web Development LLC got involved.]

## What we did
[Specific, factual description of the work: pages built, integrations added,
SEO changes made, ad campaigns run. No vague claims — name the actual work.]

## The result
[Only include numbers the client has confirmed and approved for publication —
e.g. organic traffic change, lead volume change, page speed improvement,
conversion rate change, ranking position. Cite the measurement source and
time window, e.g. "Organic sessions per Google Analytics, [start date] to
[end date]." If no verifiable number is available, describe the qualitative
outcome instead ("client reports [X]") rather than inventing a percentage.]

## Client quote (optional, with permission)
> "[Direct quote from the client, used with their permission.]"
> — [Name, Title, Company] (or "Client name withheld by request")
```

**Before publishing any case study:**
1. Get written (email is fine) permission from the client to use their name/logo/results publicly.
2. Confirm every number against the actual analytics/ad platform — don't round up or estimate.
3. If the client wants to stay anonymous, use an industry + city description instead of a name, and don't include identifying details that would let someone guess who it is without consent.
