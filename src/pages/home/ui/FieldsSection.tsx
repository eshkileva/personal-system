import { fields, type Field } from '../model/content'
import { PageSection, SectionLabel } from './SectionPrimitives'

function FieldCard({ field }: { field: Field }) {
  return (
    <article className="@container field-card">
      <div className="font-mono text-xs text-meta">{field.number}</div>
      <div className="absolute top-[27px] right-[27px] text-right font-mono text-xs leading-[1.8] uppercase text-field-meta">
        {field.metrics.map((metric) => (
          <div key={metric.label}>
            {metric.label} /{' '}
            <span
              className={metric.accent ? 'text-electric' : undefined}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
      <h3 className="mt-16 max-w-full wrap-break-word font-display text-[clamp(1.75rem,11cqw,5.25rem)] leading-[0.9] tracking-tight lg:mt-20">
        {field.title}
      </h3>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-status">
        {field.subtitle}
      </p>
      <div className="field-scan" aria-hidden />
    </article>
  )
}

export function FieldsSection() {
  return (
    <PageSection className="lg:min-h-[1150px]">
      <SectionLabel number="02">РАБОЧИЕ НАПРАВЛЕНИЯ</SectionLabel>

      <div className="mb-12 mt-8 flex flex-col gap-10 lg:mb-[7vw] lg:flex-row lg:items-end lg:justify-between lg:gap-0">
        <h2
          aria-label="ЧЕМ Я ЗАНИМАЮСЬ"
          className="fields-title font-display text-[clamp(2.5rem,11vw,9rem)] uppercase leading-[0.84] tracking-[-0.035em] lg:text-[clamp(62px,9vw,145px)]"
        >
          ЧЕМ Я
          <br />ЗАНИМАЮСЬ
        </h2>
        <p className="max-w-[260px] font-mono text-xs uppercase leading-[1.7] text-note">
          Инструменты, задачи и направления, которые я развиваю.
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-[22px]">
        {fields.map((field) => (
          <FieldCard key={field.title} field={field} />
        ))}
      </div>
    </PageSection>
  )
}
