import { describe, expect, it } from 'vitest'
import { projects } from '../../../entities/project/model/projects'
import { projectPath, systemRoutes } from '../../../shared/config/routes'
import { filterCommands, getPaletteCommands } from './commands'

describe('palette commands', () => {
  it('includes every system route, both projects, status, and diagnostics', () => {
    const ids = getPaletteCommands().map((command) => command.id)

    expect(ids).toEqual(
      expect.arrayContaining([
        ...systemRoutes.map((route) => route.id),
        'job-agent',
        'web-experiments',
        'status',
        'diagnostics',
      ]),
    )
  })

  it('maps routes and projects to their paths', () => {
    const commands = getPaletteCommands()

    for (const route of systemRoutes) {
      expect(commands.find((command) => command.id === route.id)?.href).toBe(
        route.path,
      )
    }

    for (const project of projects) {
      expect(commands.find((command) => command.id === project.slug)?.href).toBe(
        projectPath(project.slug),
      )
    }
  })

  it('filters commands by substring, ignoring case', () => {
    const commands = getPaletteCommands()

    expect(filterCommands(commands, 'profile').map((command) => command.id)).toEqual(
      ['profile'],
    )
    expect(
      filterCommands(commands, 'JOB').some((command) => command.id === 'job-agent'),
    ).toBe(true)
    expect(
      filterCommands(commands, 'diag').some(
        (command) => command.id === 'diagnostics',
      ),
    ).toBe(true)
  })
})
