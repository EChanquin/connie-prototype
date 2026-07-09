import { Button } from '@/components/primitives/Button'
import { Chip } from '@/components/primitives/Chip'
import { Badge } from '@/components/display/Badge'
import { ScoreBlob } from '@/components/display/ScoreBlob'
import { ConfidenceMeter } from '@/components/display/ConfidenceMeter'
import { StarRating } from '@/components/display/StarRating'

const swatches = [
  ['Brand', 'var(--color-brand)'],
  ['FG primary', 'var(--color-fg-primary)'],
  ['FG secondary', 'var(--color-fg-secondary)'],
  ['Attention', 'var(--color-bg-attention)'],
  ['Excellent', 'var(--color-rating-excellent)'],
  ['Very good', 'var(--color-rating-very-good)'],
  ['Good', 'var(--color-rating-good)'],
  ['Fair', 'var(--color-rating-fair)'],
  ['Poor', 'var(--color-rating-poor)'],
  ['Blue', 'var(--color-accent-blue)'],
]

export function Gallery() {
  return (
    <div className="min-h-screen bg-bg-secondary p-600">
      <div className="mx-auto max-w-3xl space-y-400">
        <h1 className="text-h2 font-semibold text-fg-primary">★ Connie — Design System</h1>

        <section>
          <h2 className="mb-100 text-title4 font-semibold">Palette</h2>
          <div className="flex flex-wrap gap-100">
            {swatches.map(([name, color]) => (
              <div key={name} className="w-24">
                <div className="h-16 w-full rounded-sm border border-border-subtle" style={{ background: color }} />
                <div className="mt-50 text-utility text-fg-secondary">{name}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-100">
          <h2 className="text-title4 font-semibold">Typography</h2>
          <p className="text-h1">Heading 1</p>
          <p className="text-h2">Heading 2</p>
          <p className="text-h3">Heading 3</p>
          <p className="text-title4">Title 4</p>
          <p className="text-body">Body — CR's test data and community sentiment, side by side.</p>
          <p className="text-utility text-fg-secondary">Utility / caption text</p>
        </section>

        <section className="space-y-100">
          <h2 className="text-title4 font-semibold">Buttons &amp; chips</h2>
          <div className="flex flex-wrap items-center gap-100">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Chip selected>Selected</Chip>
            <Chip>Unselected</Chip>
            <Badge>Brand</Badge>
            <Badge tone="attention">Attention</Badge>
            <Badge tone="blue">Community</Badge>
          </div>
        </section>

        <section className="space-y-100">
          <h2 className="text-title4 font-semibold">Data display</h2>
          <div className="flex flex-wrap items-center gap-300">
            <ScoreBlob score={91} />
            <ScoreBlob score={65} size="sm" />
            <ConfidenceMeter level="High" />
            <StarRating rating={4.7} count={2103} />
          </div>
        </section>
      </div>
    </div>
  )
}
