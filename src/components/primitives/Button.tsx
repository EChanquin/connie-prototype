import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-fg-inverse hover:opacity-90 active:opacity-80 border border-transparent',
  secondary:
    'bg-bg-primary text-fg-primary border border-border-strong hover:bg-bg-secondary active:bg-bg-tertiary',
  ghost: 'bg-transparent text-fg-primary hover:bg-bg-tertiary border border-transparent',
  danger: 'bg-bg-attention text-fg-inverse hover:opacity-90 border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-100 text-utility gap-50',
  md: 'h-11 px-200 text-body gap-75',
  lg: 'h-12 px-300 text-body gap-75',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-pill font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}
