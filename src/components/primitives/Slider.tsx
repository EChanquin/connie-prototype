import { cn } from '@/lib/cn'

interface SliderProps {
  value: number
  onChange: (v: number) => void
  label?: string
  showValue?: boolean
}

export function Slider({ value, onChange, label, showValue = true }: SliderProps) {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-50 flex items-center justify-between">
          {label && <span className="text-utility font-medium text-fg-primary">{label}</span>}
          {showValue && <span className="text-utility text-fg-secondary">{value}</span>}
        </div>
      )}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'h-1.5 w-full cursor-pointer appearance-none rounded-pill bg-bg-tertiary accent-brand',
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-pill [&::-webkit-slider-thumb]:bg-brand',
        )}
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${value}%, var(--color-bg-tertiary) ${value}%)`,
        }}
      />
    </div>
  )
}
