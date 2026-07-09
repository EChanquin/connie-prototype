import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  trailing?: ReactNode
}

export function TextField({ label, trailing, className, id, ...props }: TextFieldProps) {
  return (
    <label className="block">
      {label && <span className="mb-50 block text-utility font-medium text-fg-secondary">{label}</span>}
      <span className="flex h-12 items-center gap-75 rounded-sm border border-border-subtle bg-bg-primary px-200 focus-within:border-border-brand">
        <input
          id={id}
          className={cn('w-full bg-transparent text-body text-fg-primary outline-none placeholder:text-fg-secondary', className)}
          {...props}
        />
        {trailing}
      </span>
    </label>
  )
}
