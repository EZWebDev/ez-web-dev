import type { FaqItem } from './schema'

/**
 * Visible FAQ block. Text must match the FAQPage JSON-LD exactly, so pass the
 * same array to faqSchema(). Renders nothing when there are no questions.
 */
export default function FaqSection({
  faqs,
  title = 'Frequently asked questions',
  id = 'faq',
}: {
  faqs: FaqItem[] | undefined
  title?: string
  id?: string
}) {
  if (!faqs || faqs.length === 0) return null
  return (
    <section className="page-block" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section-title">{title}</h2>
      <div className="faq-list">
        {faqs.map((f) => (
          <div className="callout faq-item" key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
