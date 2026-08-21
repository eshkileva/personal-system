import type { SystemBootState } from '../../../features/system-boot/model/useSystemBoot'

type SystemStatusProps = {
  status: SystemBootState
}

export function SystemStatus({ status }: SystemStatusProps) {
  return (
    <div className="system-status" role="status">
      {status}
    </div>
  )
}
