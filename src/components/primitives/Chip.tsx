import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ChipProps {
  children: ReactNode
  selected?: boolean
  onClick?: () => void
  leadingIcon?: ReactNode
  as?: 'button' | 'span'
}

export function Chip({ children, selected, onClick, leadingIcon, as = 'button' }: ChipProps) {
  const cls = cn(
    'inline-flex items-center gap-50 rounded-pill border px-200 py-75 text-utility font-medium transition-colors',
    selected
      ? 'border-border-brand bg-brand-muted text-fg-brand'
      : 'border-border-subtle bg-bg-primary text-fg-primary hover:bg-bg-secondary',
  )
  if (as === 'span') return <span className={cls}>{leadingIcon}{children}</span>
  return (
    <button type="button" className={cls} onClick={onClick}>
      {leadingIcon}
      {children}
    </button>
  )
}
