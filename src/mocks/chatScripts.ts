import type { ChatTurn } from '@/types'

export const decisionSupportChat: ChatTurn[] = [
  {
    id: 'c1',
    role: 'user',
    text: 'Based on your priorities, which of these should I actually buy?',
    time: '3m ago',
  },
  {
    id: 'c2',
    role: 'connie',
    text: "I've updated your priorities. Here's the top pick for you: the Uppababy Vista V2 — it leads on Safety and All-Terrain, the two you weighted highest.",
    time: '3m ago',
    productRef: 'uppababy-vista-v2',
  },
  {
    id: 'c3',
    role: 'user',
    text: 'What if I care more about weight?',
    time: 'Just now',
  },
  {
    id: 'c4',
    role: 'connie',
    text: 'Then the Baby Jogger City Mini GT2 pulls ahead — significant weight savings while keeping durability, and it saves you ~$570.',
    time: 'Just now',
    productRef: 'baby-jogger-city-mini-gt2',
  },
]

export const postPurchaseChat: ChatTurn[] = [
  {
    id: 'p1',
    role: 'connie',
    text: "It's been 3 weeks with your Baby Jogger City Mini GT2. How's it going?",
    time: '3m ago',
  },
  {
    id: 'p2',
    role: 'user',
    text: "It's fine, meets my expectations.",
    time: 'Just now',
  },
  {
    id: 'p3',
    role: 'connie',
    text: 'Good to hear. I shared your feedback with the community — 92% of owners feel the same at the 3-week mark.',
    time: 'Just now',
  },
]

export const postPurchaseOptions = [
  'I love it! Worth every penny.',
  "It's fine, meets my expectations.",
  'Not what I expected, would not recommend.',
]
