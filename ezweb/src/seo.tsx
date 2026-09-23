/**
 * Head management that works both at build time (SSR prerender) and in the browser.
 *
 * - During SSR, <HeadProvider store={...}> collects the tags produced by <Seo/> and
 *   useGlobalSchemas(); entry-server.tsx serializes them into the static <head>.
 * - In the browser, the same tag list is applied to document.head. Every managed tag
 *   carries a stable id (e.g. "seo:canonical"), so the tags already present in the
 *   prerendered HTML are reused on hydration instead of duplicated.
 *
 * The tag builders themselves live in ./head.ts.
 */
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { buildGlobalTags, buildPageTags, PAGE_TAG_IDS, type HeadStore, type HeadTag, type SeoProps } from './head'

export type { SeoProps } from './head'

const HeadContext = createContext<HeadStore | null>(null)

export function HeadProvider({ store, children }: { store: HeadStore; children: ReactNode }) {
  return <HeadContext.Provider value={store}>{children}</HeadContext.Provider>
}

// ---------------------------------------------------------------------------
// DOM application (browser)
// ---------------------------------------------------------------------------

const applyTag = (t: HeadTag) => {
  if (t.tag === 'title') {
    document.title = t.text ?? ''
    return
  }
  let el = document.getElementById(t.id)
  if (!el || el.tagName.toLowerCase() !== t.tag) {
    el?.remove()
    el = document.createElement(t.tag)
    el.id = t.id
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(t.attrs)) {
    if (el.getAttribute(k) !== v) el.setAttribute(k, v)
  }
  if (t.tag === 'script' && el.textContent !== (t.text ?? '')) el.textContent = t.text ?? ''
}

const removeTag = (id: string) => document.getElementById(id)?.remove()

/** Emits the site-wide JSON-LD @graph. Call once, from the layout. */
// eslint-disable-next-line react-refresh/only-export-components -- public API kept in this module
export function useGlobalSchemas() {
  const store = useContext(HeadContext)
  if (store && typeof document === 'undefined') store.global = buildGlobalTags()

  useEffect(() => {
    buildGlobalTags().forEach(applyTag)
  }, [])
}

export default function Seo(rawProps: SeoProps) {
  const { pathname } = useLocation()
  // Without an explicit path, fall back to the router location (never window.location).
  const props = { ...rawProps, path: rawProps.path || pathname }
  const store = useContext(HeadContext)
  if (store && typeof document === 'undefined') store.page = buildPageTags(props)

  const { title, description, path, image, robots, jsonLd, type, publishedTime, modifiedTime } = props
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    const tags = buildPageTags({
      title,
      description,
      path,
      image,
      robots,
      jsonLd: jsonLdKey ? (JSON.parse(jsonLdKey) as object | object[]) : undefined,
      type,
      publishedTime,
      modifiedTime,
    })
    const keep = new Set(tags.map((t) => t.id))
    PAGE_TAG_IDS.filter((id) => !keep.has(id)).forEach(removeTag)
    tags.forEach(applyTag)
  }, [title, description, path, image, robots, jsonLdKey, type, publishedTime, modifiedTime])

  return null
}
