import type { ReactNode } from 'react'

type SectionLabelProps = {
  number: string
  children: ReactNode
}

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <div className="font-mono text-xs uppercase tracking-[0.14em] text-code">
      <strong className="font-normal text-electric">/ {number}</strong> —{' '}
      {children}
    </div>
  )
}

type PageSectionProps = {
  children: ReactNode
  className?: string
}

export function PageSection({ children, className = '' }: PageSectionProps) {
  return (
    <main
      className={`relative min-h-screen px-[7vw] py-[clamp(5rem,12vw,9.375rem)] lg:px-[6vw] ${className}`.trim()}
    >
      {children}
    </main>
  )
}
