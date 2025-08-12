import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import clsx from 'clsx'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container nav">
        <Link className="logo" to="/">
          <span className="logo-mark">EZ</span>
          <span>EZ Web</span>
        </Link>
        <button className="btn mobile-toggle" onClick={() => setOpen(!open)}>Menu</button>
        <nav className={clsx('nav-links', open && 'open')}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink className="btn btn-primary" to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link className="logo" to="/"><span className="logo-mark">EZ</span><span>EZ Web</span></Link>
          <p style={{ marginTop: 8 }}>Boutique web development & digital marketing for new and established brands.</p>
          <small>© {new Date().getFullYear()} EZ Web Development LLC. All rights reserved.</small>
        </div>
        <div>
          <strong>Company</strong>
          <div className="list" style={{ marginTop: 8 }}>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <strong>Get in touch</strong>
          <div className="list" style={{ marginTop: 8 }}>
            <a href="mailto:hello@ezweb.dev">hello@ezweb.dev</a>
            <span>Mon–Fri · 9am–5pm</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function Home() {
  return (
    <main className="hero">
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">Boutique Web Dev + Digital Marketing</span>
          <h1 className="display text-gradient">Sexy, modern websites that rank and convert</h1>
          <p className="subhead">We design and build lightning-fast sites, write SEO content that climbs, and run high-ROI campaigns. If you want growth without the agency bloat—welcome to EZ Web.</p>
          <div className="btns">
            <Link className="btn btn-primary" to="/contact">Get a free strategy call</Link>
            <Link className="btn" to="/services">Explore services</Link>
          </div>
        </div>
        <aside className="hero-card">
          <div className="kpis">
            <div className="kpi"><div className="num">+210%</div><div className="label">Avg. 6‑mo organic</div></div>
            <div className="kpi"><div className="num">3.2x</div><div className="label">Paid ROAS</div></div>
            <div className="kpi"><div className="num">&lt; 2.0s</div><div className="label">Core Web Vitals</div></div>
          </div>
          <div className="badges">
            <span className="badge">Figma → Pixel‑perfect</span>
            <span className="badge">SEO Blogs & Newsletters</span>
            <span className="badge">AI Search (GPT, Gemini, Claude)</span>
            <span className="badge">Landing Page CRO</span>
          </div>
        </aside>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What we do</h2>
          <p className="section-subtitle">From stunning custom designs to growth engines that keep compounding.</p>
          <div className="cards">
            <Link className="card" to="/services/custom-web-design">
              <div className="card-eyebrow">Design & Build</div>
              <div className="card-title">Custom Web Design</div>
              <div className="card-text">Figma deliverables, component systems, and dev‑ready builds that are fast and accessible.</div>
              <div className="badges"><span className="badge">Figma</span><span className="badge">Web Vitals</span><span className="badge">Performance</span></div>
            </Link>
            <Link className="card" to="/services/monthly-seo-content">
              <div className="card-eyebrow">Organic Growth</div>
              <div className="card-title">Monthly SEO Content</div>
              <div className="card-text">Blogs, on‑page optimizations, local service pages, rewrites, and newsletters that rank.</div>
              <div className="badges"><span className="badge">Topical Authority</span><span className="badge">EEAT</span><span className="badge">Local</span></div>
            </Link>
            <Link className="card" to="/services/landing-page-cro">
              <div className="card-eyebrow">Conversions</div>
              <div className="card-title">Landing Page CRO</div>
              <div className="card-text">Relentless A/B testing, clarity, and persuasion—turn more visits into revenue.</div>
              <div className="badges"><span className="badge">A/B</span><span className="badge">Hotjar</span><span className="badge">UX</span></div>
            </Link>
            <Link className="card" to="/services/ai-search-ranking">
              <div className="card-eyebrow">AI Era SEO</div>
              <div className="card-title">AI Search Ranking</div>
              <div className="card-text">Win in AI answers. We optimize for ChatGPT, Gemini, Claude and SGE‑style results.</div>
              <div className="badges"><span className="badge">Entities</span><span className="badge">Schemas</span><span className="badge">Citations</span></div>
            </Link>
            <Link className="card" to="/services/google-ads">
              <div className="card-eyebrow">Acquire</div>
              <div className="card-title">Google Ads</div>
              <div className="card-text">Smart search, Performance Max, and retargeting tuned for profitable ROAS.</div>
              <div className="badges"><span className="badge">Search</span><span className="badge">PMax</span><span className="badge">Retargeting</span></div>
            </Link>
            <Link className="card" to="/services/meta-ads">
              <div className="card-eyebrow">Scale</div>
              <div className="card-title">Meta Ads</div>
              <div className="card-text">Creative testing, hooks, and audiences that drive real pipeline—not vanity clicks.</div>
              <div className="badges"><span className="badge">UGC</span><span className="badge">Lookalikes</span><span className="badge">ROAS</span></div>
            </Link>
          </div>
          <div className="btns" style={{ marginTop: 18 }}>
            <Link className="btn" to="/services">See all services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col callout">
          <div>
            <h3 className="section-title" style={{ fontSize: 24 }}>Ecommerce or Lead Gen—built to perform</h3>
            <p className="section-subtitle" style={{ margin: 0 }}>We ship Shopify, headless, and high‑converting marketing sites with clean, maintainable code.</p>
            <div className="list" style={{ marginTop: 10 }}>
              <div className="item"><span className="icon">✓</span><div>Core Web Vitals under 2s on mid‑tier devices</div></div>
              <div className="item"><span className="icon">✓</span><div>Schema, sitemaps, and on‑page best practices</div></div>
              <div className="item"><span className="icon">✓</span><div>Analytics, pixels, and consent done right</div></div>
            </div>
          </div>
          <div>
            <h3 className="section-title" style={{ fontSize: 24 }}>Boutique on purpose</h3>
            <p className="section-subtitle" style={{ margin: 0 }}>You work with senior talent only. No bloated teams, no hand‑offs, no mysterious retainers.</p>
            <div className="btns" style={{ marginTop: 10 }}>
              <Link className="btn btn-primary" to="/contact">Start a project</Link>
              <Link className="btn" to="/about">Why EZ Web</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function About() {
  return (
    <main className="section">
      <div className="container">
        <span className="eyebrow">Why EZ Web</span>
        <h1 className="display text-gradient">Boutique by design</h1>
        <p className="subhead">We’re a small, senior team that ships quickly and obsesses over outcomes. No layers, no long timelines—just high‑leverage work that moves the needle.</p>

        <div className="two-col" style={{ marginTop: 18 }}>
          <div className="callout">
            <h3 className="section-title" style={{ fontSize: 22 }}>What makes us different</h3>
            <div className="list" style={{ marginTop: 10 }}>
              <div className="item"><span className="icon">☆</span><div>Hands‑on senior talent—strategy to execution</div></div>
              <div className="item"><span className="icon">☆</span><div>Design systems that developers actually love</div></div>
              <div className="item"><span className="icon">☆</span><div>Full‑funnel thinking: SEO, paid, CRO, email</div></div>
              <div className="item"><span className="icon">☆</span><div>Transparent pricing and clear deliverables</div></div>
            </div>
          </div>
          <div className="callout">
            <h3 className="section-title" style={{ fontSize: 22 }}>Who we serve</h3>
            <p>New and established businesses looking to create or refresh their online presence. Ecommerce stores, SaaS, and service brands that want performance and polish.</p>
            <div className="badges" style={{ marginTop: 6 }}>
              <span className="badge">Ecommerce</span>
              <span className="badge">B2B SaaS</span>
              <span className="badge">Local Services</span>
            </div>
          </div>
        </div>

        <hr className="sep" />

        <div className="two-col">
          <div>
            <h3 className="section-title" style={{ fontSize: 22 }}>Our approach</h3>
            <p>Every engagement starts with a crisp strategy. We identify the few moves that matter—then design, build, and iterate. We bias toward speed and learning while keeping quality high.</p>
          </div>
          <div>
            <h3 className="section-title" style={{ fontSize: 22 }}>Stats that matter</h3>
            <table className="table">
              <thead><tr><th>Metric</th><th>Typical Outcome</th></tr></thead>
              <tbody>
                <tr><td>Organic traffic</td><td>+150–250% in 6–9 months</td></tr>
                <tr><td>Landing page CVR</td><td>+30–80% after CRO sprints</td></tr>
                <tr><td>Page speed</td><td>&lt; 2s on key templates</td></tr>
                <tr><td>Paid ROAS</td><td>2–4x on scaled accounts</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="btns" style={{ marginTop: 18 }}>
          <Link className="btn btn-primary" to="/contact">Book a strategy call</Link>
          <Link className="btn" to="/services">View services</Link>
        </div>
      </div>
    </main>
  )
}

type Service = {
  slug: string
  title: string
  eyebrow: string
  description: string
  bullets: string[]
}

const services: Service[] = [
  { slug: 'monthly-seo-content', title: 'Monthly SEO Content', eyebrow: 'Organic Growth', description: 'Blogs, on‑page optimizations, local service pages, rewrites, and newsletters that rank.', bullets: ['Keyword strategy & topical clustering', 'On‑page SEO & internal links', 'Editorial calendar & production', 'Newsletter & repurposing'] },
  { slug: 'ai-search-ranking', title: 'AI Search Ranking', eyebrow: 'AI Era SEO', description: 'Optimize for AI answers (ChatGPT, Gemini, Claude) and SGE‑style results.', bullets: ['Entity & schema optimization', 'Citation & knowledge graph wins', 'Answer engine content', 'Monitoring & iteration'] },
  { slug: 'backlinks', title: 'Backlinks', eyebrow: 'Authority', description: 'Quality link acquisition that compounds organic growth.', bullets: ['Outreach & placements', 'DR‑appropriate strategy', 'Anchor text mix', 'Reporting & QA'] },
  { slug: 'branding', title: 'Branding', eyebrow: 'Identity', description: 'Visual identity and micro‑copy that clarify your story.', bullets: ['Logo & palette', 'Type & components', 'Voice & tone', 'Brand kit delivery'] },
  { slug: 'landing-page-cro', title: 'Landing Page CRO', eyebrow: 'Conversions', description: 'A/B tests and UX fixes that lift conversion rate.', bullets: ['Research & heuristics', 'Hypotheses & tests', 'Messaging & friction', 'Analytics & learnings'] },
  { slug: 'custom-web-design', title: 'Custom Web Design', eyebrow: 'Design & Build', description: 'Figma deliverables to modern builds that nail performance.', bullets: ['Figma files & components', 'Responsive states', 'Accessibility & performance', 'Handoff or build'] },
  { slug: 'micro-influencer-marketing', title: 'Micro Influencer Marketing', eyebrow: 'Awareness', description: 'UGC and micro‑creators that actually sell.', bullets: ['Creator sourcing', 'Briefs & approvals', 'Usage rights', 'Measurement'] },
  { slug: 'email-marketing', title: 'Email Marketing', eyebrow: 'Retention', description: 'Flows and campaigns that print LTV.', bullets: ['ESP setup & flows', 'List growth & hygiene', 'Campaign calendar', 'Copy & creative'] },
  { slug: 'google-ads', title: 'Google Ads', eyebrow: 'Acquire', description: 'Search, PMax, and retargeting tuned for ROAS.', bullets: ['Tracking & attribution', 'Keyword & structure', 'Feed & assets', 'Scaling & guardrails'] },
  { slug: 'meta-ads', title: 'Meta Ads', eyebrow: 'Scale', description: 'Creative testing and audiences that drive pipeline.', bullets: ['Pixel & CAPI', 'Hooks & variations', 'Audiences & exclusions', 'Budget & bid strategy'] },
  { slug: 'full-website-packages', title: 'Full Website Packages', eyebrow: 'All‑in', description: 'Strategy, design, build, and launch end‑to‑end.', bullets: ['Roadmap & scope', 'Design & build', 'SEO & analytics', 'Launch & support'] },
]

function ServicesHub() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="display text-gradient">Services</h1>
        <p className="subhead">Everything you need to build, rank, and convert. Pick a lane or go full‑stack.</p>
        <div className="cards">
          {services.map(s => (
            <Link className="card" key={s.slug} to={`/services/${s.slug}`}>
              <div className="card-eyebrow">{s.eyebrow}</div>
              <div className="card-title">{s.title}</div>
              <div className="card-text">{s.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

function ServicePage({ slug }: { slug: string }) {
  const svc = services.find(s => s.slug === slug)
  if (!svc) return <main className="section"><div className="container"><h1 className="display text-gradient">Not found</h1></div></main>
  return (
    <main className="section">
      <div className="container">
        <span className="eyebrow">{svc.eyebrow}</span>
        <h1 className="display text-gradient">{svc.title}</h1>
        <p className="subhead" style={{ maxWidth: 880 }}>{svc.description}</p>
        <div className="two-col" style={{ marginTop: 18 }}>
          <div className="callout">
            <h3 className="section-title" style={{ fontSize: 22 }}>What you get</h3>
            <div className="list" style={{ marginTop: 8 }}>
              {svc.bullets.map(b => (
                <div className="item" key={b}><span className="icon">✓</span><div>{b}</div></div>
              ))}
            </div>
          </div>
          <div className="callout">
            <h3 className="section-title" style={{ fontSize: 22 }}>Next steps</h3>
            <p>Book a quick intro call and we’ll map the highest‑leverage moves for your business.</p>
            <div className="btns"><Link className="btn btn-primary" to="/contact">Book intro</Link></div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Contact() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="display text-gradient">Let’s build something that sells</h1>
        <p className="subhead">Tell us about your business and goals. We’ll reply within one business day.</p>
        <form className="two-col" onSubmit={(e) => { e.preventDefault(); alert('Thanks! We will reach out shortly.') }}>
          <div>
            <label className="label">Name</label>
            <input className="input" placeholder="Your name" required />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" placeholder="Company name" />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" placeholder="https://" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label">How can we help?</label>
            <textarea className="input" rows={6} placeholder="Briefly describe your project and goals" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button className="btn btn-primary" type="submit">Request strategy call</button>
          </div>
        </form>
      </div>
    </main>
  )
}

const demoPosts = [
  { slug: 'design-that-converts', title: 'Web design that actually converts', summary: 'How to design for clarity, speed, and persuasion in 2025.' },
  { slug: 'ai-search-optimization', title: 'Optimizing for AI search answers', summary: 'Entities, schemas, and citations to show up in AI responses.' },
]

function BlogHub() {
  return (
    <main className="section">
      <div className="container">
        <h1 className="display text-gradient">Insights</h1>
        <p className="subhead">Short, practical posts on design, SEO, CRO, and paid growth.</p>
        <div className="cards">
          {demoPosts.map(p => (
            <Link key={p.slug} className="card" to={`/blog/${p.slug}`}>
              <div className="card-title">{p.title}</div>
              <div className="card-text">{p.summary}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

function BlogPost({ slug }: { slug: string }) {
  const post = demoPosts.find(p => p.slug === slug)
  if (!post) return <main className="section"><div className="container"><h1 className="display text-gradient">Not found</h1></div></main>
  return (
    <main className="section">
      <div className="container prose">
        <h1>{post.title}</h1>
        <p>{post.summary}</p>
        <p>Coming soon: full post content.</p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<ServicesHub />} />
        {services.map(s => (
          <Route key={s.slug} path={`services/${s.slug}`} element={<ServicePage slug={s.slug} />} />
        ))}
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogHub />} />
        {demoPosts.map(p => (
          <Route key={p.slug} path={`blog/${p.slug}`} element={<BlogPost slug={p.slug} />} />
        ))}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
