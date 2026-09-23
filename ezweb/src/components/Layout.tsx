import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useGlobalSchemas } from '../seo'
import { business } from '../business'
import { services } from '../services'
import { locations } from '../locations'
import NapBlock from './NapBlock'
import { foundingYear, profileLinks } from './schema'

const NAV_ID = 'site-nav'

function Header() {
  const { pathname } = useLocation()
  // The menu is "open" only for the path it was opened on, so any navigation closes it
  // without a state update inside an effect.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const close = () => setOpenOn(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenOn(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" to="/" aria-label={`${business.name} home`} onClick={close}>
          <span className="logo-mark" aria-hidden="true">EZ</span>
          <span>{business.shortName}</span>
        </Link>
        <button
          type="button"
          className="btn mobile-toggle"
          aria-expanded={open}
          aria-controls={NAV_ID}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id={NAV_ID} className={clsx('nav-links', open && 'open')} aria-label="Primary">
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/services" onClick={close}>Services</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/blog" onClick={close}>Blog</NavLink>
          <NavLink className="btn btn-primary" to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link className="logo" to="/">
            <span className="logo-mark" aria-hidden="true">EZ</span>
            <span>{business.name}</span>
          </Link>
          <p className="footer-tagline">
            Web development and SEO studio in {business.primaryCity}, {business.primaryRegion}.
          </p>
          <NapBlock />
        </div>

        <nav aria-label="Services">
          <strong>Services</strong>
          <ul className="footer-list">
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Locations and company">
          <strong>Service areas</strong>
          <ul className="footer-list">
            {locations.map((l) => (
              <li key={l.slug}><Link to={`/locations/${l.slug}`}>{l.displayName}</Link></li>
            ))}
          </ul>
          <strong className="footer-subhead">Company</strong>
          <ul className="footer-list">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <strong>Find us</strong>
          <ul className="footer-list">
            {profileLinks().map((p) => (
              <li key={p.url}><a href={p.url} rel="me noopener">{p.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-legal">
        <small>
          © {foundingYear}–{year} {business.legalName}. All rights reserved.
        </small>
        <small>
          Founded {foundingYear} by <Link to="/about">{business.founder.name}</Link> · {business.address.addressLocality}, {business.address.addressRegion}
        </small>
      </div>
    </footer>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useGlobalSchemas()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div>
      <a className="skip-link btn" href="#main">Skip to content</a>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
