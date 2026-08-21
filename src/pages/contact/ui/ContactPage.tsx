import { profile } from '../../../entities/profile/model/profile'
import { seoFromRoute } from '../../../shared/config/seo'
import { DocumentMeta } from '../../../shared/lib/seo/DocumentMeta'
import { PageSection, SectionLabel } from '../../../shared/ui/SectionPrimitives'

const seo = seoFromRoute('/contact')

const channels = [
  'frontend-задачи',
  'продуктовые интерфейсы',
  'работа рядом с аналитикой',
] as const

export function ContactPage() {
  return (
    <PageSection>
      <DocumentMeta config={seo} />
      <SectionLabel number="05">КОНТАКТ</SectionLabel>
      <h1 className="mt-8 max-w-6xl font-display text-[clamp(2.75rem,10vw,9rem)] uppercase leading-[0.92] tracking-[0.02em]">
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
      <section aria-label="Каналы связи" className="contact-channel">
        <p className="contact-channel__legend">ENDPOINTS</p>
        <ul className="contact-channel__endpoints">
          {profile.contacts.map((contact) => (
            <li key={contact.id}>
              <span>{contact.kind}</span>
              <a
                href={contact.href}
                className="contact-channel__link"
                {...(contact.href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                {contact.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="contact-channel__tags">
          {channels.map((channel) => (
            <li key={channel}>{channel}</li>
          ))}
        </ul>
      </section>
    </PageSection>
  )
}
