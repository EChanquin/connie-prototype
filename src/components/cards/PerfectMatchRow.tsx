import type { ReactNode } from 'react'
import { IconCaretRight } from '@/components/icons'

/** A single row in the "Perfect Match" summary list (Top Rated / Best Value / City Certified). */
export function PerfectMatchRow({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-100 rounded-sm border border-border-subtle bg-bg-primary p-200 text-left transition-colors hover:bg-bg-secondary"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-brand-muted text-fg-brand">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-body font-medium text-fg-primary">{title}</span>
        <span className="block text-utility text-fg-secondary">{subtitle}</span>
      </span>
      <IconCaretRight size={18} className="text-fg-secondary" />
    </button>
  )
}
