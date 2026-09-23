import { Link, Navigate, useParams } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl } from '../business'
import { getService, retiredServiceRedirects, services, type Service } from '../services'
import Breadcrumbs from '../components/Breadcrumbs'
import ContentSections from '../components/ContentSections'
import FaqSection from '../components/FaqSection'
import ServiceAreaLine from '../components/ServiceAreaLine'
import {
  areaServedSchema,
  breadcrumbSchema,
  compact,
  faqSchema,
  orgRef,
  pageTitle,
  webPageSchema,
  type Crumb,
} from '../components/schema'
import NotFound from './NotFound'

function relatedServices(svc: Service): Service[] {
  const fromData = (svc.related ?? [])
    .map((slug) => getService(slug))
    .filter((s): s is Service => s !== undefined && s.slug !== svc.slug)
  if (fromData.length > 0) return fromData
  return services.filter((s) => s.slug !== svc.slug).slice(0, 3)
}

function ServiceDetail({ svc }: { svc: Service }) {
  const path = `/services/${svc.slug}`
  const url = absoluteUrl(path)
  const title = pageTitle(svc.title)
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: svc.name, path },
  ]
  const intro = svc.intro.length > 0 ? svc.intro : [svc.description]
  const related = relatedServices(svc)

  const jsonLd = compact([
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: svc.name,
      serviceType: svc.serviceType,
      description: svc.description,
      url,
      provider: orgRef,
      areaServed: areaServedSchema(),
    },
    webPageSchema({
      path,
      name: title,
      description: svc.description,
      extra: { about: { '@id': `${url}#service` }, dateModified: svc.updated },
    }),
    faqSchema(svc.faqs, path),
    breadcrumbSchema(crumbs),
  ])

  return (
    <main id="main" className="section">
      <Seo title={title} description={svc.description} path={path} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <span className="eyebrow">{svc.eyebrow}</span>
        <h1 className="display text-gradient">{svc.name}</h1>
        {intro.map((p, i) => (
          <p className={i === 0 ? 'subhead' : 'subhead subhead-more'} key={i}>{p}</p>
        ))}
        <ServiceAreaLine />

        <div className={svc.sections.length > 0 ? 'content-grid' : 'content-grid solo'}>
          {svc.sections.length > 0 && (
            <div className="stack">
              <ContentSections sections={svc.sections} />
            </div>
          )}

          <aside className="callout sidebar" aria-labelledby="deliverables-title">
            <h2 id="deliverables-title" className="sidebar-title">What you get</h2>
            {svc.deliverables.length > 0 && (
              <ul className="list plain-list">
                {svc.deliverables.map((d) => (
                  <li className="item" key={d}><span className="icon" aria-hidden="true">✓</span><span>{d}</span></li>
                ))}
              </ul>
            )}
            <p className="sidebar-note">
              Talk to {business.founder.name}: <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
            </p>
            <div className="btns">
              <Link className="btn btn-primary" to="/contact">Start a project</Link>
            </div>
          </aside>
        </div>

        <FaqSection faqs={svc.faqs} />

        {related.length > 0 && (
          <section className="page-block" aria-labelledby="related-title">
            <h2 id="related-title" className="section-title">Related services</h2>
            <div className="cards">
              {related.map((r) => (
                <Link className="card" key={r.slug} to={`/services/${r.slug}`}>
                  <div className="card-eyebrow">{r.eyebrow}</div>
                  <div className="card-title">{r.name}</div>
                  <div className="card-text">{r.summary}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="callout page-block cta" aria-labelledby="cta-title">
          <h2 id="cta-title">Talk to us about {svc.name}</h2>
          <p>
            Call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>, email{' '}
            <a href={`mailto:${business.email}`}>{business.email}</a>, or send us a few details about your project.
          </p>
          <div className="btns">
            <Link className="btn btn-primary" to="/contact">Contact {business.name}</Link>
          </div>
        </section>
      </div>
    </main>
  )
}

/** /services/:slug — live service, retired slug (client redirect; the host also 301s), or 404. */
export default function ServicePage() {
  const { slug = '' } = useParams()
  const svc = getService(slug)
  if (svc) return <ServiceDetail svc={svc} />
  const redirect = retiredServiceRedirects[`/services/${slug}`]
  if (redirect) return <Navigate to={redirect} replace />
  return <NotFound />
}
