import { IconCheck } from '@/components/icons'

export function WhyThisFits({ reasons, title = 'Why this fits you' }: { reasons: string[]; title?: string }) {
  return (
    <div className="rounded-sm bg-bg-secondary p-200">
      <div className="mb-75 text-utility font-semibold uppercase tracking-wide text-fg-secondary">{title}</div>
      <ul className="space-y-50">
        {reasons.map((r, i) => (
          <li key={i} className="flex items-start gap-75 text-utility text-fg-primary">
            <IconCheck size={14} className="mt-[2px] shrink-0 text-fg-brand" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
