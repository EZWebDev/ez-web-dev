/**
 * SSR entry used only at build time (vite build --ssr). scripts/prerender.mjs imports the
 * built module, renders every route from getSiteIndex() and writes static HTML to dist/.
 */
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { absoluteUrl } from './business'
import { HeadProvider } from './seo'
import { createHeadStore, renderHeadTags } from './head'

export { getSiteIndex } from './siteIndex'
export { business, absoluteUrl, ORG_ID, FOUNDER_ID, WEBSITE_ID } from './business'
export { retiredServiceRedirects } from './services'
export { blogPosts } from './blogPosts'

const routes = [{ path: '*', element: <App /> }]

export type RenderResult = { html: string; head: string; status: number }

export async function render(path: string): Promise<RenderResult> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(absoluteUrl(path)))
  if (context instanceof Response) {
    throw new Error(`Route ${path} returned a Response (status ${context.status}); redirects are not prerendered`)
  }
  const router = createStaticRouter(handler.dataRoutes, context)
  const store = createHeadStore()

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HeadProvider store={store}>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </HeadProvider>
    </StrictMode>,
  )
  // prerender* (unlike renderToString) waits for every Suspense boundary / lazy component.
  const decoder = new TextDecoder()
  let html = ''
  for await (const chunk of prelude as unknown as AsyncIterable<Uint8Array | string>) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  }
  html += decoder.decode()

  return { html, head: renderHeadTags([...store.page, ...store.global]), status: context.statusCode }
}
