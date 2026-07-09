import { products } from '@/mocks/products'
import { ProductCard } from '@/components/cards/ProductCard'

/** A simulated retailer search-results page rendered behind the Connie panel. */
export function RetailBackdrop({ highlightId }: { highlightId?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-bg-primary">
      {/* Retailer top bar */}
      <div className="flex h-14 items-center gap-300 border-b border-border-subtle px-300">
        <span className="text-title4 font-bold text-fg-primary">shopmart</span>
        <div className="flex h-9 flex-1 items-center rounded-pill bg-bg-tertiary px-200 text-utility text-fg-secondary">
          strollers
        </div>
        <div className="flex gap-200 text-utility text-fg-secondary">
          <span>Account &amp; Lists</span>
          <span>Returns</span>
          <span>🛒 Cart</span>
        </div>
      </div>

      <div className="px-300 py-200">
        <div className="mb-200 text-utility text-fg-secondary">
          1-24 of 312 results for <span className="font-semibold text-fg-primary">"strollers"</span>
        </div>
        <div className="mb-100 text-title4 font-semibold text-fg-primary">Today's deals</div>
        <div className="grid grid-cols-4 gap-200">
          {products.concat(products).slice(0, 8).map((p, i) => (
            <ProductCard key={`${p.id}-${i}`} product={p} highlighted={p.id === highlightId} />
          ))}
        </div>
      </div>
    </div>
  )
}
