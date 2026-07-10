/**
 * ILLUSTRATIVE community posts (Instagram / Reddit) for the social-listening concept.
 *
 * These are AUTHORED SAMPLES, not live-scraped data — Instagram has no public content API and
 * we don't run a real social-listening pipeline yet. They exist to demo the vision: when a shopper
 * connects communities in onboarding, Connie surfaces community sentiment alongside CR + web.
 * Keyed by insight `category` so each card can show a relevant community voice. Keep this clearly
 * separate from the real (CR + web) evidence.
 */

export type CommunitySource = 'Instagram' | 'Reddit'
export type CommunityPost = { source: CommunitySource; handle: string; quote: string }

export const communityPosts: Record<string, CommunityPost[]> = {
  safety: [
    { source: 'Instagram', handle: '@nyc.momlife', quote: 'Feel so secure with the harness + brakes — zero wobble on hills.' },
    { source: 'Reddit', handle: 'r/BeyondtheBump', quote: 'Stability is unreal. Never once felt like it would tip.' },
  ],
  maneuverability: [
    { source: 'Instagram', handle: '@strollergrams', quote: 'One-hand steering through packed farmers markets, no problem.' },
    { source: 'Reddit', handle: 'r/Strollers', quote: 'Turns on a dime. Best handling stroller I have pushed.' },
  ],
  ease_of_use: [
    { source: 'Instagram', handle: '@dad_at_home', quote: 'So intuitive my partner set it up without the manual.' },
    { source: 'Reddit', handle: 'r/NewParents', quote: 'Adjustments are all one-click. Genuinely easy day to day.' },
  ],
  durability: [
    { source: 'Instagram', handle: '@twinmomdiaries', quote: 'On baby #2 and it still looks brand new. Built like a tank.' },
    { source: 'Reddit', handle: 'r/BeyondtheBump', quote: 'Two years of daily abuse and the frame is flawless.' },
  ],
  fold: [
    { source: 'Instagram', handle: '@citystroller', quote: 'Honestly the fold is bulky — eats my whole trunk.' },
    { source: 'Reddit', handle: 'r/Strollers', quote: 'Great stroller but the two-hand fold is a workout.' },
  ],
  value: [
    { source: 'Instagram', handle: '@budgetbaby', quote: 'Pricey, but resale held 70% — worth it long term.' },
    { source: 'Reddit', handle: 'r/Frugal', quote: 'Expensive upfront, but it lasts and resells. Net worth it.' },
  ],
  comfort: [
    { source: 'Instagram', handle: '@parkstrolls', quote: 'Seat is huge and plush — baby naps every single walk.' },
    { source: 'Reddit', handle: 'r/BeyondtheBump', quote: 'Roomiest seat we tried, converts easily as they grow.' },
  ],
  service: [
    { source: 'Instagram', handle: '@momreviews', quote: 'Warranty claim was painless, replacement shipped in days.' },
    { source: 'Reddit', handle: 'r/NewParents', quote: 'Customer service actually answered and fixed it fast.' },
  ],
}
