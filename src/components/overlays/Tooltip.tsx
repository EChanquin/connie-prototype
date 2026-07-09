import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Placement = 'top' | 'bottom' | 'left' | 'right'

/** Coach-mark style tooltip used for the guided tour (T1–T4). */
export function Tooltip({
  title,
  body,
  step,
  total,
  placement = 'bottom',
  onNext,
  onSkip,
  style,
}: {
  title: string
  body: string
  step?: number
  total?: number
  placement?: Placement
  onNext?: () => void
  onSkip?: () => void
  style?: React.CSSProperties
}) {
  return (
    <div
      className="absolute z-30 w-72 rounded-sm bg-fg-primary p-200 text-fg-inverse shadow-panel"
      style={style}
    >
      <div className={cn('absolute h-3 w-3 rotate-45 bg-fg-primary', arrowCls[placement])} />
      <div className="text-body font-semibold">{title}</div>
      <p className="mt-75 text-utility text-white/80">{body}</p>
      <div className="mt-200 flex items-center justify-between">
        {step && total ? (
          <span className="text-utility text-white/60">
            {step} / {total}
          </span>
        ) : (
          <span />
        )}
        <div className="flex gap-100">
          {onSkip && (
            <button onClick={onSkip} className="text-utility text-white/70 hover:text-white">
              Skip
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="rounded-pill bg-fg-inverse px-200 py-50 text-utility font-medium text-fg-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const arrowCls: Record<Placement, string> = {
  top: 'left-6 -bottom-1.5',
  bottom: 'left-6 -top-1.5',
  left: 'top-6 -right-1.5',
  right: 'top-6 -left-1.5',
}
