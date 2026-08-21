import { getRouteByPath, type SystemPath } from './routes'

export type SeoConfig = {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
}

export const DEFAULT_SITE_ORIGIN = 'https://yeshkileva.dev'

export function seoFromRoute(
  path: SystemPath,
  origin: string = DEFAULT_SITE_ORIGIN,
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
  origin: string = DEFAULT_SITE_ORIGIN,
): SeoConfig {
  return {
    title: seoTitle,
    description: seoDescription,
    canonical: `${origin}/projects/${slug}`,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
  }
}
