import { Link, useParams } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl } from '../business'
import { getLocation, type Location } from '../locations'
import { getService, type Service } from '../services'
import Breadcrumbs from '../components/Breadcrumbs'
import ContentSections from '../components/ContentSections'
import FaqSection from '../components/FaqSection'
import NapBlock from '../components/NapBlock'
import {
  breadcrumbSchema,
  compact,
  faqSchema,
  orgRef,
  pageTitle,
  webPageSchema,
  type Crumb,
} from '../components/schema'
import NotFound from './NotFound'

function LocationDetail({ loc }: { loc: Location }) {
  const path = `/locations/${loc.slug}`
  const title = pageTitle(loc.title)
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: loc.displayName, path },
  ]
  const intro = loc.intro.length > 0 ? loc.intro : [loc.description]
  const relevant = loc.serviceSlugs
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined)
  const isHome = loc.name === business.address.addressLocality

  const jsonLd = compact([
    webPageSchema({
      path,
      name: title,
      description: loc.description,
      extra: {
        about: orgRef,
        spatialCoverage: { '@type': 'City', name: loc.displayName },
        dateModified: loc.updated,
        ...(relevant.length > 0
          ? { mentions: relevant.map((s) => ({ '@id': `${absoluteUrl(`/services/${s.slug}`)}#service` })) }
          : {}),
      },
    }),
    faqSchema(loc.faqs, path),
    breadcrumbSchema(crumbs),
  ])

  return (
    <main id="main" className="section">
      <Seo title={title} description={loc.description} path={path} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <span className="eyebrow">{loc.displayName}</span>
        <h1 className="display text-gradient">{loc.heading}</h1>
        {intro.map((p, i) => (
          <p className={i === 0 ? 'subhead' : 'subhead subhead-more'} key={i}>{p}</p>
        ))}

        <div className="content-grid">
          <div className="stack">
            <ContentSections sections={loc.sections} />

            {relevant.length > 0 && (
              <section className="callout prose" aria-labelledby="loc-services-title">
                <h2 id="loc-services-title">Services for {loc.name} businesses</h2>
                <ul>
                  {relevant.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`}>{s.name}</Link>: {s.summary}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {loc.neighborhoods.length > 0 && (
              <section className="callout prose" aria-labelledby="loc-areas-title">
                <h2 id="loc-areas-title">Areas we cover {isHome ? `around ${loc.name}` : `in and around ${loc.name}`}</h2>
                <ul className="badges plain-list">
                  {loc.neighborhoods.map((n) => <li className="badge" key={n}>{n}</li>)}
                </ul>
              </section>
            )}
          </div>

          <aside className="callout sidebar" aria-labelledby="loc-contact-title">
            <h2 id="loc-contact-title" className="sidebar-title">
              Our {business.primaryCity} studio
            </h2>
            <NapBlock />
            <div className="btns" style={{ marginTop: 14 }}>
              <Link className="btn btn-primary" to="/contact">Start a project</Link>
            </div>
          </aside>
        </div>

        <FaqSection faqs={loc.faqs} />
      </div>
    </main>
  )
}

/** /locations/:slug — known service area or 404. */
export default function LocationPage() {
  const { slug = '' } = useParams()
  const loc = getLocation(slug)
  return loc ? <LocationDetail loc={loc} /> : <NotFound />
}
