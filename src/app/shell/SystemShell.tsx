import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { useSystemBoot } from '../../features/system-boot/model/useSystemBoot'
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

  return (
    <div className="system-shell">
      <SystemNav />
      <SystemStatus status={status} />
      <div className="system-shell__content">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
