import type { Annotation } from '@/types'

/** One annotation per verdict state — maps 1:1 to the four inline-annotation frames. */
export const annotations: Annotation[] = [
  {
    id: 'verified-both',
    claim: 'All-terrain wheels handle any surface',
    verdict: 'verified-cr-community',
    explanation:
      "CR's testing confirms this and long-term owners in your communities agree — the wheels handle sidewalks, gravel, and curbs.",
    sources: [
      { label: 'CR Labs test', kind: 'cr' },
      { label: '2,103 community reports', kind: 'community' },
    ],
  },
  {
    id: 'community-only',
    claim: 'Folds small enough for any car trunk',
    verdict: 'verified-community-only',
    explanation:
      'CR has not lab-tested trunk fit, but real owners in your communities consistently confirm it fits compact trunks.',
    sources: [{ label: '480 community reports', kind: 'community' }],
  },
  {
    id: 'misleading',
    claim: '#1 safest stroller on the market',
    verdict: 'misleading',
    explanation:
      "This is a marketing claim, not a CR finding. CR's safety score is strong but not #1, and no community data supports an absolute ranking.",
    sources: [{ label: 'CR safety rating: Very Good', kind: 'cr' }],
  },
  {
    id: 'unverifiable',
    claim: 'Loved by 1 million parents worldwide',
    verdict: 'unverifiable',
    explanation:
      'Neither CR testing nor your communities can verify this figure. Treat it as unverified marketing copy.',
    sources: [],
  },
]

export const getAnnotation = (id: string) => annotations.find((a) => a.id === id)
