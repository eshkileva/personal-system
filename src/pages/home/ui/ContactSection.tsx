import { PageSection, SectionLabel } from './SectionPrimitives'

export function ContactSection() {
  return (
    <PageSection className="flex min-h-0 flex-col overflow-hidden xl:min-h-[90vh] xl:flex-row xl:items-center">
      <div className="contact-circle hidden xl:grid" aria-hidden>
        НАПИШИТЕ
        <br />
        МНЕ
      </div>

      <div className="@container relative z-[2] xl:-ml-[5vw] xl:flex-1">
        <SectionLabel number="05">КОНТАКТ</SectionLabel>
        <h2 className="mt-8 max-w-full font-display text-[clamp(2rem,9cqw,9rem)] uppercase leading-[0.82] tracking-[-0.035em] xl:mt-[45px] xl:text-[clamp(65px,8vw,128px)]">
          ИЩУ КОМАНДУ, ГДЕ
          <br />
          <span className="text-outline-strong">
            МОЖНО РАСТИ И ПРИНОСИТЬ ПОЛЬЗУ
          </span>
        </h2>
        <p className="mt-8 mb-4 text-lg text-contact-copy lg:mt-10">
          Интересны frontend-задачи, продуктовые интерфейсы и работа рядом с
          аналитикой.
        </p>
        <a
          href="mailto:eshkileva69@gmail.com"
          className="inline-block border-b border-signal pb-1.5 font-mono text-sm text-electric no-underline transition-colors duration-200 hover:text-ice focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
        >
          eshkileva69@gmail.com <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="mt-14 text-left font-mono text-xs leading-[1.8] text-coordinate xl:absolute xl:right-[6vw] xl:bottom-[6vw] xl:mt-0 xl:text-right">
        СВЯЗЬ / EMAIL
        <br />
        ОТКРЫТА К ДИАЛОГУ
      </div>
    </PageSection>
  )
}
