#!/usr/bin/env node
/**
 * Copy audit ("AI slop" detector) for the prerendered site in dist/.
 *
 * Run after `npm run build`:
 *   npm run audit:copy              # report only, always exits 0
 *   npm run audit:copy -- --strict  # exit 1 if any banned phrase, or any page's dash rate > 2 per 1,000 words
 *   npm run audit:copy -- --verbose # also print every flagged sentence, not just the first few
 *
 * For every dist/**\/*.html with a #root, it extracts the visible text of the page body
 * (site header and footer are audited once, as "(site chrome)") and reports:
 *   (a) banned / suspect phrases, with counts
 *   (b) em dashes and en-dashes-used-as-punctuation per 1,000 words
 *   (c) sentences over 35 words
 *   (d) repeated sentence openers (and the share of sentences that start with "We")
 *   (e) rule-of-three lists ("X, Y and Z"), and how often they land in consecutive sentences
 *       of the same paragraph
 *   (f) "not just X, but Y" / "it's not X, it's Y" / "less about X than Y" contrasts
 *   (g) sentences and paragraphs duplicated across pages (templated copy), exact and near-duplicate
 *
 * Link-card text (card titles/summaries that excerpt another page), breadcrumbs and the
 * NAP <address> block are excluded from duplicate detection because they are intentional
 * excerpts of a single source, but they are still scanned for phrases and dashes.
 */
import fs from 'node:fs'
import path from 'node:path'

const args = new Set(process.argv.slice(2))
const STRICT = args.has('--strict')
const VERBOSE = args.has('--verbose')
const MAX_DASH_RATE = 2
const LONG_SENTENCE = 35
const NEAR_SENT = Number(process.env.NEAR_SENT || 0.3)

const root = process.cwd()
const distDir = path.resolve(root, 'dist')
if (!fs.existsSync(distDir)) {
  console.error('[audit-copy] dist/ not found. Run `npm run build` first.')
  process.exit(STRICT ? 1 : 0)
}

// ---------------------------------------------------------------------------
// Phrase lists
// ---------------------------------------------------------------------------

/** Banned: count toward --strict. Matched case-insensitively on text with curly quotes normalized. */
const BANNED = [
  ['delve', /\bdelv(e|es|ed|ing)\b/],
  ['dive into', /\bdiv(e|es|ing) into\b/],
  ['deep dive', /\bdeep[- ]dives?\b/],
  ['landscape', /\blandscapes?\b/],
  ['realm', /\brealms?\b/],
  ['tapestry', /\btapestr(y|ies)\b/],
  ['navigate', /\bnavigat(e|es|ed|ing)\b/],
  ['leverage', /\bleverag(e|es|ed|ing)\b/],
  ['unlock', /\bunlock(s|ed|ing)?\b/],
  ['unleash', /\bunleash(es|ed|ing)?\b/],
  ['elevate', /\belevat(e|es|ed|ing)\b/],
  ['empower', /\bempower(s|ed|ing|ment)?\b/],
  ['supercharge', /\bsupercharg(e|es|ed|ing)\b/],
  ['seamless(ly)', /\bseamless(ly)?\b/],
  ['robust', /\brobust(ly|ness)?\b/],
  ['cutting-edge', /\bcutting[- ]edge\b/],
  ['state-of-the-art', /\bstate[- ]of[- ]the[- ]art\b/],
  ['world-class', /\bworld[- ]class\b/],
  ['game-changer', /\bgame[- ]chang(er|ers|ing)\b/],
  ['next-level', /\bnext[- ]level\b/],
  ["in today's … world", /\bin today's (fast[- ]paced |digital |modern |competitive )?(world|market|era|age)\b/],
  ['ever-evolving / ever-changing', /\bever[- ](evolving|changing)\b/],
  ["whether you're", /\bwhether you're\b/],
  ['look no further', /\blook no further\b/],
  ["it's worth noting", /\bit(?:'s| is) worth not(?:ing|e)\b/],
  ["it's important to note", /\bit(?:'s| is) important to (?:note|remember|understand)\b/],
  ['at the end of the day', /\bat the end of the day\b/],
  ['in conclusion', /\bin conclusion\b/],
  ['moreover', /\bmoreover\b/],
  ['furthermore', /\bfurthermore\b/],
  ['additionally (sentence-initial)', /(?:^|[.!?:]\s+)additionally\b/],
  ['crucial', /\bcrucial(ly)?\b/],
  ['pivotal', /\bpivotal\b/],
  ['vital', /(?<!web )\bvital(ly)?\b/],
  ['holistic', /\bholistic(ally)?\b/],
  ['synergy', /\bsynerg(y|ies|istic)\b/],
  ['bespoke', /\bbespoke\b/],
  ['tailored solutions', /\btailored solutions?\b/],
  ['meticulous(ly)', /\bmeticulous(ly)?\b/],
  ['harness', /\bharness(es|ed|ing)?\b/],
  ['foster', /\bfoster(s|ed|ing)?\b/],
  ['streamline', /\bstreamlin(e|es|ed|ing)\b/],
  ['boost your', /\bboost your\b/],
  ['take your … to the next level', /\btake your .{1,40}? to the next level\b/],
  ['peace of mind', /\bpeace of mind\b/],
  ['we pride ourselves', /\bwe pride ourselves\b/],
  ['one-stop shop', /\bone[- ]stop[- ]shop\b/],
  ['hassle-free', /\bhassle[- ]free\b/],
  ['stand out from the crowd', /\bstand out from the crowd\b/],
  ['in the digital age', /\bin the digital age\b/],
  ['embark', /\bembark(s|ed|ing)?\b/],
  ['journey', /\bjourneys?\b/],
  ['resonate', /\bresonat(e|es|ed|ing)\b/],
  ['testament to', /\btestament to\b/],
  ['paramount', /\bparamount\b/],
  ['myriad', /\bmyriad\b/],
  ['plethora', /\bplethora\b/],
  ['a wide range of', /\ba wide (range|variety|array) of\b/],
  ['comprehensive', /\bcomprehensive(ly)?\b/],
  ["here's the thing", /\bhere's the thing\b/],
]

/** Watch list: reported, never fails --strict. Softer tells that are fine in moderation. */
const WATCH = [
  ['genuinely / truly / really', /\b(genuinely|truly|really)\b/],
  ['actually', /\bactually\b/],
  ['simply / just (softener)', /\b(simply|just)\b/],
  ['ensure', /\bensur(e|es|ed|ing)\b/],
  ['solution(s)', /\bsolutions?\b/],
  ['tailored', /\btailored\b/],
  ['powerful / innovative', /\b(powerful|innovative)\b/],
  ['partner', /\bpartners?\b/],
  ['the right fit / better fit', /\b(the right|a better|the better|a good) fit\b/],
  ['in practice', /\bin practice\b/],
  ['sentence-initial transition', /(?:^|[.!?]\s+)(also|however|ultimately|importantly|essentially|overall|that said|in short|in other words),/],
]

/** Contrast constructions (f). */
const CONTRASTS = [
  ['not just/only X, but Y', /\bnot (just|only|merely|simply)\b[^.!?]{1,90}?\bbut\b/],
  ["it's not X, it's Y", /\b(it|this|that)(?:'s| is|’s) not\b[^.!?]{1,90}?[,;:.—–]\s*(it|this|that)(?:'s| is)\b/],
  ["isn't X, it's Y", /\b(isn't|is not)\b[^.!?]{1,60}?[,;—–]\s*(it|this|that)(?:'s| is)\b/],
  ['less about X than (about) Y', /\bless about\b[^.!?]{1,80}?\bthan\b/],
  ['more than just', /\bmore than just\b/],
  ["doesn't make/mean X. It makes/means Y", /\b(does|do|did) not (make|mean)\b[^.!?]{1,80}[.;,]\s*(it|this|that) (makes|means)\b/],
  ['rarely X. They/It Y', /\brarely\b[^.!?]{1,60}\.\s*(they|it) (come|comes|is|are)\b/],
]

/**
 * Sentences that are allowed to repeat across pages: the verbatim entity statement
 * (business.description, reused on purpose for AI/entity consistency) and per-template
 * boilerplate rendered by shared components. Anything else repeated is reported.
 */
const DUPLICATE_ALLOW = [
  /^ez web development llc is a web development and seo agency in hollywood, florida, founded in 2022 by ezra pinsky\.$/,
  /^we design and build fast custom websites, run monthly seo/,
  /^ezra pinsky is the founder of ez web development llc, a web development and seo agency in hollywood, florida\.$/,
  /^serving hollywood, fort lauderdale, miami and nationwide\.$/,
  /^call \(561\) 692-6868, email ezra@ezweb\.dev, or send us a few details about your project\.$/,
]

// ---------------------------------------------------------------------------
// HTML -> blocks of visible text
// ---------------------------------------------------------------------------

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')

const BLOCK_TAGS = 'p|li|h[1-6]|dt|dd|td|th|div|section|article|aside|nav|header|footer|main|ul|ol|dl|address|blockquote|figcaption|small|form|label|button|fieldset|legend'
const BLOCK_RE = new RegExp(`<(?:${BLOCK_TAGS})\\b[^>]*>|<span class="(?:eyebrow|badge)"[^>]*>|</(?:${BLOCK_TAGS})>|<br\\s*/?>`, 'gi')
const MARK = '\u0001'

/** Remove the first balanced <tag class="cls"> … </tag> element (handles nesting of the same tag name). */
function cutElements(html, tag, classTest) {
  const open = new RegExp(`<${tag}\\b([^>]*)>`, 'gi')
  let out = html
  let m
  const removed = []
  open.lastIndex = 0
  while ((m = open.exec(out))) {
    const cls = (m[1].match(/class="([^"]*)"/) || [])[1] || ''
    if (!classTest(cls, m[1])) continue
    // walk forward counting nested same-name tags
    const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'gi')
    re.lastIndex = m.index
    let depth = 0
    let end = -1
    let t
    while ((t = re.exec(out))) {
      if (t[0][1] === '/') depth--
      else depth++
      if (depth === 0) { end = re.lastIndex; break }
    }
    if (end === -1) break
    removed.push(out.slice(m.index, end))
    out = out.slice(0, m.index) + ' ' + out.slice(end)
    open.lastIndex = m.index
  }
  return { html: out, removed }
}

/** HTML fragment -> array of text blocks (paragraph-ish units). */
function toBlocks(fragment) {
  const text = fragment
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!-- -->/g, '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(BLOCK_RE, MARK)
    .replace(/<[^>]+>/g, '')
  return decode(text)
    .split(MARK)
    .map((b) => b.replace(/\s+/g, ' ').trim())
    .filter((b) => /[A-Za-z]/.test(b))
}

function extract(html) {
  const start = html.indexOf('<div id="root">')
  if (start === -1) return null
  const bodyEnd = html.lastIndexOf('</body>')
  let inner = html.slice(start + '<div id="root">'.length, bodyEnd === -1 ? undefined : bodyEnd)
  inner = inner.replace(/<script[\s\S]*?<\/script>/gi, ' ')

  // Site chrome: header + site footer (not the article footer).
  let chrome = []
  let r = cutElements(inner, 'header', (cls) => /\bheader\b/.test(cls))
  inner = r.html; chrome.push(...r.removed)
  r = cutElements(inner, 'footer', (cls) => cls.split(/\s+/).includes('footer'))
  inner = r.html; chrome.push(...r.removed)
  inner = inner.replace(/<a class="skip-link[^"]*"[^>]*>[\s\S]*?<\/a>/, ' ')
  // Breadcrumbs repeat the H1 and are navigation, not copy.
  inner = cutElements(inner, 'nav', (cls, attrs) => /aria-label="Breadcrumb"/.test(attrs)).html

  // Excerpts that should not count as duplicated prose.
  let proseOnly = inner
  for (const [tag, test] of [
    ['div', (cls) => /\bcard-(text|title|eyebrow)\b/.test(cls)],
    ['h2', (cls) => /\bcard-title\b/.test(cls)],
    ['p', (cls) => /\bbyline\b/.test(cls)],
    ['address', () => true],
  ]) proseOnly = cutElements(proseOnly, tag, test).html
  // "<li><a href="/services/x">Name</a>: summary</li>" lists are the service card summary in list form.
  proseOnly = proseOnly.replace(/<li\b[^>]*><a [^>]*href="\/services\/[^"]+"[^>]*>[\s\S]*?<\/a>: [\s\S]*?<\/li>/gi, ' ')

  // Blocks that are prose (<p>/<li>/<dd>) vs headings, for duplicate detection.
  const proseBlocks = []
  const pRe = /<(p|li|dd)\b[^>]*>([\s\S]*?)<\/\1>/gi
  let pm
  while ((pm = pRe.exec(proseOnly))) {
    const t = toBlocks(pm[2]).join(' ')
    if (t) proseBlocks.push(t)
  }

  return { blocks: toBlocks(inner), chromeBlocks: toBlocks(chrome.join(' ')), proseBlocks }
}

// ---------------------------------------------------------------------------
// Text utilities
// ---------------------------------------------------------------------------

const normQuotes = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"')
const words = (s) => s.match(/[A-Za-z0-9][A-Za-z0-9'’&./@-]*/g) || []
const ABBREV = /\b(e\.g|i\.e|etc|vs|Ste|St|Mr|Mrs|Ms|Dr|No|U\.S|approx|Inc|Ltd)\.$/i

function sentences(block) {
  // Split after . ! ? when followed by space + an uppercase letter, digit or quote.
  const parts = []
  let buf = ''
  const re = /([.!?]["”’)]?)(\s+)(?=["“(]?[A-Z0-9])/g
  let last = 0
  let m
  while ((m = re.exec(block))) {
    const chunk = block.slice(last, m.index + m[1].length)
    if (ABBREV.test((buf + chunk).trim())) { buf += chunk + m[2]; last = m.index + m[0].length; continue }
    parts.push((buf + chunk).trim()); buf = ''
    last = m.index + m[0].length
  }
  const tail = (buf + block.slice(last)).trim()
  if (tail) parts.push(tail)
  return parts.filter((s) => words(s).length > 0)
}

const countMatches = (re, s) => {
  const g = new RegExp(re.source, 'gi')
  return (s.match(g) || []).length
}

/** Exactly-three-item lists: "A, B and C" / "A, B, or C" with 1–4 word items, not part of a longer list. */
function triads(sentence) {
  const item = "[\\w'’&/+-]+(?: [\\w'’&/+-]+){0,3}"
  const re = new RegExp(`(${item}), (${item}),? (?:and|or) (${item})`, 'g')
  const found = []
  let m
  const s = normQuotes(sentence)
  while ((m = re.exec(s))) {
    const before = s.slice(0, m.index).trimEnd()
    if (before.endsWith(',')) continue // tail of a 4+ item list
    if ([m[1], m[2], m[3]].some((x) => /^\d/.test(x.trim()))) continue // dates and numbers, not a list
    found.push(m[0])
  }
  return found
}

const DASH_EM = /—/g
// Dashes: em dashes always count; en dashes and hyphens count only when spaced (ranges like 9am–5pm do not).
const DASH_EN_PUNCT = /(\s–|–\s)/g // en dash with whitespace on a side = used as punctuation, not a range
const DASH_HYPHEN_PUNCT = /\s(-|--)\s/g

// ---------------------------------------------------------------------------
// Analyse pages
// ---------------------------------------------------------------------------

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const urlFor = (file) => {
  const rel = path.relative(distDir, file).split(path.sep).join('/')
  if (rel === 'index.html') return '/'
  return '/' + rel.replace(/\.html$/, '')
}

function analyse(name, blocks, proseBlocks) {
  const text = blocks.join('\n')
  const sentBlock = []
  const sents = blocks.flatMap((b, bi) => sentences(b).map((x) => (sentBlock.push(bi), x)))
  const wc = words(text).length
  const lower = normQuotes(text).toLowerCase()

  const banned = []
  for (const [label, re] of BANNED) {
    // sentence-initial rule needs per-sentence context
    const n = label.includes('sentence-initial')
      ? sents.filter((s) => /^additionally\b/i.test(s.trim())).length
      : countMatches(re, lower)
    if (n) banned.push([label, n])
  }
  const watch = []
  for (const [label, re] of WATCH) {
    const n = label === 'sentence-initial transition'
      ? sents.filter((s) => /^(also|however|ultimately|importantly|essentially|overall|that said|in short|in other words),/i.test(normQuotes(s))).length
      : countMatches(re, lower)
    if (n) watch.push([label, n])
  }

  const em = (text.match(DASH_EM) || []).length
  const en = (text.match(DASH_EN_PUNCT) || []).length
  const hy = (text.match(DASH_HYPHEN_PUNCT) || []).length
  const dashes = em + en + hy
  const dashRate = wc ? (dashes / wc) * 1000 : 0

  const long = sents.filter((s) => words(s).length > LONG_SENTENCE)

  // Openers
  const openerCounts = new Map()
  const firstWords = sents.map((s) => (words(normQuotes(s))[0] || '').toLowerCase())
  firstWords.forEach((w) => w && openerCounts.set(w, (openerCounts.get(w) || 0) + 1))
  const proseSents = sents.filter((s) => words(s).length >= 6)
  // Skip a leading "Label:" (e.g. "Best for:", "The fix:") so structured lists are judged on their content.
  const proseFirst = proseSents.map((s) => (words(normQuotes(s).replace(/^[^.:!?]{1,30}:\s+/, ''))[0] || '').toLowerCase())
  const repeatedOpeners = [...new Map(proseFirst.reduce((m, w) => m.set(w, (m.get(w) || 0) + 1), new Map()))]
    .filter(([w, n]) => w && n >= 5 && n / Math.max(proseSents.length, 1) >= 0.12)
    .sort((a, b) => b[1] - a[1])
  let runs = 0
  const runExamples = []
  for (let i = 2; i < proseFirst.length; i++) {
    if (proseFirst[i] && proseFirst[i] === proseFirst[i - 1] && proseFirst[i] === proseFirst[i - 2]) {
      runs++
      runExamples.push(`${proseFirst[i]}: "${proseSents[i - 2].slice(0, 60)}…"`)
    }
  }
  const weStarts = proseFirst.filter((w) => w === 'we' || w === "we're" || w === "we'll" || w === 'our').length
  const weShare = proseSents.length ? weStarts / proseSents.length : 0

  // Triads
  const triadFlags = sents.map((s) => triads(s).length > 0)
  const triadCount = triadFlags.filter(Boolean).length
  let triadPairs = 0
  const triadPairExamples = []
  for (let i = 1; i < sents.length; i++) {
    if (triadFlags[i] && triadFlags[i - 1] && sentBlock[i] === sentBlock[i - 1]) {
      triadPairs++
      triadPairExamples.push(`${triads(sents[i - 1])[0]}  /  ${triads(sents[i])[0]}`)
    }
  }

  // Contrasts
  const contrasts = []
  const flat = normQuotes(text.replace(/\n/g, ' '))
  for (const [label, re] of CONTRASTS) {
    const g = new RegExp(re.source, 'gi')
    let m
    while ((m = g.exec(flat))) contrasts.push([label, flat.slice(Math.max(0, m.index - 10), m.index + m[0].length + 20)])
  }

  return {
    name, wc, sents, proseBlocks: proseBlocks ?? [], banned, watch, em, en, hy, dashes, dashRate, long,
    openerCounts, repeatedOpeners, runs, runExamples, weStarts, weShare, proseSentCount: proseSents.length,
    triadCount, triadPairs, triadPairExamples, contrasts,
  }
}

const files = walk(distDir).sort()
const pages = []
let chromeBlocks = null
for (const f of files) {
  const x = extract(fs.readFileSync(f, 'utf8'))
  if (!x || x.blocks.length === 0) continue
  if (!chromeBlocks && x.chromeBlocks.length) chromeBlocks = x.chromeBlocks
  pages.push(analyse(urlFor(f), x.blocks, x.proseBlocks))
}
if (chromeBlocks) pages.push(analyse('(site chrome)', chromeBlocks, []))

// (g) duplicates across pages ------------------------------------------------
const normSent = (s) => normQuotes(s).toLowerCase().replace(/\s+/g, ' ').trim()
const sentPages = new Map()
for (const p of pages) {
  if (p.name === '(site chrome)') continue
  const seen = new Set()
  for (const b of p.proseBlocks) {
    for (const s of sentences(b)) {
      if (words(s).length < 8) continue
      const k = normSent(s)
      if (DUPLICATE_ALLOW.some((re) => re.test(k))) continue
      if (seen.has(k)) continue
      seen.add(k)
      if (!sentPages.has(k)) sentPages.set(k, { text: s, pages: [] })
      sentPages.get(k).pages.push(p.name)
    }
  }
}
const dupSentences = [...sentPages.values()].filter((v) => v.pages.length > 1)
const dupByPage = new Map()
for (const d of dupSentences) for (const pg of d.pages) dupByPage.set(pg, (dupByPage.get(pg) || 0) + 1)

// Near-duplicate paragraphs: word 4-shingle Jaccard >= 0.5 between paragraphs on different pages.
const shingles = (s) => {
  const w = words(normQuotes(s).toLowerCase())
  const set = new Set()
  for (let i = 0; i + 4 <= w.length; i++) set.add(w.slice(i, i + 4).join(' '))
  return set
}
const paras = []
for (const p of pages) {
  if (p.name === '(site chrome)') continue
  for (const b of p.proseBlocks) if (words(b).length >= 20 && !DUPLICATE_ALLOW.some((re) => re.test(normSent(sentences(b)[0] || '')))) paras.push({ page: p.name, text: b, sh: shingles(b) })
}
const nearDup = []
for (let i = 0; i < paras.length; i++) {
  for (let j = i + 1; j < paras.length; j++) {
    const a = paras[i], b = paras[j]
    if (a.page === b.page) continue
    let inter = 0
    for (const s of a.sh) if (b.sh.has(s)) inter++
    const jac = inter / (a.sh.size + b.sh.size - inter || 1)
    if (jac >= 0.5) nearDup.push({ a, b, jac })
  }
}

// Near-duplicate sentences (templated phrasing with a few words swapped): 3-gram Jaccard >= NEAR_SENT.
const shingles3 = (s) => {
  const w = words(normQuotes(s).toLowerCase())
  const set = new Set()
  for (let i = 0; i + 3 <= w.length; i++) set.add(w.slice(i, i + 3).join(' '))
  return set
}
const sentPool = []
for (const p of pages) {
  if (p.name === '(site chrome)') continue
  for (const b of p.proseBlocks) for (const s of sentences(b)) {
    if (words(s).length < 10 || DUPLICATE_ALLOW.some((re) => re.test(normSent(s)))) continue
    sentPool.push({ page: p.name, text: s, sh: shingles3(s) })
  }
}
const nearDupSent = []
for (let i = 0; i < sentPool.length; i++) {
  for (let j = i + 1; j < sentPool.length; j++) {
    const a = sentPool[i], b = sentPool[j]
    if (a.page === b.page) continue
    let inter = 0
    for (const x of a.sh) if (b.sh.has(x)) inter++
    const jac = inter / (a.sh.size + b.sh.size - inter || 1)
    if (jac >= NEAR_SENT && normSent(a.text) !== normSent(b.text)) nearDupSent.push({ a, b, jac })
  }
}
nearDupSent.sort((x, y) => y.jac - x.jac)

// "Key takeaways" on every post?
const posts = pages.filter((p) => p.name.startsWith('/blog/'))
const postsWithTakeaways = posts.filter((p) => p.sents.some((s) => /^key takeaways$/i.test(s.trim())))
const takeawaysOnEvery = posts.length > 1 && postsWithTakeaways.length === posts.length

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const sum = (arr) => arr.reduce((a, b) => a + b, 0)
const bannedTotal = (p) => sum(p.banned.map(([, n]) => n))
const score = (p) =>
  bannedTotal(p) * 3 +
  p.contrasts.length * 3 +
  p.long.length +
  Math.round(p.dashRate) +
  p.triadPairs +
  p.repeatedOpeners.length +
  p.runs +
  (p.weShare > 0.3 ? 2 : 0) +
  Math.round((dupByPage.get(p.name) || 0) * 0.5)

const pad = (s, n) => String(s).padEnd(n)
const lpad = (s, n) => String(s).padStart(n)

console.log('COPY AUDIT  ' + new Date().toISOString().slice(0, 10) + (STRICT ? '  (strict)' : ''))
console.log('='.repeat(118))
console.log(
  pad('page', 46) + lpad('words', 6) + lpad('banned', 8) + lpad('dash/1k', 9) + lpad('long', 6) + lpad('openers', 9) +
  lpad('we%', 5) + lpad('triads', 8) + lpad('3x3', 5) + lpad('contr', 6) + lpad('dups', 6) + lpad('score', 7),
)
console.log('-'.repeat(118))
for (const p of pages) {
  console.log(
    pad(p.name.length > 45 ? p.name.slice(0, 44) + '…' : p.name, 46) +
    lpad(p.wc, 6) + lpad(bannedTotal(p), 8) + lpad(p.dashRate.toFixed(1), 9) + lpad(p.long.length, 6) +
    lpad(p.repeatedOpeners.length + p.runs, 9) + lpad(Math.round(p.weShare * 100), 5) + lpad(p.triadCount, 8) +
    lpad(p.triadPairs, 5) + lpad(p.contrasts.length, 6) + lpad(dupByPage.get(p.name) || 0, 6) + lpad(score(p), 7),
  )
}
console.log('-'.repeat(118))
console.log('Columns: banned = banned-phrase hits; dash/1k = em dashes + spaced en/hyphen dashes per 1,000 words;')
console.log(`long = sentences > ${LONG_SENTENCE} words; openers = over-used openers + runs of 3 identical openers; we% = share of`)
console.log('sentences starting with We/Our; triads = sentences with an exactly-three-item list; 3x3 = consecutive triad sentences;')
console.log('contr = "not X but Y"-style contrasts; dups = sentences also found on another page.')

const LIMIT = VERBOSE ? Infinity : 4
console.log('\nDETAILS')
console.log('='.repeat(118))
for (const p of pages) {
  const lines = []
  if (p.banned.length) lines.push('  banned: ' + p.banned.map(([l, n]) => `${l} x${n}`).join(', '))
  if (p.watch.length) lines.push('  watch:  ' + p.watch.map(([l, n]) => `${l} x${n}`).join(', '))
  if (p.dashes) lines.push(`  dashes: ${p.em} em, ${p.en} spaced en, ${p.hy} spaced hyphen (${p.dashRate.toFixed(1)}/1k)`)
  for (const s of p.long.slice(0, LIMIT)) lines.push(`  long (${words(s).length}w): ${s.slice(0, 150)}${s.length > 150 ? '…' : ''}`)
  if (p.long.length > LIMIT) lines.push(`  … ${p.long.length - LIMIT} more long sentences (--verbose)`)
  for (const [w, n] of p.repeatedOpeners) lines.push(`  opener: "${w}" starts ${n} of ${p.proseSentCount} sentences`)
  for (const r of p.runExamples.slice(0, LIMIT)) lines.push(`  opener run: ${r}`)
  if (p.weShare > 0.3) lines.push(`  we-heavy: ${Math.round(p.weShare * 100)}% of sentences start with We/Our`)
  for (const t of p.triadPairExamples.slice(0, LIMIT)) lines.push(`  triad pair: ${t}`)
  for (const [l, ctx] of p.contrasts) lines.push(`  contrast (${l}): …${ctx}…`)
  if (lines.length) {
    console.log(`${p.name}`)
    console.log(lines.join('\n'))
  }
}

console.log('\nDUPLICATE SENTENCES ACROSS PAGES (>= 8 words, excluding allowed entity/boilerplate lines)')
console.log('='.repeat(118))
if (!dupSentences.length) console.log('  none')
for (const d of dupSentences.slice(0, VERBOSE ? Infinity : 25)) console.log(`  [${d.pages.length}] ${d.text.slice(0, 110)}${d.text.length > 110 ? '…' : ''}\n      on ${d.pages.join(', ')}`)
if (!VERBOSE && dupSentences.length > 25) console.log(`  … ${dupSentences.length - 25} more (--verbose)`)

console.log('\nNEAR-DUPLICATE PARAGRAPHS ACROSS PAGES (4-gram Jaccard >= 0.5)')
console.log('='.repeat(118))
if (!nearDup.length) console.log('  none')
for (const n of nearDup) console.log(`  ${n.jac.toFixed(2)}  ${n.a.page}  <->  ${n.b.page}\n      "${n.a.text.slice(0, 100)}…"`)

console.log(`\nNEAR-DUPLICATE SENTENCES ACROSS PAGES (3-gram Jaccard >= ${NEAR_SENT}: same template, words swapped)`)
console.log('='.repeat(118))
if (!nearDupSent.length) console.log('  none')
for (const n of nearDupSent.slice(0, VERBOSE ? Infinity : 30)) console.log(`  ${n.jac.toFixed(2)}  ${n.a.page}  <->  ${n.b.page}\n      A: ${n.a.text.slice(0, 110)}\n      B: ${n.b.text.slice(0, 110)}`)
if (!VERBOSE && nearDupSent.length > 30) console.log(`  … ${nearDupSent.length - 30} more (--verbose)`)

console.log('\nKEY TAKEAWAYS')
console.log('='.repeat(118))
console.log(`  "Key takeaways" heading on ${postsWithTakeaways.length} of ${posts.length} posts${takeawaysOnEvery ? '  <- on every post: flagged as templated' : ' (ok: not on every post)'}`)

const allBanned = sum(pages.map(bannedTotal)) + (takeawaysOnEvery ? 1 : 0)
const allWords = sum(pages.map((p) => p.wc))
const allDashes = sum(pages.map((p) => p.dashes))
const worstDash = pages.reduce((a, p) => (p.dashRate > a.dashRate ? p : a), pages[0])
const totals = {
  pages: pages.length,
  words: allWords,
  banned: allBanned,
  dashRate: allWords ? (allDashes / allWords) * 1000 : 0,
  worstDash,
  long: sum(pages.map((p) => p.long.length)),
  openers: sum(pages.map((p) => p.repeatedOpeners.length + p.runs)),
  triads: sum(pages.map((p) => p.triadCount)),
  triadPairs: sum(pages.map((p) => p.triadPairs)),
  contrasts: sum(pages.map((p) => p.contrasts.length)),
  dups: dupSentences.length,
  nearDup: nearDup.length,
  nearDupSent: nearDupSent.length,
  score: sum(pages.map(score)) + nearDup.length * 2 + nearDupSent.length,
}

console.log('\nSUMMARY')
console.log('='.repeat(118))
console.log(`  pages audited ............ ${totals.pages} (${totals.words.toLocaleString('en-US')} words)`)
console.log(`  banned phrases ........... ${totals.banned}`)
console.log(`  dash rate (site) ......... ${totals.dashRate.toFixed(2)} per 1,000 words (worst page: ${worstDash.name} ${worstDash.dashRate.toFixed(2)})`)
console.log(`  sentences > ${LONG_SENTENCE} words ..... ${totals.long}`)
console.log(`  opener repetition flags .. ${totals.openers}`)
console.log(`  triad sentences .......... ${totals.triads} (${totals.triadPairs} consecutive pairs)`)
console.log(`  contrast constructions ... ${totals.contrasts}`)
console.log(`  duplicate sentences ...... ${totals.dups}`)
console.log(`  near-duplicate paragraphs  ${totals.nearDup}`)
console.log(`  near-duplicate sentences . ${totals.nearDupSent}`)
console.log(`  TOTAL SCORE .............. ${totals.score}  (lower is better; banned x3, contrasts x3, long, dash rate, 3x3 triads, openers, dups/2, near-dup paragraphs x2, near-dup sentences)`)

if (STRICT) {
  const overDash = pages.filter((p) => p.dashRate > MAX_DASH_RATE)
  const problems = []
  if (totals.banned > 0) problems.push(`${totals.banned} banned phrase(s)`)
  if (overDash.length) problems.push(`dash rate > ${MAX_DASH_RATE}/1k on ${overDash.map((p) => p.name).join(', ')}`)
  if (problems.length) {
    console.log(`\n[audit-copy] STRICT FAIL: ${problems.join('; ')}`)
    process.exit(1)
  }
  console.log('\n[audit-copy] STRICT OK')
}
