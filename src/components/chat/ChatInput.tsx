import { useState } from 'react'
import { IconArrowUp } from '@/components/icons'

export function ChatInput({
  placeholder = 'Ask Connie anything about this product…',
  onSend,
}: {
  placeholder?: string
  onSend?: (text: string) => void
}) {
  const [value, setValue] = useState('')
  const submit = () => {
    if (!value.trim()) return
    onSend?.(value.trim())
    setValue('')
  }
  return (
    <div className="flex items-center gap-75 rounded-pill border border-border-subtle bg-bg-primary px-200 py-75">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder={placeholder}
        className="w-full bg-transparent text-body text-fg-primary outline-none placeholder:text-fg-secondary"
      />
      <button
        onClick={submit}
        aria-label="Send"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-fg-inverse disabled:opacity-40"
        disabled={!value.trim()}
      >
        <IconArrowUp size={18} />
      </button>
    </div>
  )
}
