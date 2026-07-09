export type RatingLevel = 'excellent' | 'very-good' | 'good' | 'fair' | 'poor'
export type Confidence = 'High' | 'Medium' | 'Low'

export interface Metric {
  key: string
  label: string
  score: number // 0-100
  rating: RatingLevel
}

export interface RetailerOffer {
  retailer: string
  price: number
  url?: string
  inStock: boolean
}

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  crScore: number // 0-100
  confidence: Confidence
  recommended: boolean
  tagline: string
  badges: string[]
  metrics: Metric[]
  communityRating: number // 0-5
  communityCount: number
  retailers: RetailerOffer[]
  whyThisFits: string[]
}

export type PriorityKey = 'safety' | 'durability' | 'easyFold' | 'lightweight' | 'allTerrain' | 'easeOfUse'

export interface Priority {
  key: PriorityKey
  label: string
  weight: number // 0-100
  inferred: boolean
}

export type CommunityType = 'facebook' | 'reddit' | 'instagram'
export interface Community {
  id: string
  name: string
  type: CommunityType
  selected: boolean
}

export type AnnotationVerdict =
  | 'verified-cr-community'
  | 'verified-community-only'
  | 'misleading'
  | 'unverifiable'

export interface Source {
  label: string
  kind: 'cr' | 'community'
}

export interface Annotation {
  id: string
  claim: string
  verdict: AnnotationVerdict
  explanation: string
  sources: Source[]
}

export type Permission = 'view' | 'edit'
export interface Collaborator {
  id: string
  name: string
  avatarInitials: string
  permission: Permission
  isOwner?: boolean
}

export type ChatRole = 'user' | 'connie'
export interface ChatTurn {
  id: string
  role: ChatRole
  text: string
  time: string
  productRef?: string
}

export type BudgetBand = 'Under $200' | '$200-$600' | '$600-$1000' | '$1000+'
