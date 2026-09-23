import { Link } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl } from '../business'
import Breadcrumbs from '../components/Breadcrumbs'
import {
  breadcrumbSchema,
  formatDate,
  founderRef,
  orgRef,
  pageTitle,
  webPageSchema,
  type Crumb,
} from '../components/schema'
import { postModified, sortedPosts } from './blogUtils'

const PATH = '/blog'
const TITLE = pageTitle('Web Design, SEO & AI Search Blog')
const DESCRIPTION = `Practical articles on web design, SEO, AI search visibility, CRO and Google Ads by ${business.founder.name}, founder of ${business.name}.`

const crumbs: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: PATH },
]

export default function BlogHub() {
  const posts = sortedPosts()
  const url = absoluteUrl(PATH)

  const jsonLd = [
    webPageSchema({
      type: 'CollectionPage',
      path: PATH,
      name: TITLE,
      description: DESCRIPTION,
      extra: { about: orgRef, mainEntity: { '@id': `${url}#blog` } },
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${url}#blog`,
      name: `${business.name} Blog`,
      url,
      publisher: orgRef,
      author: founderRef,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        '@id': `${absoluteUrl(`/blog/${p.slug}`)}#article`,
        headline: p.title,
        url: absoluteUrl(`/blog/${p.slug}`),
        datePublished: p.date,
        dateModified: postModified(p),
      })),
    },
    breadcrumbSchema(crumbs),
  ]

  return (
    <main id="main" className="section">
      <Seo title={TITLE} description={DESCRIPTION} path={PATH} jsonLd={jsonLd} />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <h1 className="display text-gradient">Blog</h1>
        <p className="subhead">
          Short, practical posts on web design, SEO, AI search and paid growth, written by {business.founder.name}.
        </p>
        <div className="cards">
          {posts.map((p) => (
            <Link key={p.slug} className="card" to={`/blog/${p.slug}`}>
              <div className="card-eyebrow"><time dateTime={p.date}>{formatDate(p.date)}</time></div>
              <h2 className="card-title">{p.title}</h2>
              <div className="card-text">{p.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
