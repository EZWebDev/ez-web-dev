import { useState, type FormEvent } from 'react'
import Seo from '../seo'
import { business } from '../business'
import { services } from '../services'
import Breadcrumbs from '../components/Breadcrumbs'
import NapBlock from '../components/NapBlock'
import { breadcrumbSchema, orgRef, pageTitle, webPageSchema, type Crumb } from '../components/schema'

const PATH = '/contact'
const TITLE = pageTitle(`Contact Us in ${business.primaryCity}, ${business.address.addressRegion}`)
const DESCRIPTION = `Contact ${business.name}: ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion}. Call ${business.phoneDisplay} or email ${business.email}.`

/** Netlify Forms: the form is registered by public/__forms.html and submissions are POSTed there. */
const FORM_NAME = 'contact'
const FORM_ENDPOINT = '/__forms.html'

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: PATH },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('form-name', FORM_NAME)
    data.set('page', window.location.pathname)
    const body = new URLSearchParams()
    data.forEach((value, key) => body.append(key, String(value)))
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

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
            {status === 'sent' ? (
              <div className="form-status form-status-ok" role="status">
                <p><strong>Thanks, your message is in.</strong> {business.founder.givenName} reads every message and will reply by email.</p>
                <p>Need an answer now? Call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>.</p>
                <button className="btn" type="button" onClick={() => setStatus('idle')}>Send another message</button>
              </div>
            ) : (
              <form
                className="form-grid"
                name={FORM_NAME}
                method="POST"
                action={FORM_ENDPOINT}
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p className="visually-hidden" aria-hidden="true">
                  <label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
                </p>
                <div>
                  <label className="label" htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" className="input" autoComplete="name" required />
                </div>
                <div>
                  <label className="label" htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" className="input" autoComplete="email" required />
                </div>
                <div>
                  <label className="label" htmlFor="cf-phone">Phone <span className="optional">(optional)</span></label>
                  <input id="cf-phone" name="phone" type="tel" className="input" autoComplete="tel" />
                </div>
                <div>
                  <label className="label" htmlFor="cf-company">Company <span className="optional">(optional)</span></label>
                  <input id="cf-company" name="company" className="input" autoComplete="organization" />
                </div>
                <div>
                  <label className="label" htmlFor="cf-website">Current website <span className="optional">(optional)</span></label>
                  <input id="cf-website" name="website" className="input" inputMode="url" placeholder="https://" />
                </div>
                <div>
                  <label className="label" htmlFor="cf-service">What do you need?</label>
                  <select id="cf-service" name="service" className="input" defaultValue="">
                    <option value="">Not sure yet</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="full">
                  <label className="label" htmlFor="cf-message">Tell us about the project</label>
                  <textarea id="cf-message" name="message" className="input" rows={6} required />
                </div>
                <div className="full">
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  {status === 'error' && (
                    <p className="form-status form-status-error" role="alert">
                      Your message didn't go through. Please call <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a> or
                      email <a href={`mailto:${business.email}`}>{business.email}</a>.
                    </p>
                  )}
                </div>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
