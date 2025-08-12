import { useEffect } from 'react'

const getBaseUrl = () => (import.meta as any).env?.VITE_SITE_URL || window.location.origin

const setTag = (tagName: string, attrs: Record<string, string>, id: string) => {
  let el = document.head.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null
  if (!el) {
    el = document.createElement(tagName)
    el.id = id
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v)
  }
}

const removeTag = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.remove()
}

export type SeoProps = {
  title: string
  description?: string
  path?: string
  image?: string
  robots?: string
  jsonLd?: object | object[]
}

export function useGlobalSchemas() {
  useEffect(() => {
    const baseUrl = getBaseUrl()
    const org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'EZ Web Development LLC',
      url: baseUrl,
      sameAs: [
      ],
    }
    const website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EZ Web',
      url: baseUrl,
    }
    const id = 'seo:ld:global'
    setTag('script', { type: 'application/ld+json' }, id)
    const el = document.getElementById(id) as HTMLScriptElement
    el.text = JSON.stringify([org, website])
    return () => removeTag(id)
  }, [])
}

export default function Seo({ title, description, path = '', image, robots = 'index,follow', jsonLd }: SeoProps) {
  useEffect(() => {
    const baseUrl = getBaseUrl()
    const url = new URL(path || window.location.pathname, baseUrl).toString()
    document.title = title

    // Meta description
    if (description) setTag('meta', { name: 'description', content: description }, 'seo:description')

    // Canonical
    setTag('link', { rel: 'canonical', href: url }, 'seo:canonical')

    // Robots
    setTag('meta', { name: 'robots', content: robots }, 'seo:robots')

    // OpenGraph
    setTag('meta', { property: 'og:title', content: title }, 'seo:og:title')
    if (description) setTag('meta', { property: 'og:description', content: description }, 'seo:og:description')
    setTag('meta', { property: 'og:url', content: url }, 'seo:og:url')
    setTag('meta', { property: 'og:type', content: 'website' }, 'seo:og:type')
    if (image) setTag('meta', { property: 'og:image', content: image }, 'seo:og:image')

    // Twitter
    setTag('meta', { name: 'twitter:card', content: 'summary_large_image' }, 'seo:tw:card')
    setTag('meta', { name: 'twitter:title', content: title }, 'seo:tw:title')
    if (description) setTag('meta', { name: 'twitter:description', content: description }, 'seo:tw:description')
    if (image) setTag('meta', { name: 'twitter:image', content: image }, 'seo:tw:image')

    // JSON-LD
    const id = 'seo:ld:page'
    if (jsonLd) {
      setTag('script', { type: 'application/ld+json' }, id)
      const el = document.getElementById(id) as HTMLScriptElement
      el.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    } else {
      removeTag(id)
    }

    return () => {
      // leave canonical and others to be overwritten by next route
    }
  }, [title, description, path, image, robots, JSON.stringify(jsonLd)])

  return null
}