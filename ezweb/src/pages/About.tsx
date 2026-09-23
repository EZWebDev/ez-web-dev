import { Link } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl } from '../business'
import { services } from '../services'
import { locations } from '../locations'
import Breadcrumbs from '../components/Breadcrumbs'
import NapBlock from '../components/NapBlock'
import {
  breadcrumbSchema,
  formatDate,
  founderRef,
  foundingYear,
  joinList,
  notAffiliatedList,
  orgRef,
  pageTitle,
  webPageSchema,
  type Crumb,
  type JsonLd,
} from '../components/schema'

const PATH = '/about'
const TITLE = pageTitle(`About ${business.name}`)
const DESCRIPTION = `${business.name} is a Florida LLC founded in ${foundingYear} by ${business.founder.name} and based in ${business.primaryCity}, FL. Web development, SEO and AI-search visibility.`

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: PATH },
]

const founderSkills = [
  'WordPress',
  'Custom React / Vite builds',
  'Shopify',
  'Technical SEO',
  'Google Ads',
  'Meta ads',
  'AI search visibility',
]

export default function About() {
  const founderPerson: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...founderRef,
    name: business.founder.name,
    givenName: business.founder.givenName,
    familyName: business.founder.familyName,
    jobTitle: `${business.founder.jobTitle}, ${business.name}`,
    worksFor: orgRef,
    url: absoluteUrl(PATH),
    mainEntityOfPage: absoluteUrl(PATH),
    knowsAbout: founderSkills,
    ...(business.founder.sameAs.length ? { sameAs: [...business.founder.sameAs] } : {}),
  }

  const jsonLd: JsonLd[] = [
    webPageSchema({
      type: 'AboutPage',
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      extra: { mainEntity: orgRef, about: [orgRef, founderRef] },
    }),
    founderPerson,
    breadcrumbSchema(crumbs),
  ]

  const others = notAffiliatedList()

  return (
    <main id="main" className="section">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <span className="eyebrow">Founded {foundingYear} · {business.primaryCity}, {business.address.addressRegion}</span>
        <h1 className="display text-gradient">About {business.name}</h1>
        <p className="subhead">{business.description}</p>

        <div className="content-grid">
          <div className="stack">
            <section id="founder" className="callout prose" aria-labelledby="founder-title">
              <h2 id="founder-title">Founder: {business.founder.name}</h2>
              <p>
                {business.founder.name} is the {business.founder.jobTitle.toLowerCase()} of {business.name}, a Florida
                limited liability company formed on {formatDate(business.foundingDate)} and based in{' '}
                {business.primaryCity}, Florida.
              </p>
              <p>
                Ezra works hands-on across every project: WordPress sites, custom React and Vite builds, Shopify
                stores, technical SEO, Google and Meta ads, and AI search visibility. When you hire {business.name}, he is the
                person you talk to and the person doing the work.
              </p>
              <ul className="badges plain-list" aria-label={`${business.founder.name}'s areas of work`}>
                {founderSkills.map((s) => <li className="badge" key={s}>{s}</li>)}
              </ul>
              <p>
                Contact Ezra directly at <a href={`mailto:${business.founder.email}`}>{business.founder.email}</a>.
              </p>
            </section>

            <section className="callout prose" aria-labelledby="what-title">
              <h2 id="what-title">What we do</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}>{s.name}</Link>: {s.summary}
                  </li>
                ))}
              </ul>
            </section>

            <section className="callout prose" aria-labelledby="where-title">
              <h2 id="where-title">Where we work</h2>
              <p>
                We are based in downtown {business.primaryCity} and work with clients in{' '}
                {locations.map((l, i) => (
                  <span key={l.slug}>
                    {i > 0 && ', '}
                    <Link to={`/locations/${l.slug}`}>{l.name}</Link>
                  </span>
                ))}{' '}
                and elsewhere in {business.metro}, and in other states. Every stage, from the first call to launch, happens
                over phone, email or video.
              </p>
            </section>

            <section className="callout prose" aria-labelledby="disambiguation-title">
              <h2 id="disambiguation-title">Not to be confused with</h2>
              <p>
                Several unrelated businesses have similar names. {business.name} ({business.domain}) is not affiliated
                with {joinList(others, 'or')}. We are a separate company based in {business.primaryCity}, Florida.
              </p>
            </section>
          </div>

          <aside className="callout sidebar" aria-label="Company details">
            <h2 className="sidebar-title">Company details</h2>
            <dl className="details-list">
              <div><dt>Legal name</dt><dd>{business.legalName}</dd></div>
              <div><dt>Entity type</dt><dd>Florida limited liability company</dd></div>
              <div><dt>Florida document no.</dt><dd>{business.floridaDocumentNumber}</dd></div>
              <div><dt>Founded</dt><dd>{formatDate(business.foundingDate)}</dd></div>
              <div><dt>Founder</dt><dd>{business.founder.name}</dd></div>
              <div><dt>Website</dt><dd>{business.domain}</dd></div>
            </dl>
            <NapBlock showName={false} />
            <div className="btns" style={{ marginTop: 14 }}>
              <Link className="btn btn-primary" to="/contact">Contact us</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
