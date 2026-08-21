import { Link } from 'react-router-dom'
import { getSiteOrigin, type SeoConfig } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo: SeoConfig = {
  title: 'System not found — Personal System',
  description: 'Запрошенный модуль личной системы не найден.',
  canonical: `${getSiteOrigin()}/404`,
  ogTitle: 'System not found — Personal System',
  ogDescription: 'Запрошенный модуль личной системы не найден.',
}

export function NotFoundPage() {
  return (
    <PageSection className="grid content-center">
      <DocumentMeta config={seo} />
      <SectionLabel number="404">ОШИБКА МАРШРУТА</SectionLabel>
      <h1
        aria-label="SYSTEM NOT FOUND"
        className="mt-8 font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.84] tracking-[-0.04em]"
      >
        SYSTEM
        <br />
        <span className="text-outline-strong">NOT FOUND</span>
      </h1>
      <Link
        to="/"
        className="mt-12 w-fit cursor-pointer font-mono text-sm uppercase tracking-widest text-electric focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
      >
        К системному индексу <span aria-hidden="true">↗</span>
      </Link>
    </PageSection>
  )
}
