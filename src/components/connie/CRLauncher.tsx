import type { CSSProperties } from 'react'

/** The floating CR "C" launcher button (Navi bar collapsed). #c4e860, 60×60, 8px radius. */
export function CRLauncher({ style, active = true }: { style?: CSSProperties; active?: boolean }) {
  return (
    <div className="absolute" style={style}>
      <div className="relative size-[60px] rounded-[8px] bg-cr-launcher">
        <span className="absolute left-[18px] top-[7px] font-semibold text-title1 text-fg-primary">C</span>
        {active && (
          <span className="absolute left-[51px] top-[-4px] size-[14px] rounded-pill border-2 border-white bg-brand" />
        )}
      </div>
    </div>
  )
}
