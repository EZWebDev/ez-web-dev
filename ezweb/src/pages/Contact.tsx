import type { FormEvent } from 'react'
import Seo from '../seo'
import { business } from '../business'
import Breadcrumbs from '../components/Breadcrumbs'
import NapBlock from '../components/NapBlock'
import { breadcrumbSchema, orgRef, pageTitle, webPageSchema, type Crumb } from '../components/schema'

const PATH = '/contact'
const TITLE = pageTitle(`Contact Us in ${business.primaryCity}, ${business.address.addressRegion}`)
const DESCRIPTION = `Contact ${business.name}: ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion}. Call ${business.phoneDisplay} or email ${business.email}.`

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: PATH },
]

/** Builds a mailto: link from the form and hands it to the visitor's email app. No data leaves the browser otherwise. */
function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
  const data = new FormData(e.currentTarget)
  const get = (k: string) => String(data.get(k) ?? '').trim()
  const name = get('name')
  const company = get('company')
  const subject = `Project inquiry from ${name || 'website visitor'}${company ? ` (${company})` : ''}`
  const website = get('website')
  const lines = [`Name: ${name}`, `Email: ${get('email')}`]
  if (company) lines.push(`Company: ${company}`)
  if (website) lines.push(`Website: ${website}`)
  lines.push('', get('message'))
  const body = lines.join('\n')
  window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const jsonLd = [
    webPageSchema({
      type: 'ContactPage',
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      extra: { about: orgRef, mainEntity: orgRef },
    }),
    breadcrumbSchema(crumbs),
  ]

  return (
    <main id="main" className="section">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <h1 className="display text-gradient">Contact {business.name}</h1>
        <p className="subhead">
          Call, email or send a message. Everything comes straight to founder {business.founder.name}.
        </p>

        <div className="contact-grid">
          <aside className="callout contact-card" aria-labelledby="nap-title">
            <h2 id="nap-title" className="sidebar-title">Reach us directly</h2>
            <NapBlock />
            <div className="btns" style={{ marginTop: 14 }}>
              <a className="btn btn-primary" href={`tel:${business.phone}`}>Call {business.phoneDisplay}</a>
              <a className="btn" href={`mailto:${business.email}`}>Email us</a>
            </div>
          </aside>

          <section className="callout" aria-labelledby="form-title">
            <h2 id="form-title">Send a message</h2>
            <form className="form-grid" onSubmit={handleSubmit}>
              <div>
                <label className="label" htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" className="input" autoComplete="name" placeholder="Your name" required />
              </div>
              <div>
                <label className="label" htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" className="input" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div>
                <label className="label" htmlFor="cf-company">Company</label>
                <input id="cf-company" name="company" className="input" autoComplete="organization" placeholder="Company name" />
              </div>
              <div>
                <label className="label" htmlFor="cf-website">Website</label>
                <input id="cf-website" name="website" className="input" inputMode="url" placeholder="https://" />
              </div>
              <div className="full">
                <label className="label" htmlFor="cf-message">How can we help?</label>
                <textarea id="cf-message" name="message" className="input" rows={6} placeholder="Briefly describe your project and goals" required />
              </div>
              <div className="full">
                <button className="btn btn-primary" type="submit" aria-describedby="cf-note">Open email to send</button>
                <p className="note" id="cf-note">
                  This opens your email app with your message addressed to {business.email}. Nothing is sent until you
                  press send there.
                </p>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}
