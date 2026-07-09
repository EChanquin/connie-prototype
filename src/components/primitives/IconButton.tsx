import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  label: string
  active?: boolean
}

export function IconButton({ children, label, active, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors',
        active ? 'bg-brand-muted text-fg-brand' : 'text-fg-secondary hover:bg-bg-tertiary',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
