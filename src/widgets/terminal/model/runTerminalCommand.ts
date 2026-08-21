import { profile } from '../../../entities/profile/model/profile'
import { projects } from '../../../entities/project/model/projects'
import { projectPath, systemRoutes } from '../../../shared/config/routes'
import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'

export type TerminalContext = {
  pathname: string
  bootStatus: SystemBootState
  reducedMotion: boolean
  pointer: 'fine' | 'coarse' | 'none'
}

export type TerminalResult = {
  output: string[]
  navigateTo?: string
  clear?: boolean
}

function resolveOpenTarget(token: string): string | undefined {
  const trimmed = token.trim().toLowerCase()
  if (!trimmed) return undefined
  if (trimmed === '/' || trimmed === 'index') return '/'

  const asPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const byPath = systemRoutes.find((route) => route.path === asPath)
  if (byPath) return byPath.path

  const byId = systemRoutes.find((route) => route.id === trimmed)
  if (byId) return byId.path

  const project = projects.find((item) => item.slug === trimmed)
  if (project) return projectPath(project.slug)

  return undefined
}

export function runTerminalCommand(
  input: string,
  context: TerminalContext,
): TerminalResult {
  const trimmed = input.trim()
  const [command = '', ...rest] = trimmed.split(/\s+/)
  const name = command.toLowerCase()

  if (name === 'help') {
    return {
      output: [
        'help — список команд',
        'whoami — кто владеет системой',
        'status — состояние загрузки',
        'diagnostics — маршрут, reduced-motion, pointer',
        'open <path> — открыть модуль или проект',
        'clear — очистить буфер',
      ],
    }
  }

  if (name === 'whoami') {
    return { output: [`Юлия Ешкилева — ${profile.role}`] }
  }

  if (name === 'status') {
    return { output: [context.bootStatus] }
  }

  if (name === 'diagnostics') {
    return {
      output: [
        `route: ${context.pathname}`,
        `reduced-motion: ${context.reducedMotion ? 'reduce' : 'no-preference'}`,
        `pointer: ${context.pointer}`,
      ],
    }
  }

  if (name === 'clear') {
    return { output: [], clear: true }
  }

  if (name === 'open') {
    const target = resolveOpenTarget(rest.join(' '))
    if (!target) {
      return { output: [`путь не найден: ${rest.join(' ')}`] }
    }
    return { output: [`open ${target}`], navigateTo: target }
  }

  if (name === 'sudo') {
    return { output: ['отказ: этот терминал не выдаёт привилегии'] }
  }

  return { output: [`команда не найдена: ${trimmed}. введите help`] }
}
