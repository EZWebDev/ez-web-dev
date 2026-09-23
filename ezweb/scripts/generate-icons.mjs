#!/usr/bin/env node
/**
 * One-off generator for the favicon, touch icon, schema logo and default social image.
 * Run manually (`npm run icons`) when the brand changes; the outputs in public/ are
 * committed, so this is NOT part of the build.
 *
 * Colors follow src/styles.css (--bg-start #3b1e77, --bg-end #a16bfe, --accent #8b5cf6,
 * --bg-accent #c084fc). The "EZ" monogram is drawn as paths so it renders identically
 * everywhere without depending on installed fonts.
 */
import fs from 'node:fs'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const pub = path.resolve(process.cwd(), 'public')

// "EZ" monogram on a 64x64 grid.
const MONOGRAM = [
  // E
  'M14 18h17v6H20v5h10v6H20v5h11v6H14z',
  // Z
  'M34 18h17v6l-10.5 16H51v6H34v-6l10.5-16H34z',
].join(' ')

const markSvg = (size, { radius = 14, padding = 0 } = {}) => {
  const inner = 64 - padding * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#c084fc"/>
    </linearGradient>
  </defs>
  <rect x="${padding}" y="${padding}" width="${inner}" height="${inner}" rx="${radius}" fill="url(#g)"/>
  <path d="${MONOGRAM}" fill="#ffffff"/>
</svg>
`
}

const ogSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b1e77"/>
      <stop offset="1" stop-color="#a16bfe"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#c084fc"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(96 110) scale(2.5)">
    <rect width="64" height="64" rx="14" fill="url(#mark)"/>
    <path d="${MONOGRAM}" fill="#ffffff"/>
  </g>
  <text x="96" y="378" font-family="Liberation Sans, DejaVu Sans, Arial, Helvetica, sans-serif" font-size="78" font-weight="700" fill="#ffffff">EZ Web Development LLC</text>
  <text x="96" y="450" font-family="Liberation Sans, DejaVu Sans, Arial, Helvetica, sans-serif" font-size="40" fill="#efe7ff">Web development &amp; SEO · Hollywood, FL</text>
  <rect x="96" y="500" width="220" height="4" rx="2" fill="#c084fc"/>
  <text x="96" y="560" font-family="Liberation Sans, DejaVu Sans, Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">ezweb.dev</text>
</svg>
`

const png = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Liberation Sans' },
  })
    .render()
    .asPng()

fs.writeFileSync(path.join(pub, 'favicon.svg'), markSvg(64))
// Touch icon: full-bleed square (iOS applies its own rounding).
fs.writeFileSync(path.join(pub, 'apple-touch-icon.png'), png(markSvg(180, { radius: 0 }), 180))
fs.writeFileSync(path.join(pub, 'logo.png'), png(markSvg(512), 512))
fs.writeFileSync(path.join(pub, 'og-image.png'), png(ogSvg(), 1200))
console.log('Wrote public/favicon.svg, apple-touch-icon.png (180), logo.png (512), og-image.png (1200x630)')
