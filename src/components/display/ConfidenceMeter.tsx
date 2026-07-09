import { cn } from '@/lib/cn'
import type { Confidence } from '@/types'

const map: Record<Confidence, { w: string; color: string }> = {
  High: { w: 'w-full', color: 'bg-rating-excellent' },
  Medium: { w: 'w-2/3', color: 'bg-rating-good' },
  Low: { w: 'w-1/3', color: 'bg-rating-fair' },
}

export function ConfidenceMeter({ level }: { level: Confidence }) {
  const { w, color } = map[level]
  return (
    <div className="flex items-center gap-75">
      <span className="text-utility text-fg-secondary">Confidence:</span>
      <div className="h-1.5 w-16 overflow-hidden rounded-pill bg-bg-tertiary">
        <div className={cn('h-full rounded-pill', w, color)} />
      </div>
      <span className="text-utility font-medium text-fg-primary">{level}</span>
    </div>
  )
}
