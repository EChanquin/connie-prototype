import { cn } from '@/lib/cn'

export function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-pill bg-brand-muted font-semibold text-fg-brand',
        size === 'sm' ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-utility',
      )}
    >
      {initials}
    </span>
  )
}

export function AvatarWithLabel({ initials, label, sub }: { initials: string; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-100">
      <Avatar initials={initials} />
      <div className="leading-tight">
        <div className="text-body font-medium text-fg-primary">{label}</div>
        {sub && <div className="text-utility text-fg-secondary">{sub}</div>}
      </div>
    </div>
  )
}
