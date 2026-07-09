import type { ReactNode } from 'react'

export function Popover({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute z-30 w-80 rounded-sm border border-border-subtle bg-bg-primary p-200 shadow-panel"
      style={style}
    >
      {children}
    </div>
  )
}
