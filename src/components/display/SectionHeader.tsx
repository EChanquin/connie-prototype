import type { ReactNode } from 'react'

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-title4 font-semibold text-fg-primary">{title}</h3>
      {action}
    </div>
  )
}
