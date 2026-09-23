import { Link } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl } from '../business'
import { services } from '../services'
import Breadcrumbs from '../components/Breadcrumbs'
import ServiceAreaLine from '../components/ServiceAreaLine'
import { breadcrumbSchema, orgRef, pageTitle, webPageSchema, type Crumb } from '../components/schema'

const PATH = '/services'
const TITLE = pageTitle('Web Design & SEO Services')
const DESCRIPTION = `Services from ${business.name} in ${business.primaryCity}, FL: custom web design, monthly SEO, AI search visibility, CRO, and Google and Meta ads.`

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: PATH },
]

export default function ServicesHub() {
  const jsonLd = [
    webPageSchema({
      type: 'CollectionPage',
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      extra: {
        about: orgRef,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.name,
            url: absoluteUrl(`/services/${s.slug}`),
          })),
        },
      },
    }),
    breadcrumbSchema(crumbs),
  ]

  return (
    <main id="main" className="section">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <h1 className="display text-gradient">Services</h1>
        <p className="subhead">
          Websites, and the work that brings them customers: SEO, AI search visibility, conversion fixes, and Google and Meta ads.{' '}
          {business.name} works with small businesses, professional services firms and e-commerce brands, and founder{' '}
          {business.founder.name} runs every project.
        </p>
        <div className="cards">
          {services.map((s) => (
            <Link className="card" key={s.slug} to={`/services/${s.slug}`}>
              <div className="card-eyebrow">{s.eyebrow}</div>
              <h2 className="card-title">{s.name}</h2>
              <div className="card-text">{s.summary}</div>
            </Link>
          ))}
        </div>
        <ServiceAreaLine />
        <div className="btns" style={{ marginTop: 18 }}>
          <Link className="btn btn-primary" to="/contact">Start a project</Link>
        </div>
      </div>
    </main>
  )
}
