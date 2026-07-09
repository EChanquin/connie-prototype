import type { Product } from '@/types'
import { RatingBlob } from '@/components/display/ScoreBlob'

/** Side-by-side comparison grid used in Decision Support "Table" view. */
export function ComparisonTable({ products }: { products: Product[] }) {
  const metricKeys = products[0].metrics.map((m) => ({ key: m.key, label: m.label }))
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-utility">
        <thead>
          <tr>
            <th className="p-100 text-left font-medium text-fg-secondary">Feature</th>
            {products.map((p) => (
              <th key={p.id} className="p-100 text-center font-semibold text-fg-primary">
                {p.name.split(' ').slice(-2).join(' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-border-subtle">
            <td className="p-100 text-fg-secondary">CR Score</td>
            {products.map((p) => (
              <td key={p.id} className="p-100 text-center font-semibold text-fg-primary">
                {p.crScore}
              </td>
            ))}
          </tr>
          <tr className="border-t border-border-subtle">
            <td className="p-100 text-fg-secondary">Price</td>
            {products.map((p) => (
              <td key={p.id} className="p-100 text-center text-fg-primary">
                ${p.price}
              </td>
            ))}
          </tr>
          {metricKeys.map((mk) => (
            <tr key={mk.key} className="border-t border-border-subtle">
              <td className="p-100 text-fg-secondary">{mk.label}</td>
              {products.map((p) => {
                const m = p.metrics.find((x) => x.key === mk.key)!
                return (
                  <td key={p.id} className="p-100">
                    <div className="flex justify-center">
                      <RatingBlob rating={m.rating} />
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
