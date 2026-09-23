import { Link } from 'react-router-dom'
import Seo from '../seo'
import { business } from '../business'
import { services } from '../services'
import { locations } from '../locations'
import { pageTitle } from '../components/schema'

export default function NotFound() {
  return (
    <main id="main" className="section">
      <Seo
        title={pageTitle('Page not found')}
        description={`The page you requested does not exist on ${business.domain}.`}
        path="/404"
        robots="noindex,follow"
      />
      <div className="container">
        <span className="eyebrow">404</span>
        <h1 className="display text-gradient">Page not found</h1>
        <p className="subhead">
          That page does not exist or has moved. Try one of these instead.
        </p>
        <div className="two-col">
          <nav className="callout prose" aria-label="Services">
            <h2>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </nav>
          <nav className="callout prose" aria-label="Site">
            <h2>Everything else</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About {business.name}</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {locations.map((l) => (
                <li key={l.slug}><Link to={`/locations/${l.slug}`}>{l.displayName}</Link></li>
              ))}
            </ul>
            <p>
              Or call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a> / email{' '}
              <a href={`mailto:${business.email}`}>{business.email}</a>.
            </p>
          </nav>
        </div>
      </div>
    </main>
  )
}
