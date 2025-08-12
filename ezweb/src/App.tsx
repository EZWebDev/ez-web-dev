import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import Seo, { useGlobalSchemas } from './seo'

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
  useGlobalSchemas()
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'EZ Web Development LLC',
    url: '/',
    description: 'Boutique web development and digital marketing agency specializing in custom web design, SEO content, CRO, and paid ads.',
    areaServed: 'US',
    sameAs: [],
  }
  return (
    <main className="hero">
      <Seo
        title="Web Development & Digital Marketing Agency | Custom Websites, SEO, CRO | EZ Web"
        description="Boutique web development & digital marketing agency. Custom web design, monthly SEO content, AI search ranking, CRO, Google & Meta ads."
        path="/"
        jsonLd={jsonLd}
      />
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">Premium Boutique Agency ⭐ Elite Client Portfolio</span>
          <h1 className="display text-gradient">Enterprise-grade websites that dominate & convert</h1>
          <p className="subhead">We architect lightning-fast digital experiences, craft SEO content that commands search rankings, and orchestrate high-performance campaigns. Reserved for ambitious brands ready to eclipse their competition.</p>
          <div className="btns">
            <Link className="btn btn-primary" to="/contact">Request strategy consultation</Link>
            <Link className="btn" to="/services">View premium services</Link>
          </div>
        </div>
        <aside className="hero-card">
          <div className="kpis">
            <div className="kpi"><div className="num">+210%</div><div className="label">Avg. 6‑mo organic growth</div></div>
            <div className="kpi"><div className="num">3.2x</div><div className="label">Premium ROAS</div></div>
            <div className="kpi"><div className="num">&lt; 1.8s</div><div className="label">Elite performance</div></div>
          </div>
          <div className="badges">
            <span className="badge">Figma → Production Ready</span>
            <span className="badge">AI-Optimized Content</span>
            <span className="badge">Next-Gen SEO Strategy</span>
            <span className="badge">Enterprise CRO</span>
          </div>
        </aside>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Premium web experiences, elite growth strategies</h2>
          <p className="section-subtitle">From sophisticated custom architectures to growth engines that compound exponentially. Built for brands that demand excellence.</p>
          <div className="cards">
            <Link className="card" to="/services/custom-web-design">
              <div className="card-eyebrow">Elite Design</div>
              <div className="card-title">Bespoke Web Architecture</div>
              <div className="card-text">Premium Figma systems, component libraries, and performance-obsessed builds that set industry standards.</div>
              <div className="badges"><span className="badge">Design Systems</span><span className="badge">Core Web Vitals</span><span className="badge">Enterprise Scale</span></div>
            </Link>
            <Link className="card" to="/services/monthly-seo-content">
              <div className="card-eyebrow">Authority Building</div>
              <div className="card-title">Strategic SEO Content</div>
              <div className="card-text">Executive-level content strategy, topical authority development, and search dominance campaigns.</div>
              <div className="badges"><span className="badge">Thought Leadership</span><span className="badge">Domain Authority</span><span className="badge">Search Dominance</span></div>
            </Link>
            <Link className="card" to="/services/landing-page-cro">
              <div className="card-eyebrow">Revenue Optimization</div>
              <div className="card-title">Conversion Science</div>
              <div className="card-text">Psychology-driven optimization, advanced analytics, and systematic testing for maximum revenue impact.</div>
              <div className="badges"><span className="badge">Behavioral Analysis</span><span className="badge">Revenue Science</span><span className="badge">Performance Psychology</span></div>
            </Link>
            <Link className="card" to="/services/ai-search-ranking">
              <div className="card-eyebrow">Next-Gen SEO</div>
              <div className="card-title">AI Search Dominance</div>
              <div className="card-text">Future-proof optimization for ChatGPT, Gemini, Claude and next-generation search experiences.</div>
              <div className="badges"><span className="badge">AI Optimization</span><span className="badge">Future-Proof Strategy</span><span className="badge">Search Evolution</span></div>
            </Link>
            <Link className="card" to="/services/google-ads">
              <div className="card-eyebrow">Premium Acquisition</div>
              <div className="card-title">Elite Google Campaigns</div>
              <div className="card-text">Sophisticated audience targeting, advanced attribution, and high-value customer acquisition strategies.</div>
              <div className="badges"><span className="badge">Advanced Attribution</span><span className="badge">Elite Targeting</span><span className="badge">Premium ROAS</span></div>
            </Link>
            <Link className="card" to="/services/meta-ads">
              <div className="card-eyebrow">Scale Strategy</div>
              <div className="card-title">Premium Social Acquisition</div>
              <div className="card-text">Sophisticated creative testing, audience intelligence, and scalable acquisition systems for premium brands.</div>
              <div className="badges"><span className="badge">Creative Intelligence</span><span className="badge">Audience Science</span><span className="badge">Scale Systems</span></div>
            </Link>
          </div>
          <div className="btns" style={{ marginTop: 18 }}>
            <Link className="btn" to="/services">Explore premium services</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col callout">
          <div>
            <h2 className="section-title" style={{ fontSize: 24 }}>Enterprise e-commerce & lead generation</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>Sophisticated Shopify Plus, headless commerce, and premium marketing sites with institutional-grade architecture.</p>
            <div className="list" style={{ marginTop: 10 }}>
              <div className="item"><span className="icon">✓</span><div>Sub-2s Core Web Vitals on enterprise infrastructure</div></div>
              <div className="item"><span className="icon">✓</span><div>Advanced schema, enterprise sitemaps, and technical SEO</div></div>
              <div className="item"><span className="icon">✓</span><div>Sophisticated analytics, attribution, and compliance frameworks</div></div>
            </div>
          </div>
          <div>
            <h2 className="section-title" style={{ fontSize: 24 }}>Exclusively boutique, intentionally elite</h2>
            <p className="section-subtitle" style={{ margin: 0 }}>Selective client partnerships. Senior strategists only. Zero account management layers. Premium outcomes, not premium prices.</p>
            <div className="btns" style={{ marginTop: 10 }}>
              <Link className="btn btn-primary" to="/contact">Apply for partnership</Link>
              <Link className="btn" to="/about">Our philosophy</Link>
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
      <Seo
        title="About EZ Web — Boutique Web Development & Digital Marketing Agency"
        description="Small, senior team focused on outcomes: custom web design, SEO content, CRO, and paid media that drive growth."
        path="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About EZ Web',
          url: '/about',
        }}
      />
      <div className="container">
        <span className="eyebrow">Why EZ Web</span>
        <h1 className="display text-gradient">Boutique by design</h1>
        <p className="subhead">We’re a small, senior team that ships quickly and obsesses over outcomes. No layers, no long timelines—just high‑leverage work that moves the needle.</p>

        <div className="two-col" style={{ marginTop: 18 }}>
          <div className="callout">
            <h2 className="section-title" style={{ fontSize: 22 }}>What makes us different</h2>
            <div className="list" style={{ marginTop: 10 }}>
              <div className="item"><span className="icon">☆</span><div>Hands‑on senior talent—strategy to execution</div></div>
              <div className="item"><span className="icon">☆</span><div>Design systems that developers actually love</div></div>
              <div className="item"><span className="icon">☆</span><div>Full‑funnel thinking: SEO, paid, CRO, email</div></div>
              <div className="item"><span className="icon">☆</span><div>Transparent pricing and clear deliverables</div></div>
            </div>
          </div>
          <div className="callout">
            <h2 className="section-title" style={{ fontSize: 22 }}>Who we serve</h2>
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
            <h2 className="section-title" style={{ fontSize: 22 }}>Our approach</h2>
            <p>Every engagement starts with a crisp strategy. We identify the few moves that matter—then design, build, and iterate. We bias toward speed and learning while keeping quality high.</p>
          </div>
          <div>
            <h2 className="section-title" style={{ fontSize: 22 }}>Stats that matter</h2>
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
  { slug: 'monthly-seo-content', title: 'Monthly SEO Content Services', eyebrow: 'Organic Growth', description: 'Blogs, on‑page optimizations, local service pages, rewrites, and newsletters that rank.', bullets: ['Keyword strategy & topical clustering', 'On‑page SEO & internal links', 'Editorial calendar & production', 'Newsletter & repurposing'] },
  { slug: 'ai-search-ranking', title: 'AI Search Ranking Optimization', eyebrow: 'AI Era SEO', description: 'Optimize for AI answers (ChatGPT, Gemini, Claude) and SGE‑style results.', bullets: ['Entity & schema optimization', 'Citation & knowledge graph wins', 'Answer engine content', 'Monitoring & iteration'] },
  { slug: 'backlinks', title: 'Backlink Building Services', eyebrow: 'Authority', description: 'Quality link acquisition that compounds organic growth.', bullets: ['Outreach & placements', 'DR‑appropriate strategy', 'Anchor text mix', 'Reporting & QA'] },
  { slug: 'branding', title: 'Branding & Visual Identity', eyebrow: 'Identity', description: 'Visual identity and micro‑copy that clarify your story.', bullets: ['Logo & palette', 'Type & components', 'Voice & tone', 'Brand kit delivery'] },
  { slug: 'landing-page-cro', title: 'Landing Page CRO Agency', eyebrow: 'Conversions', description: 'A/B tests and UX fixes that lift conversion rate.', bullets: ['Research & heuristics', 'Hypotheses & tests', 'Messaging & friction', 'Analytics & learnings'] },
  { slug: 'custom-web-design', title: 'Custom Web Design Agency', eyebrow: 'Design & Build', description: 'Figma deliverables to modern builds that nail performance.', bullets: ['Figma files & components', 'Responsive states', 'Accessibility & performance', 'Handoff or build'] },
  { slug: 'micro-influencer-marketing', title: 'Micro Influencer Marketing', eyebrow: 'Awareness', description: 'UGC and micro‑creators that actually sell.', bullets: ['Creator sourcing', 'Briefs & approvals', 'Usage rights', 'Measurement'] },
  { slug: 'email-marketing', title: 'Email Marketing Services', eyebrow: 'Retention', description: 'Flows and campaigns that print LTV.', bullets: ['ESP setup & flows', 'List growth & hygiene', 'Campaign calendar', 'Copy & creative'] },
  { slug: 'google-ads', title: 'Google Ads Management', eyebrow: 'Acquire', description: 'Search, PMax, and retargeting tuned for ROAS.', bullets: ['Tracking & attribution', 'Keyword & structure', 'Feed & assets', 'Scaling & guardrails'] },
  { slug: 'meta-ads', title: 'Meta Ads Agency', eyebrow: 'Scale', description: 'Creative testing and audiences that drive pipeline.', bullets: ['Pixel & CAPI', 'Hooks & variations', 'Audiences & exclusions', 'Budget & bid strategy'] },
  { slug: 'full-website-packages', title: 'Full Website Packages', eyebrow: 'All‑in', description: 'Strategy, design, build, and launch end‑to‑end.', bullets: ['Roadmap & scope', 'Design & build', 'SEO & analytics', 'Launch & support'] },
]

function ServicesHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Marketing and Web Development Services',
    url: '/services',
  }
  return (
    <main className="section">
      <Seo
        title="Web Development & Marketing Services | SEO, CRO, Web Design, Ads | EZ Web"
        description="Explore our services: custom web design, monthly SEO content, AI search optimization, landing page CRO, Google Ads, Meta Ads, email, branding, and more."
        path="/services"
        jsonLd={jsonLd}
      />
      <div className="container">
        <h1 className="display text-gradient">Marketing and Web Development Services</h1>
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.title,
    url: `/services/${svc.slug}`,
    description: svc.description,
    provider: { '@type': 'Organization', name: 'EZ Web Development LLC' },
    areaServed: 'US',
  }
  return (
    <main className="section">
      <Seo
        title={`${svc.title} | EZ Web`}
        description={svc.description}
        path={`/services/${svc.slug}`}
        jsonLd={jsonLd}
      />
      <div className="container">
        <span className="eyebrow">{svc.eyebrow}</span>
        <h1 className="display text-gradient">{svc.title}</h1>
        <p className="subhead" style={{ maxWidth: 880 }}>{svc.description}</p>
        <div className="two-col" style={{ marginTop: 18 }}>
          <div className="callout">
            <h2 className="section-title" style={{ fontSize: 22 }}>What you get</h2>
            <div className="list" style={{ marginTop: 8 }}>
              {svc.bullets.map(b => (
                <div className="item" key={b}><span className="icon">✓</span><div>{b}</div></div>
              ))}
            </div>
          </div>
          <div className="callout">
            <h2 className="section-title" style={{ fontSize: 22 }}>Next steps</h2>
            <p>Book a quick intro call and we’ll map the highest‑leverage moves for your business.</p>
            <div className="btns"><Link className="btn btn-primary" to="/contact">Book intro</Link></div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Contact() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact EZ Web',
    url: '/contact',
  }
  return (
    <main className="section">
      <Seo
        title="Contact EZ Web — Web Development & Marketing Agency"
        description="Request a free strategy call. Tell us about your business and goals—custom web design, SEO, CRO, Google Ads, Meta Ads."
        path="/contact"
        jsonLd={jsonLd}
      />
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

import { blogPosts, type BlogPost } from './blogPosts'

function BlogHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'EZ Web Blog',
    url: '/blog',
  }
  return (
    <main className="section">
      <Seo
        title="EZ Web Blog — Web Design, SEO, CRO, and Paid Growth"
        description="Practical posts on custom web design, monthly SEO content, AI search optimization, CRO, and paid ads."
        path="/blog"
        jsonLd={jsonLd}
      />
      <div className="container">
        <h1 className="display text-gradient">Insights</h1>
        <p className="subhead">Short, practical posts on design, SEO, CRO, and paid growth.</p>
        <div className="cards">
          {blogPosts.map(p => (
            <Link key={p.slug} className="card" to={`/blog/${p.slug}`}>
              <div className="card-title">{p.title}</div>
              <div className="card-text">{p.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <main className="section"><div className="container"><h1 className="display text-gradient">Not found</h1></div></main>
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: `/blog/${slug}`,
    author: { '@type': 'Organization', name: 'EZ Web' },
  }
  return (
    <main className="section">
      <Seo
        title={`${post.title} | EZ Web Blog`}
        description={post.description}
        path={`/blog/${slug}`}
        jsonLd={jsonLd}
      />
      <div className="container prose">
        <h1>{post.title}</h1>
        {post.content}
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
        {blogPosts.map(p => (
          <Route key={p.slug} path={`blog/${p.slug}`} element={<BlogPost slug={p.slug} />} />
        ))}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
