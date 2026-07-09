import type { Product } from '@/types'
import { StarRating } from '@/components/display/StarRating'
import { Badge } from '@/components/display/Badge'

/** Retailer-style product tile (the search-results cards behind Connie). */
export function ProductCard({ product, highlighted }: { product: Product; highlighted?: boolean }) {
  return (
    <div
      className={cardCls(highlighted)}
    >
      {highlighted && (
        <div className="absolute -top-2 left-3">
          <Badge tone="brand">★ CR Pick</Badge>
        </div>
      )}
      <img src={product.image} alt={product.name} className="mx-auto h-32 w-32 object-contain" />
      <div className="mt-100 space-y-50">
        <div className="text-utility text-fg-secondary">{product.brand}</div>
        <div className="line-clamp-2 text-body font-medium text-fg-primary">{product.name}</div>
        <StarRating rating={product.communityRating} count={product.communityCount} />
        <div className="text-title4 font-semibold text-fg-primary">${product.price}</div>
        <div className="text-utility text-fg-secondary">FREE delivery Thu, Jun 22</div>
      </div>
    </div>
  )
}

function cardCls(highlighted?: boolean) {
  return [
    'relative rounded-sm border bg-bg-primary p-200',
    highlighted ? 'border-border-brand shadow-subtle' : 'border-border-subtle',
  ].join(' ')
}
