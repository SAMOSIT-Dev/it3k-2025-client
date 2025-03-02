import { ReactNode } from 'react'

export default function ScheduleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-auto overflow-auto overflow-x-hidden h-auto relative bg-black-300 min-h-0">{children}</div>
  )
}
