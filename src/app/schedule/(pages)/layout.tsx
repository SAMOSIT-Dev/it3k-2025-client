import { ReactNode } from 'react'

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 w-screen overflow-auto h-screen">{children}</div>
}
