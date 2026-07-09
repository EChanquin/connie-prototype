import type { Metric } from '@/types'
import { RatingBlob } from './ScoreBlob'

export function MetricRow({ metric }: { metric: Metric }) {
  return (
    <div className="flex items-center gap-100">
      <span className="w-32 shrink-0 text-utility text-fg-secondary">{metric.label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-pill bg-bg-tertiary">
        <div className="h-full rounded-pill bg-brand" style={{ width: `${metric.score}%` }} />
      </div>
      <RatingBlob rating={metric.rating} />
    </div>
  )
}
