# ezweb.dev: rules for every Claude session

## Hard rule: no copy ships without the audit

- `npm run build` (in `ezweb/`) runs `npm run audit:copy -- --strict` as its last step. A failing audit fails the Netlify deploy. Never remove it, weaken it, or add words to its allowlist to get a build through. Fix the copy.
- Before committing any user-visible text (pages, services, locations, blog, meta titles and descriptions, schema descriptions), run `npm run build` and read the audit output, including the non-blocking warnings.
- The detector only catches patterns. Also reread the text yourself against the rules below.

## Writing rules for site copy

Write like the founder talking to a client across a desk. Plain, specific, short.

- Say the concrete thing. Name the deliverable, the step, the tool, the timeframe. Cut any adjective that could describe any agency.
- One idea per sentence. Keep sentences under about 25 words; 35 is the hard limit.
- Answer first. FAQ answers start with "Yes", "No", a number, or the direct answer, never by restating the question.
- No em dashes or en dashes as punctuation. Use a period, comma, or colon.
- No "not X, it's Y", "less about X than Y", or "whether you're X or Y" constructions.
- No stacked triads. One list of three per paragraph at most.
- No sentence-initial "Moreover", "Furthermore", "Additionally", "Ultimately", "In conclusion".
- Banned words and phrases (the detector enforces these): delve, dive into, deep dive, landscape, realm, tapestry, navigate (figurative), leverage (verb), unlock, unleash, elevate, empower, supercharge, seamless, robust, cutting-edge, state-of-the-art, world-class, game-changer, next-level, ever-evolving, in today's fast-paced/digital world, look no further, it's worth noting, it's important to note, at the end of the day, crucial, pivotal, vital, holistic, synergy, bespoke, tailored solutions, meticulous, harness, foster, streamline, peace of mind, we pride ourselves, one-stop shop, hassle-free, stand out from the crowd, embark, journey (figurative), resonate, testament to, paramount, myriad, plethora, comprehensive, "Here's the thing".
- No templated copy. Location pages and service pages must not share paragraphs or near-identical sentences. The only exception is the address block, which must match exactly.
- No self-praise ("we're passionate", "we go above and beyond"). Show the work instead.

## Facts: never invent

- Never invent clients, results, statistics, awards, reviews, testimonials, years of experience, team members, prices, or turnaround promises.
- Business facts come only from `ezweb/src/business.ts`. The name, address and phone must match the Google Business Profile byte for byte: `EZ Web Development LLC`, `1909 Tyler Street Suite 308, Hollywood, FL 33020`, `(561) 692-6868`.
- If copy needs a claim about how Ezra works that you cannot verify, flag it for him instead of writing it as fact.

## Deploys

- Production is the Netlify project `ezweb-site`. Before assuming this repo is what that project deploys, check with Ezra. The live site has forms (`audit`, `audit-law`, `audit-source`, `workshop`) that were not in this repo as of 2026-09-23.
