import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ServicesHub from './pages/ServicesHub'
import ServicePage from './pages/ServicePage'
import LocationPage from './pages/LocationPage'
import Contact from './pages/Contact'
import BlogHub from './pages/BlogHub'
import BlogPostPage from './pages/BlogPostPage'
import NotFound from './pages/NotFound'

/**
 * Route table. Rendered by createBrowserRouter in the browser and by StaticRouter
 * during prerendering, so nothing here may touch window/document during render.
 *
 * Dynamic segments resolve against src/services.tsx, src/locations.ts and
 * src/blogPosts.tsx; unknown slugs render <NotFound/> and retired service slugs
 * redirect (see retiredServiceRedirects). src/siteIndex.ts enumerates the same URLs.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<ServicesHub />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="locations/:slug" element={<LocationPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogHub />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
