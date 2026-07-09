import { cn } from '@/lib/cn'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-pill transition-colors',
        checked ? 'bg-brand' : 'bg-border-subtle',
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-pill bg-bg-primary shadow-subtle transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-[2px]',
        )}
      />
    </button>
  )
}
