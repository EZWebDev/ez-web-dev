import { Link, useParams } from 'react-router-dom'
import Seo from '../seo'
import { business, absoluteUrl, FOUNDER_ID } from '../business'
import Breadcrumbs from '../components/Breadcrumbs'
import {
  breadcrumbSchema,
  formatDate,
  orgRef,
  pageTitle,
  type Crumb,
  type JsonLd,
} from '../components/schema'
import { getPost, postImage, postModified, type BlogPostMeta } from './blogUtils'
import NotFound from './NotFound'

function Article({ post }: { post: BlogPostMeta }) {
  const path = `/blog/${post.slug}`
  const url = absoluteUrl(path)
  const modified = postModified(post)
  const image = postImage(post)
  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ]

  const jsonLd: JsonLd[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: modified,
      author: {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: business.founder.name,
        url: absoluteUrl('/about'),
      },
      publisher: orgRef,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      image: absoluteUrl(image),
      inLanguage: 'en-US',
      isPartOf: { '@id': `${absoluteUrl('/blog')}#blog` },
      ...(post.keywords && post.keywords.length ? { keywords: post.keywords.join(', ') } : {}),
    },
    breadcrumbSchema(crumbs),
  ]

  return (
    <main id="main" className="section">
      <Seo
        title={pageTitle(post.title)}
        description={post.description}
        path={path}
        image={image}
        jsonLd={jsonLd}
        type="article"
        publishedTime={post.date}
        modifiedTime={modified}
      />
      <div className="container">
        <Breadcrumbs items={crumbs} />
        <article className="article prose">
          <h1>{post.title}</h1>
          <p className="byline">
            By <Link to="/about" rel="author">{business.founder.name}</Link>
            {' · '}Published <time dateTime={post.date}>{formatDate(post.date)}</time>
            {' · '}Updated <time dateTime={modified}>{formatDate(modified)}</time>
          </p>
          {post.content}
          <footer className="article-footer">
            <p>
              {business.founder.name} is the founder of <Link to="/about">{business.name}</Link>, a web development and
              SEO studio in {business.primaryCity}, {business.primaryRegion}. Questions about this post? Email{' '}
              <a href={`mailto:${business.email}`}>{business.email}</a>.
            </p>
          </footer>
        </article>
        <div className="btns" style={{ marginTop: 18 }}>
          <Link className="btn" to="/blog">All posts</Link>
          <Link className="btn btn-primary" to="/contact">Talk to us</Link>
        </div>
      </div>
    </main>
  )
}

/** /blog/:slug — known post or 404. */
export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  return post ? <Article post={post} /> : <NotFound />
}
