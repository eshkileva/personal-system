import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/contact')

export function ContactPage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="05">КОНТАКТ</SectionLabel>
      <h1 className="mt-8 max-w-6xl font-display text-[clamp(2.75rem,10vw,9rem)] uppercase leading-[0.84] tracking-[-0.04em]">
        ИЩУ КОМАНДУ, ГДЕ
        <br />
        <span className="text-outline-strong">
          МОЖНО РАСТИ И ПРИНОСИТЬ ПОЛЬЗУ
        </span>
      </h1>
      <p className="mt-12 max-w-2xl text-xl leading-relaxed text-contact-copy">
        Интересны frontend-задачи, продуктовые интерфейсы и работа рядом с
        аналитикой.
      </p>
      <a
        href="mailto:eshkileva69@gmail.com"
        className="mt-8 inline-block cursor-pointer border-b border-signal pb-2 font-mono text-sm text-electric no-underline transition-colors duration-200 hover:text-ice focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      >
        eshkileva69@gmail.com <span aria-hidden="true">↗</span>
      </a>
    </PageSection>
  )
}
