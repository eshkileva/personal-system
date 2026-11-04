import { practice, trajectory } from '../../../entities/experience/model/experience'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/experience')

export function ExperiencePage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="04">ПРАКТИКА</SectionLabel>
      <h1
        aria-label="ОПЫТ И ПРАКТИКА"
        className="mt-8 max-w-6xl font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.92] tracking-[0.02em]"
      >
        ОПЫТ
        <br />
        <span className="text-outline-strong">И ПРАКТИКА</span>
      </h1>
      <p className="mt-10 max-w-2xl text-xl leading-relaxed text-copy">
        Обычная работа аналитика над web-продуктами: требования, сценарии,
        контракты и сверка с реализацией.
      </p>
      <section aria-label="Обязанности аналитика" className="practice-panel">
        <p className="practice-panel__legend">DUTIES / ANALYST</p>
        <ul className="practice-panel__list">
          {practice.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <ol className="trajectory-path">
        {trajectory.map((item, index) => (
          <li className="trajectory-step" key={item.label}>
            <span className="trajectory-step__index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-mono text-xs tracking-[0.12em] text-meta">
              {item.label}
            </span>
            <p className="mt-10 max-w-sm text-lg leading-relaxed text-now-copy">
              {item.text}
            </p>
          </li>
        ))}
      </ol>
    </PageSection>
  )
}
