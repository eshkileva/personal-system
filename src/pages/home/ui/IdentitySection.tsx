import {
  PageSection,
  SectionLabel,
  SectionTitle,
} from './SectionPrimitives'

export function IdentitySection() {
  return (
    <PageSection className="lg:min-h-screen">
      <SectionLabel number="01">ИДЕНТИЧНОСТЬ</SectionLabel>
      <SectionTitle className="identity-title mt-6 tracking-[-0.035em]">
        ПИШУ КОД.
        <br />
        <span className="text-outline-strong">РАЗБИРАЮ СИСТЕМЫ.</span>
      </SectionTitle>

      <div className="mt-14 grid grid-cols-1 items-end gap-12 lg:mt-[9vw] lg:mr-[4vw] lg:ml-[16vw] lg:grid-cols-[1.2fr_0.65fr] lg:gap-[10vw]">
        <p className="text-[clamp(1.5rem,6vw,3.125rem)] leading-[1.08] tracking-[-0.045em] lg:text-[clamp(27px,3.1vw,50px)]">
          Работаю с React и TypeScript: собираю интерфейсы, продумываю состояния
          компонентов и слежу, чтобы логика оставалась понятной.
        </p>
        <div className="max-w-[500px] space-y-6 text-[clamp(1.0625rem,4vw,1.375rem)] leading-[1.55] text-copy lg:text-[clamp(18px,1.35vw,22px)]">
          <p>
            Мне важно понимать не только то, как выглядит экран, но и какие
            данные, сценарии и ограничения стоят за ним.
          </p>
          <p>
            Сейчас углубляюсь в системный анализ — учусь описывать требования,
            процессы, интеграции и связи между частями продукта.
          </p>
        </div>
      </div>
    </PageSection>
  )
}
