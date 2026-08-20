import { projects } from './projects'
import type { Project } from './types'

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(project: Project) {
  return getProjectBySlug(project.nextProjectSlug)
}
