import { create } from 'zustand'
import type { Priority, Community, PriorityKey, BudgetBand } from '@/types'
import { defaultPriorities, communities as seedCommunities } from '@/mocks/priorities'

interface PriorityState {
  priorities: Priority[]
  communities: Community[]
  budget: BudgetBand | null
  setWeight: (key: PriorityKey, weight: number) => void
  toggleCommunity: (id: string) => void
  setBudget: (b: BudgetBand) => void
  addPriority: (p: Priority) => void
}

export const usePriorityStore = create<PriorityState>((set) => ({
  priorities: defaultPriorities,
  communities: seedCommunities,
  budget: null,
  setWeight: (key, weight) =>
    set((s) => ({
      priorities: s.priorities.map((p) => (p.key === key ? { ...p, weight, inferred: false } : p)),
    })),
  toggleCommunity: (id) =>
    set((s) => ({
      communities: s.communities.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c)),
    })),
  setBudget: (b) => set({ budget: b }),
  addPriority: (p) => set((s) => ({ priorities: [...s.priorities, p] })),
}))
