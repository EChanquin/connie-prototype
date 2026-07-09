import type { Product } from '@/types'
import { ScoreBlob } from '@/components/display/ScoreBlob'
import { ConfidenceMeter } from '@/components/display/ConfidenceMeter'
import { WhyThisFits } from '@/components/display/WhyThisFits'
import { Button } from '@/components/primitives/Button'
import { IconEdit } from '@/components/icons'

/** A ranked pick card in Decision Support "Cards" view. */
export function DecisionCard({
  product,
  rank,
  editable,
  expanded,
  onExpand,
}: {
  product: Product
  rank: number
  editable?: boolean
  expanded?: boolean
  onExpand?: () => void
}) {
  return (
    <div className="rounded-sm border border-border-subtle bg-bg-primary p-200">
      <div className="flex items-start gap-100">
        <span className="text-utility font-semibold text-fg-secondary">#{rank}</span>
        <img src={product.image} alt="" className="h-14 w-14 object-contain" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-body font-medium text-fg-primary">{product.name}</span>
            {editable && <IconEdit size={16} className="text-fg-secondary" />}
          </div>
          <div className="mt-50 flex items-center gap-100">
            <span className="text-utility text-fg-secondary">${product.price}</span>
            <ConfidenceMeter level={product.confidence} />
          </div>
        </div>
        <ScoreBlob score={product.crScore} size="sm" />
      </div>

      {expanded && (
        <div className="mt-200 space-y-200">
          <WhyThisFits reasons={product.whyThisFits} title={`Why this fits you`} />
          <Button variant="secondary" size="sm" fullWidth>
            View full review
          </Button>
        </div>
      )}
      {!expanded && onExpand && (
        <button onClick={onExpand} className="mt-100 text-utility font-medium text-fg-brand">
          Why this fits you →
        </button>
      )}
    </div>
  )
}
