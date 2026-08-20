import { ContactSection } from './ContactSection'
import { FieldsSection } from './FieldsSection'
import { HeroSection } from './HeroSection'
import { IdentitySection } from './IdentitySection'
import { NowSection } from './NowSection'
import { WorkSection } from './WorkSection'

function Footer() {
  return (
    <footer className="flex flex-col items-start justify-between gap-4 px-[6vw] py-12 font-mono text-xs uppercase tracking-[0.13em] text-footer md:flex-row md:items-end md:gap-0">
      <span>ЮЛИЯ ЕШКИЛЕВА / FRONTEND</span>
      <span>React / TypeScript / AI</span>
      <span>© 2026</span>
    </footer>
  )
}

export function HomePage() {
  return (
    <>
      <div className="noise" aria-hidden />
      <main>
        <HeroSection />
        <IdentitySection />
        <FieldsSection />
        <WorkSection />
        <NowSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
