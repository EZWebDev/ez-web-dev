import { Link } from 'react-router-dom'
import { locations } from '../locations'

/** "Serving Hollywood, Fort Lauderdale, Miami and nationwide" with links to each location page. */
export default function ServiceAreaLine({ className = 'service-area' }: { className?: string }) {
  if (locations.length === 0) return <p className={className}>Serving clients nationwide.</p>
  return (
    <p className={className}>
      Serving{' '}
      {locations.map((l, i) => (
        <span key={l.slug}>
          {i > 0 && ', '}
          <Link to={`/locations/${l.slug}`}>{l.name}</Link>
        </span>
      ))}{' '}
      and nationwide.
    </p>
  )
}
