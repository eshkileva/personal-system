import { stackEntries } from '../../../entities/stack/model/stack'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/stack')

export function StackPage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="03">ИНСТРУМЕНТЫ И НАПРАВЛЕНИЯ</SectionLabel>
      <h1 className="fields-title mt-8 font-display text-[clamp(3rem,11vw,9rem)] uppercase leading-[0.84] tracking-[-0.04em]">
        СТЕК СИСТЕМЫ
      </h1>
      <div className="relative mt-16 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
        {stackEntries.map((entry) => (
          <article key={entry.title} className="@container field-card">
            <span className="font-mono text-xs text-meta">{entry.number}</span>
            <div className="absolute top-[27px] right-[27px] text-right font-mono text-xs leading-[1.8] uppercase text-field-meta">
              {entry.metrics.map((metric) => (
                <div key={metric.label}>
                  {metric.label} /{' '}
                  <span className={metric.accent ? 'text-electric' : undefined}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
            <h2 className="mt-16 max-w-full wrap-break-word font-display text-[clamp(1.75rem,11cqw,5.25rem)] leading-[0.9] tracking-tight">
              {entry.title}
            </h2>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-status">
              {entry.subtitle}
            </p>
            <div className="field-scan" aria-hidden="true" />
          </article>
        ))}
      </div>
    </PageSection>
  )
}
