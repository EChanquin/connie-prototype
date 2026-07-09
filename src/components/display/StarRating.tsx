import { IconStar } from '@/components/icons'
import { cn } from '@/lib/cn'

export function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-50">
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <IconStar key={i} size={14} className={cn(i < Math.round(rating) ? 'text-rating-good' : 'text-border-subtle')} />
        ))}
      </div>
      <span className="text-utility font-medium text-fg-primary">{rating.toFixed(1)}</span>
      {count != null && <span className="text-utility text-fg-secondary">({count.toLocaleString()})</span>}
    </div>
  )
}
