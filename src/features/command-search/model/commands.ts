import { formatProjectTitle } from '../../../entities/project/model/selectors'
import { projects } from '../../../entities/project/model/projects'
import { projectPath, systemRoutes } from '../../../shared/config/routes'

export type PaletteAction = 'status' | 'diagnostics'

export type PaletteCommand = {
  id: string
  label: string
  keywords: string
  href?: string
  action?: PaletteAction
}

export function getPaletteCommands(): PaletteCommand[] {
  const routes: PaletteCommand[] = systemRoutes.map((route) => ({
    id: route.id,
    label: `system://${route.label}`,
    keywords: `${route.id} ${route.label} ${route.path} ${route.title}`,
    href: route.path,
  }))

  const projectCommands: PaletteCommand[] = projects.map((project) => ({
    id: project.slug,
    label: formatProjectTitle(project.title),
    keywords: `${project.slug} ${formatProjectTitle(project.title)} ${projectPath(project.slug)}`,
    href: projectPath(project.slug),
  }))

  const actions: PaletteCommand[] = [
    {
      id: 'status',
      label: 'status',
      keywords: 'status boot',
      action: 'status',
    },
    {
      id: 'diagnostics',
      label: 'diagnostics',
      keywords: 'diagnostics system',
      action: 'diagnostics',
    },
    {
      id: 'terminal',
      label: 'terminal',
      keywords: 'terminal console xterm',
      href: '/',
    },
  ]

  return [...routes, ...projectCommands, ...actions]
}

export function filterCommands(
  commands: PaletteCommand[],
  query: string,
): PaletteCommand[] {
  const needle = query.trim().toLowerCase()
  if (!needle) {
    return commands
  }

  return commands.filter((command) => {
    const haystack = [
      command.id,
      command.label,
      command.keywords,
      command.href ?? '',
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(needle)
  })
}
