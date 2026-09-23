export type ContentSection = { heading: string; body: string[]; bullets?: string[] }

/** Long-form sections (heading, paragraphs, optional bullets). Renders nothing when empty. */
export default function ContentSections({ sections }: { sections: ContentSection[] | undefined }) {
  if (!sections || sections.length === 0) return null
  return (
    <div className="stack">
      {sections.map((s) => (
        <section className="callout prose" key={s.heading}>
          <h2>{s.heading}</h2>
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {s.bullets && s.bullets.length > 0 && (
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
