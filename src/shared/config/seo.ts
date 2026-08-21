import { getRouteByPath, type SystemPath } from './routes'

export type SeoConfig = {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
}

export const TEST_SITE_ORIGIN = 'http://localhost:5173'

export function getSiteOrigin(): string {
  if (import.meta.env.VITEST) {
    return TEST_SITE_ORIGIN
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return TEST_SITE_ORIGIN
}

export function seoFromRoute(
  path: SystemPath,
  origin: string = getSiteOrigin(),
): SeoConfig {
  const route = getRouteByPath(path)
  if (!route) {
    throw new Error(`Unknown system route: ${path}`)
  }

  const canonical = path === '/' ? origin : `${origin}${path}`

  return {
    title: route.title,
    description: route.description,
    canonical,
    ogTitle: route.title,
    ogDescription: route.description,
  }
}

export function seoFromProject(
  seoTitle: string,
  seoDescription: string,
  slug: string,
  origin: string = getSiteOrigin(),
): SeoConfig {
  return {
    title: seoTitle,
    description: seoDescription,
    canonical: `${origin}/projects/${slug}`,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
  }
}
