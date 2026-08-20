import { nowItems } from '../model/content'
import { PageSection, SectionLabel } from './SectionPrimitives'

export function NowSection() {
  return (
    <PageSection className="lg:min-h-screen">
      <SectionLabel number="04">ТЕКУЩИЙ ФОКУС</SectionLabel>

      <div className="@container">
        <h2
          aria-label="ЧТО Я РАЗВИВАЮ"
          className="my-14 flex flex-col font-display text-[clamp(1.75rem,8.5cqw,7rem)] uppercase leading-[0.88] tracking-[-0.035em] lg:my-[8vw] lg:ml-[8vw] xl:text-[clamp(70px,10.5vw,165px)]"
        >
          <span>ЧТО Я</span>
          <span className="text-[0.76em] text-signal [text-shadow:0_0_60px_rgb(22_140_255_/_0.3)] sm:ml-[4vw] lg:ml-[14vw] xl:text-[1em]">
            РАЗВИВАЮ
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:mx-[7vw] xl:grid-cols-3">
        {nowItems.map((item) => (
          <article
            key={item.label}
            className="min-h-[180px] bg-project p-[27px] lg:min-h-[220px]"
          >
            <span className="font-mono text-xs text-meta">{item.label}</span>
            <p className="mt-10 max-w-[280px] text-[17px] leading-[1.5] text-now-copy lg:mt-[55px] lg:text-lg">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </PageSection>
  )
}
