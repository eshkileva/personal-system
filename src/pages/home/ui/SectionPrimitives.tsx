import type { ReactNode } from 'react'

type SectionLabelProps = {
  number: string
  children: ReactNode
}

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.14em] text-code">
      <strong className="font-normal text-electric">/ {number}</strong> — {children}
    </div>
  )
}

type PageSectionProps = {
  children: ReactNode
  className?: string
}

export function PageSection({ children, className = '' }: PageSectionProps) {
  return (
    <section
      className={`relative border-b border-line px-[7vw] py-[clamp(5rem,12vw,9.375rem)] lg:px-[6vw] ${className}`.trim()}
    >
      {children}
    </section>
  )
}

type SectionTitleProps = {
  children: ReactNode
  className?: string
}

export function SectionTitle({
  children,
  className = '',
}: SectionTitleProps) {
  return (
    <h2
      className={`max-w-[1100px] font-display text-[clamp(2.5rem,11vw,9rem)] uppercase leading-[0.79] tracking-[-0.075em] lg:text-[clamp(4.5rem,10.5vw,10.3125rem)] ${className}`.trim()}
    >
      {children}
    </h2>
  )
}
