import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageTransition } from '../../features/page-transition/ui/PageTransition'
import { useSessionJournal } from '../../features/session-log/model/useSessionLog'
import { useSystemBoot } from '../../features/system-boot/model/useSystemBoot'
import { CommandPalette } from '../../widgets/command-palette/ui/CommandPalette'
import { SystemNav } from '../../widgets/system-nav/ui/SystemNav'
import { SystemStatus } from '../../widgets/system-status/ui/SystemStatus'

function RouteFallback() {
  return (
    <div className="system-placeholder" role="status">
      ЗАГРУЗКА МОДУЛЯ
    </div>
  )
}

export function SystemShell() {
  const status = useSystemBoot()
  const { pathname } = useLocation()
  useSessionJournal(pathname, status)

  return (
    <div className="system-shell">
      <SystemNav />
      <SystemStatus status={status} />
      <CommandPalette bootStatus={status} />
      <div className="system-shell__content">
        <Suspense fallback={<RouteFallback />}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </div>
    </div>
  )
}
