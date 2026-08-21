import { trajectory } from '../../../entities/experience/model/experience'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/experience')

export function ExperiencePage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="04">ТЕКУЩИЙ ФОКУС</SectionLabel>
      <h1
        aria-label="ТРАЕКТОРИЯ РОСТА"
        className="mt-8 max-w-6xl font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.84] tracking-[-0.04em]"
      >
        ТРАЕКТОРИЯ
        <br />
        <span className="text-outline-strong">РОСТА</span>
      </h1>
      <p className="mt-10 max-w-2xl text-xl leading-relaxed text-copy">
        Направления, в которых я последовательно развиваю практику и системное
        мышление.
      </p>
      <ol className="mt-16 grid max-w-6xl list-none gap-px bg-line p-0 lg:grid-cols-3">
        {trajectory.map((item) => (
          <li key={item.label} className="min-h-56 bg-project p-7">
            <span className="font-mono text-xs text-meta">{item.label}</span>
            <p className="mt-12 max-w-sm text-lg leading-relaxed text-now-copy">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </PageSection>
  )
}
