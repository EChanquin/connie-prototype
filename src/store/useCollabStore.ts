import { create } from 'zustand'
import type { Collaborator, Permission } from '@/types'
import { collaborators as seed } from '@/mocks/collaborators'
import { products } from '@/mocks/products'

interface CollabState {
  collaborators: Collaborator[]
  sharedListIds: string[]
  shared: boolean
  addCollaborator: (c: Collaborator) => void
  setPermission: (id: string, permission: Permission) => void
  toggleShareItem: (productId: string) => void
  markShared: () => void
}

export const useCollabStore = create<CollabState>((set) => ({
  collaborators: seed,
  sharedListIds: [products[0].id, products[1].id],
  shared: false,
  addCollaborator: (c) => set((s) => ({ collaborators: [...s.collaborators, c] })),
  setPermission: (id, permission) =>
    set((s) => ({
      collaborators: s.collaborators.map((c) => (c.id === id ? { ...c, permission } : c)),
    })),
  toggleShareItem: (productId) =>
    set((s) => ({
      sharedListIds: s.sharedListIds.includes(productId)
        ? s.sharedListIds.filter((id) => id !== productId)
        : [...s.sharedListIds, productId],
    })),
  markShared: () => set({ shared: true }),
}))
