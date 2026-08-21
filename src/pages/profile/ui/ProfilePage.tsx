import { profile } from '../../../entities/profile/model/profile'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/profile')

export function ProfilePage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="01">ПРОФИЛЬ</SectionLabel>
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-electric">
        {profile.role}
      </p>
      <h1
        aria-label={profile.heading}
        className="identity-title mt-8 max-w-6xl font-display text-[clamp(2.75rem,10vw,9rem)] uppercase leading-[0.84] tracking-[0.02em]"
      >
        ПИШУ КОД.
        <br />
        <span className="text-outline-strong">РАЗБИРАЮ СИСТЕМЫ.</span>
      </h1>
      <div className="mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <p className="text-[clamp(1.5rem,4vw,3rem)] leading-[1.12] tracking-[0.01em]">
          {profile.lead}
        </p>
        <div className="space-y-6 text-lg leading-relaxed text-copy">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <section aria-label="Схема идентичности" className="identity-schema">
        <p className="identity-schema__legend">SCHEMA / IDENTITY</p>
        <ol className="identity-schema__list">
          {profile.identity.map((node) => (
            <li className="identity-schema__node" key={node.id}>
              <span className="identity-schema__id">{node.id}</span>
              <h2 className="identity-schema__title">{node.title}</h2>
              <p className="identity-schema__text">{node.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </PageSection>
  )
}
