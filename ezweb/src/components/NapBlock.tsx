import { business } from '../business'

/**
 * Name, address, phone, email and hours, byte-identical to business.ts
 * (and therefore to the Google Business Profile).
 */
export default function NapBlock({ showName = true, showMapLink = true }: { showName?: boolean; showMapLink?: boolean }) {
  const a = business.address
  return (
    <address className="nap">
      {showName && <strong className="nap-name">{business.name}</strong>}
      <span>
        {a.streetAddress}
        <br />
        {a.addressLocality}, {a.addressRegion} {a.postalCode}
      </span>
      <span>
        Phone: <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
      </span>
      <span>
        Email: <a href={`mailto:${business.email}`}>{business.email}</a>
      </span>
      <span>Hours: {business.hoursDisplay}</span>
      {showMapLink && (
        <span>
          <a href={business.gbp.mapsUrl} rel="noopener">View on Google Maps</a>
        </span>
      )}
    </address>
  )
}
