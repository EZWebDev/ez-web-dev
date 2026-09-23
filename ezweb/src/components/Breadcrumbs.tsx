import { Link } from 'react-router-dom'
import type { Crumb } from './schema'

/** Visible breadcrumb trail. Pair with breadcrumbSchema() using the same items. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.path}>
              {last ? <span aria-current="page">{c.name}</span> : <Link to={c.path}>{c.name}</Link>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
