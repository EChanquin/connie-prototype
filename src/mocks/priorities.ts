import type { Priority, Community, BudgetBand } from '@/types'

export const defaultPriorities: Priority[] = [
  { key: 'safety', label: 'Safety', weight: 90, inferred: false },
  { key: 'allTerrain', label: 'All-Terrain', weight: 75, inferred: true },
  { key: 'easyFold', label: 'One-Hand Fold', weight: 70, inferred: true },
  { key: 'durability', label: 'Durability', weight: 60, inferred: false },
  { key: 'lightweight', label: 'Lightweight', weight: 45, inferred: false },
  { key: 'easeOfUse', label: 'Ease of use', weight: 55, inferred: true },
]

export const communities: Community[] = [
  { id: 'fb-parents', name: 'Facebook groups', type: 'facebook', selected: false },
  { id: 'reddit-strollers', name: 'Reddit', type: 'reddit', selected: false },
  { id: 'ig-momlife', name: 'Instagram', type: 'instagram', selected: false },
]

export const budgetBands: BudgetBand[] = ['Under $200', '$200-$600', '$600-$1000', '$1000+']
