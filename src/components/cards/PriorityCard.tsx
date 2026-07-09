import type { Priority } from '@/types'
import { Slider } from '@/components/primitives/Slider'
import { Badge } from '@/components/display/Badge'

/** A bento-grid priority card with an adjustable weight slider. */
export function PriorityCard({ priority, onWeight }: { priority: Priority; onWeight: (v: number) => void }) {
  return (
    <div className="rounded-sm border border-border-subtle bg-bg-primary p-200">
      <div className="mb-100 flex items-center justify-between">
        <span className="text-body font-medium text-fg-primary">{priority.label}</span>
        {priority.inferred && <Badge tone="blue">Inferred</Badge>}
      </div>
      <Slider value={priority.weight} onChange={onWeight} showValue />
    </div>
  )
}
