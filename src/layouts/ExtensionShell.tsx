import type { ReactNode } from 'react'
import { NaviBar } from './NaviBar'
import { RetailBackdrop } from './RetailBackdrop'

/** Full browser-extension frame: Navi bar + retailer page + a slot for Connie's panel. */
export function ExtensionShell({
  children,
  highlightId,
  align = 'right',
}: {
  children?: ReactNode
  highlightId?: string
  align?: 'right' | 'center'
}) {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-bg-tertiary">
      <NaviBar />
      <div className="relative flex-1">
        <RetailBackdrop highlightId={highlightId} />
        {children && (
          <div
            className={
              align === 'center'
                ? 'absolute inset-0 flex items-center justify-center p-300'
                : 'absolute right-6 top-6 bottom-6 flex items-start'
            }
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
