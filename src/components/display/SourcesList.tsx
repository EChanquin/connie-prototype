import type { Source } from '@/types'
import { cn } from '@/lib/cn'

export function SourcesList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-50">
      <span className="text-utility text-fg-secondary">Sources:</span>
      {sources.map((s, i) => (
        <span
          key={i}
          className={cn(
            'inline-flex items-center gap-50 rounded-pill px-100 py-[2px] text-utility font-medium',
            s.kind === 'cr' ? 'bg-brand-muted text-fg-brand' : 'bg-[#e2edf7] text-accent-blue',
          )}
        >
          {s.kind === 'cr' ? 'CR' : '◍'} {s.label}
        </span>
      ))}
    </div>
  )
}
