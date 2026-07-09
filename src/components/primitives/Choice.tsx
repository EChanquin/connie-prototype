import { cn } from '@/lib/cn'
import { IconCheck } from '@/components/icons'

interface ChoiceProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  type?: 'checkbox' | 'radio'
}

/** Checkbox / Radio primitive — same interaction, different corner radius. */
export function Choice({ checked, onChange, label, type = 'checkbox' }: ChoiceProps) {
  return (
    <button
      type="button"
      role={type}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-100 text-left"
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
          type === 'radio' ? 'rounded-pill' : 'rounded-[6px]',
          checked ? 'border-brand bg-brand text-fg-inverse' : 'border-border-strong bg-bg-primary',
        )}
      >
        {checked && (type === 'radio' ? <span className="h-2 w-2 rounded-pill bg-fg-inverse" /> : <IconCheck size={14} />)}
      </span>
      <span className="text-body text-fg-primary">{label}</span>
    </button>
  )
}
