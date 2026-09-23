import { Link } from 'react-router-dom'
import Seo from '../seo'
import { business, fullAddressLine } from '../business'
import { services } from '../services'
import { locations } from '../locations'
import FaqSection from '../components/FaqSection'
import {
  compact,
  faqSchema,
  foundingYear,
  joinList,
  orgRef,
  pageTitle,
  webPageSchema,
  type FaqItem,
} from '../components/schema'

const PATH = '/'
const TITLE = pageTitle(`Web Development & SEO in ${business.primaryCity}, ${business.address.addressRegion}`)
const DESCRIPTION = `${business.name} is a web development and SEO agency in ${business.primaryCity}, ${business.primaryRegion}. Custom websites, SEO, AI-search visibility and Google and Meta ads.`

const facts = [
  { value: `Founded ${foundingYear}`, label: 'Florida LLC' },
  { value: `${business.primaryCity}, ${business.address.addressRegion}`, label: 'Where we are based' },
  { value: 'Founder-led', label: `Work directly with ${business.founder.name}` },
  { value: `${business.metro} & nationwide`, label: 'Who we serve' },
]

const stack = ['WordPress', 'React & Vite', 'Shopify', 'Technical SEO', 'Google & Meta ads', 'AI search visibility']

const faqs: FaqItem[] = [
  {
    q: `Who is ${business.name}?`,
    a: business.description,
  },
  {
    q: `Where is ${business.name} located?`,
    a: `We are based in ${fullAddressLine}. We work remotely with businesses in ${joinList(locations.map((l) => l.name))} and across ${business.metro}, and with clients in other states.`,
  },
  {
    q: `What does ${business.name} do?`,
    a: `${joinList(services.map((s) => s.name))}.`,
  },
  {
    q: 'Who do you work with?',
    a: `Small businesses, professional services firms and e-commerce brands in ${business.metro} and nationwide. We also run white-label Google and Meta ads management for other agencies. Every project is led by founder ${business.founder.name}.`,
  },
  {
    q: 'How do I start a project?',
    a: `Call ${business.phoneDisplay}, email ${business.email}, or send a message through the contact page at ${business.domain}/contact. Hours are ${business.hoursDisplay.replace(' · ', ', ')}.`,
  },
]

export default function Home() {
  const jsonLd = compact([
    webPageSchema({
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      extra: { about: orgRef, mainEntity: orgRef },
    }),
    faqSchema(faqs, PATH),
  ])

  return (
    <main id="main">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />

      <div className="hero">
        <div className="container hero-inner">
          <div>
            <span className="eyebrow">{business.name} · {business.primaryCity}, {business.address.addressRegion}</span>
            <h1 className="display text-gradient">
              Web development and SEO agency in {business.primaryCity}, {business.primaryRegion}
            </h1>
            <p className="subhead">{business.description}</p>
            <div className="btns">
              <Link className="btn btn-primary" to="/contact">Start a project</Link>
              <a className="btn" href={`tel:${business.phone}`}>Call {business.phoneDisplay}</a>
            </div>
          </div>
          <aside className="hero-card" aria-label="Company facts">
            <dl className="kpis facts">
              {facts.map((f) => (
                <div className="kpi" key={f.value}>
                  <dt className="label">{f.label}</dt>
                  <dd className="num">{f.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="badges plain-list" aria-label="Platforms and disciplines">
              {stack.map((s) => <li className="badge" key={s}>{s}</li>)}
            </ul>
          </aside>
        </div>
      </div>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <h2 id="services-title" className="section-title">What we do</h2>
          <p className="section-subtitle">
            Each service page lists what is included and how the work runs. Founder {business.founder.name} scopes and runs every project himself.
          </p>
          <div className="cards">
            {services.map((s) => (
              <Link className="card" key={s.slug} to={`/services/${s.slug}`}>
                <div className="card-eyebrow">{s.eyebrow}</div>
                <div className="card-title">{s.name}</div>
                <div className="card-text">{s.summary}</div>
              </Link>
            ))}
          </div>
          <div className="btns" style={{ marginTop: 18 }}>
            <Link className="btn" to="/services">All services</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className="container">
          <h2 id="where-title" className="section-title">Where we work</h2>
          <p className="section-subtitle">
            Based in {fullAddressLine}, between Fort Lauderdale and Miami. Projects run by phone, email and video call,
            and local clients can meet at our office by appointment.
          </p>
          <div className="cards">
            {locations.map((l) => (
              <Link className="card" key={l.slug} to={`/locations/${l.slug}`}>
                <div className="card-eyebrow">{l.displayName}</div>
                <div className="card-title">{l.name}</div>
                <div className="card-text">{l.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container two-col">
          <div className="callout">
            <h2 id="how-title">Founder-led, start to finish</h2>
            <p>
              You work directly with {business.founder.name}, who founded {business.name} in {foundingYear}. The person
              scoping your project is the person designing, building and optimizing it.
            </p>
            <div className="btns">
              <Link className="btn" to="/about">About us</Link>
            </div>
          </div>
          <div className="callout">
            <h2>Talk to us</h2>
            <p>
              Call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a> or email{' '}
              <a href={`mailto:${business.email}`}>{business.email}</a>. {business.hoursDisplay}.
            </p>
            <div className="btns">
              <Link className="btn btn-primary" to="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container">
          <FaqSection faqs={faqs} />
        </div>
      </div>
    </main>
  )
}
