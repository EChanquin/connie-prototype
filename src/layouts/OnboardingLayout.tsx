import type { ReactNode } from 'react'
import { ConniePanel } from './ConniePanel'
import { RetailBackdrop } from './RetailBackdrop'

/** Onboarding screens: the Connie card centered over a dimmed retailer page. */
export function OnboardingLayout({
  children,
  footer,
  showChatInput = false,
  width = 460,
}: {
  children: ReactNode
  footer?: ReactNode
  showChatInput?: boolean
  width?: number
}) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <RetailBackdrop />
      <div className="absolute inset-0 bg-fg-primary/30" />
      <div className="absolute inset-0 flex items-center justify-center p-300">
        <ConniePanel width={width} footer={footer} showChatInput={showChatInput}>
          {children}
        </ConniePanel>
      </div>
    </div>
  )
}
