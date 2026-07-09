import type { ReactNode } from 'react'

/**
 * A faithful 1440×900 Figma frame canvas. Children are positioned with the exact
 * absolute coordinates from Figma. The frame scales down to fit narrow viewports
 * but never changes the internal layout.
 */
export function FigmaFrame({
  children,
  backdrop,
  backdropOpacity = 0.4,
  bg = '#ffffff',
}: {
  children: ReactNode
  backdrop?: string
  backdropOpacity?: number
  bg?: string
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-auto bg-[#e6e6e3]">
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: 1440, height: 900, background: bg }}
      >
        {backdrop && (
          <img
            alt=""
            src={backdrop}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: backdropOpacity }}
          />
        )}
        {children}
      </div>
    </div>
  )
}
