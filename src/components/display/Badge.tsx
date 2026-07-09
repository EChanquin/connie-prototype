import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'brand' | 'neutral' | 'attention' | 'blue'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-muted text-fg-brand',
  neutral: 'bg-bg-tertiary text-fg-secondary',
  attention: 'bg-bg-attention-muted text-fg-attention',
  blue: 'bg-[#e2edf7] text-accent-blue',
}

export function Badge({ children, tone = 'brand' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={cn('inline-flex items-center rounded-pill px-100 py-[2px] text-utility font-medium', tones[tone])}>
      {children}
    </span>
  )
}
