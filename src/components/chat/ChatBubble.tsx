import type { ChatTurn } from '@/types'
import { cn } from '@/lib/cn'
import { IconFeather } from '@/components/icons'

export function ChatBubble({ turn }: { turn: ChatTurn }) {
  const isConnie = turn.role === 'connie'
  return (
    <div className={cn('flex gap-75', isConnie ? 'justify-start' : 'justify-end')}>
      {isConnie && (
        <span className="mt-50 flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-brand text-fg-inverse">
          <IconFeather size={14} />
        </span>
      )}
      <div className={cn('max-w-[80%]', isConnie ? 'items-start' : 'items-end')}>
        <div
          className={cn(
            'rounded-sm px-200 py-100 text-body',
            isConnie ? 'bg-bg-secondary text-fg-primary' : 'bg-brand text-fg-inverse',
          )}
        >
          {turn.text}
        </div>
        <div className={cn('mt-50 text-utility text-fg-secondary', isConnie ? 'text-left' : 'text-right')}>
          {isConnie ? 'Assistant' : 'You'} • {turn.time}
        </div>
      </div>
    </div>
  )
}
