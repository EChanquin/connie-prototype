import type { Product } from '@/types'
import { ScoreBlob } from '@/components/display/ScoreBlob'
import { MetricRow } from '@/components/display/MetricRow'
import { Badge } from '@/components/display/Badge'
import { StarRating } from '@/components/display/StarRating'
import { IconBookmark } from '@/components/icons'

/** The expanded Connie "Perfect Match" / detailed metrics card. */
export function InsightCard({ product }: { product: Product }) {
  return (
    <div className="space-y-200">
      <div className="flex items-start gap-200">
        <ScoreBlob score={product.crScore} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-50">
              {product.badges.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
            <IconBookmark size={18} className="text-fg-secondary" />
          </div>
          <p className="mt-75 text-body text-fg-primary">{product.tagline}</p>
        </div>
      </div>

      <div className="space-y-100">
        {product.metrics.map((m) => (
          <MetricRow key={m.key} metric={m} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border-subtle pt-100">
        <StarRating rating={product.communityRating} count={product.communityCount} />
        <span className="text-utility text-fg-secondary">Community 4.9</span>
      </div>
    </div>
  )
}
