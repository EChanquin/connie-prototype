import type { Collaborator } from '@/types'

export const collaborators: Collaborator[] = [
  { id: 'riley', name: 'Riley (You)', avatarInitials: 'RY', permission: 'edit', isOwner: true },
  { id: 'jordan', name: 'Jordan', avatarInitials: 'JO', permission: 'edit' },
  { id: 'sam', name: 'Sam', avatarInitials: 'SA', permission: 'view' },
]

export const inviteCandidate: Collaborator = {
  id: 'maya',
  name: 'Maya',
  avatarInitials: 'MA',
  permission: 'view',
}
