import type { ReactNode } from 'react'
import { IconFeather } from '@/components/icons'

/** Connie's intro/greeting block used at the top of panels. */
export function BotIntroduction({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex gap-100">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-fg-inverse">
        <IconFeather size={16} />
      </span>
      <div>
        <div className="text-body font-semibold text-fg-primary">{title}</div>
        {children && <div className="mt-50 text-utility text-fg-secondary">{children}</div>}
      </div>
    </div>
  )
}
