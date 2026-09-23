#!/usr/bin/env node
/**
 * Build-time static rendering (SSG).
 *
 * Requires: `vite build` (client -> dist/) and `vite build --ssr src/entry-server.tsx`
 * (server -> dist-ssr/). For every page in getSiteIndex() this writes
 * dist/<path>/index.html (dist/index.html for "/", dist/404.html for "/404") with the
 * rendered markup inside #root and the page's head tags (title, description, robots,
 * canonical, Open Graph, Twitter, JSON-LD) in <head>.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const distDir = path.resolve(root, 'dist')
const ssrEntry = path.resolve(root, 'dist-ssr', 'entry-server.js')

for (const [p, hint] of [
  [path.join(distDir, 'index.html'), 'vite build'],
  [ssrEntry, 'vite build --ssr src/entry-server.tsx'],
]) {
  if (!fs.existsSync(p)) {
    console.error(`[prerender] Missing ${path.relative(root, p)}. Run \`${hint}\` first.`)
    process.exit(1)
  }
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
const HEAD_RE = /<!--app-head:start-->[\s\S]*?<!--app-head:end-->/
const BODY_MARK = '<!--app-html-->'
if (!HEAD_RE.test(template) || !template.includes(BODY_MARK)) {
  console.error('[prerender] dist/index.html is missing the <!--app-head:start/end--> or <!--app-html--> markers (see index.html).')
  process.exit(1)
}

const { render, getSiteIndex } = await import(pathToFileURL(ssrEntry).href)

const outFileFor = (p) => {
  if (p === '/') return path.join(distDir, 'index.html')
  if (p === '/404') return path.join(distDir, '404.html')
  const clean = p.replace(/^\/+|\/+$/g, '')
  return path.join(distDir, ...clean.split('/'), 'index.html')
}

const pages = getSiteIndex()
const seen = new Set()
let failures = 0

for (const page of pages) {
  if (seen.has(page.path)) {
    console.error(`[prerender] Duplicate path in getSiteIndex(): ${page.path}`)
    failures++
    continue
  }
  seen.add(page.path)
  try {
    const { html, head } = await render(page.path)
    if (!head.includes('<title')) throw new Error('no <title> collected; is <Seo/> rendered for this route?')
    // Use function replacers so "$" sequences in content are not treated as patterns.
    const out = template.replace(HEAD_RE, () => head).replace(BODY_MARK, () => html)
    const file = outFileFor(page.path)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, out)
    console.log(`[prerender] ${page.path.padEnd(48)} -> ${path.relative(root, file)}`)
  } catch (err) {
    failures++
    console.error(`[prerender] FAILED ${page.path}:`, err instanceof Error ? err.stack : err)
  }
}

if (failures) {
  console.error(`[prerender] ${failures} page(s) failed.`)
  process.exit(1)
}
console.log(`[prerender] Wrote ${pages.length} pages.`)
