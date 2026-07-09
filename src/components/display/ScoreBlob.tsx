import { cn } from '@/lib/cn'
import type { RatingLevel } from '@/types'

export function ratingFromScore(score: number): RatingLevel {
  if (score >= 90) return 'excellent'
  if (score >= 80) return 'very-good'
  if (score >= 65) return 'good'
  if (score >= 45) return 'fair'
  return 'poor'
}

const ratingColor: Record<RatingLevel, string> = {
  excellent: 'bg-rating-excellent',
  'very-good': 'bg-rating-very-good',
  good: 'bg-rating-good',
  fair: 'bg-rating-fair',
  poor: 'bg-rating-poor',
}

/** Large CR score circle (e.g. the "91"). */
export function ScoreBlob({ score, size = 'lg' }: { score: number; size?: 'sm' | 'lg' }) {
  const rating = ratingFromScore(score)
  const dim = size === 'lg' ? 'h-16 w-16 text-h2' : 'h-11 w-11 text-title4'
  const light = rating === 'good' || rating === 'very-good'
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-pill font-semibold',
        dim,
        ratingColor[rating],
        light ? 'text-fg-primary' : 'text-fg-inverse',
      )}
    >
      {score}
    </div>
  )
}

/** Small square rating blob used inline in metric rows. */
export function RatingBlob({ rating }: { rating: RatingLevel }) {
  return <span className={cn('inline-block h-4 w-4 rounded-[4px]', ratingColor[rating])} />
}
