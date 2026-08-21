import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation()
  const reduced = prefersReducedMotion()

  return (
    <div
      className={reduced ? undefined : 'page-transition'}
      data-page-motion={reduced ? 'reduce' : 'animate'}
      data-testid="page-transition"
      key={pathname}
    >
      {children}
    </div>
  )
}
