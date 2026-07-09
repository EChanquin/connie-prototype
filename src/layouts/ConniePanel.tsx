import type { ReactNode } from 'react'
import { IconFeather, IconX } from '@/components/icons'
import { ChatInput } from '@/components/chat/ChatInput'
import { cn } from '@/lib/cn'

interface ConniePanelProps {
  children: ReactNode
  title?: string
  headerAccessory?: ReactNode
  footer?: ReactNode
  showChatInput?: boolean
  chatPlaceholder?: string
  onClose?: () => void
  className?: string
  width?: number
}

/** The floating Connie bubble panel: Header + scrollable content + footer. */
export function ConniePanel({
  children,
  title = 'Consumer Reports',
  headerAccessory,
  footer,
  showChatInput = true,
  chatPlaceholder,
  onClose,
  className,
  width = 420,
}: ConniePanelProps) {
  return (
    <div
      className={cn('flex max-h-full flex-col overflow-hidden rounded-lg bg-bg-primary shadow-panel', className)}
      style={{ width }}
    >
      <header className="flex items-center justify-between border-b border-border-subtle px-200 py-100">
        <div className="flex items-center gap-75">
          <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-brand text-fg-inverse">
            <IconFeather size={16} />
          </span>
          <span className="text-body font-semibold text-fg-primary">{title}</span>
        </div>
        <div className="flex items-center gap-50">
          {headerAccessory}
          <button aria-label="Close" onClick={onClose} className="text-fg-secondary hover:text-fg-primary">
            <IconX size={18} />
          </button>
        </div>
      </header>

      <div className="scrollbar-thin flex-1 overflow-y-auto p-200">{children}</div>

      {(footer || showChatInput) && (
        <footer className="border-t border-border-subtle p-200">
          {footer ?? <ChatInput placeholder={chatPlaceholder} />}
        </footer>
      )}
    </div>
  )
}
