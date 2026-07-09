import type { Product } from '@/types'

/** Placeholder SVG stroller image as a data URI so the app is fully self-contained. */
export const strollerImg = (label = 'Stroller') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
      <rect width='240' height='240' fill='#f2f2ed'/>
      <g fill='none' stroke='#989991' stroke-width='6' stroke-linecap='round'>
        <path d='M60 70 L150 70 L135 140 L75 140 Z'/>
        <path d='M60 70 L44 54'/>
        <circle cx='84' cy='176' r='20'/>
        <circle cx='150' cy='176' r='20'/>
        <path d='M135 140 L178 176'/>
      </g>
      <text x='120' y='218' font-family='sans-serif' font-size='14' fill='#989991' text-anchor='middle'>${label}</text>
    </svg>`,
  )}`

export const products: Product[] = [
  {
    id: 'uppababy-vista-v2',
    name: 'Uppababy Vista V2',
    brand: 'Uppababy',
    price: 969,
    image: strollerImg('Vista V2'),
    crScore: 91,
    confidence: 'High',
    recommended: true,
    tagline: 'Highly recommended stroller that stands out for its assorted ease of use, maneuverability, and safety.',
    badges: ['Best-in-class', 'City Certified'],
    metrics: [
      { key: 'maneuverability', label: 'Maneuverability', score: 92, rating: 'excellent' },
      { key: 'easeOfUse', label: 'Ease of use', score: 88, rating: 'very-good' },
      { key: 'safety', label: 'Safety', score: 94, rating: 'excellent' },
    ],
    communityRating: 4.9,
    communityCount: 1284,
    retailers: [
      { retailer: 'Amazon', price: 969, inStock: true },
      { retailer: 'Target', price: 999, inStock: true },
      { retailer: 'buybuy Baby', price: 949, inStock: false },
    ],
    whyThisFits: [
      'Best-in-class one-hand fold mechanism.',
      'Built for the urban jungle gym — handles sidewalks and curbs effortlessly.',
      'Matches your priority on Safety and All-Terrain.',
    ],
  },
  {
    id: 'baby-jogger-city-mini-gt2',
    name: 'Baby Jogger City Mini GT2',
    brand: 'Baby Jogger',
    price: 399,
    image: strollerImg('City Mini GT2'),
    crScore: 87,
    confidence: 'High',
    recommended: true,
    tagline: 'Significant weight savings over the Vista while maintaining durability.',
    badges: ['Best Value', 'One-Hand Fold'],
    metrics: [
      { key: 'maneuverability', label: 'Maneuverability', score: 86, rating: 'very-good' },
      { key: 'easeOfUse', label: 'Ease of use', score: 90, rating: 'excellent' },
      { key: 'safety', label: 'Safety', score: 82, rating: 'very-good' },
    ],
    communityRating: 4.7,
    communityCount: 2103,
    retailers: [
      { retailer: 'Amazon', price: 399, inStock: true },
      { retailer: 'Target', price: 419, inStock: true },
    ],
    whyThisFits: [
      'A smooth ride for your wallet — below $600, owners rarely feel the burn.',
      'Best-in-class one-hand fold mechanism with significant weight savings.',
      'Handles all-terrain use without the premium price.',
    ],
  },
  {
    id: 'babystroller-lite',
    name: 'Babyzen YOYO2',
    brand: 'Babyzen',
    price: 449,
    image: strollerImg('YOYO2'),
    crScore: 65,
    confidence: 'Medium',
    recommended: false,
    tagline: 'Ultra-compact travel stroller — great for airports, weaker on rough terrain.',
    badges: ['Travel'],
    metrics: [
      { key: 'maneuverability', label: 'Maneuverability', score: 70, rating: 'good' },
      { key: 'easeOfUse', label: 'Ease of use', score: 78, rating: 'good' },
      { key: 'safety', label: 'Safety', score: 60, rating: 'fair' },
    ],
    communityRating: 4.3,
    communityCount: 640,
    retailers: [
      { retailer: 'Amazon', price: 449, inStock: true },
    ],
    whyThisFits: [
      'Cabin-bag compact fold, ideal for frequent flyers.',
      'Lighter than every other pick on this list.',
    ],
  },
  {
    id: 'graco-modes-pramette',
    name: 'Graco Modes Pramette',
    brand: 'Graco',
    price: 344,
    image: strollerImg('Modes'),
    crScore: 78,
    confidence: 'Medium',
    recommended: true,
    tagline: 'A smooth ride for your wallet. Below $200, owners rarely feel the burn.',
    badges: ['Best Value'],
    metrics: [
      { key: 'maneuverability', label: 'Maneuverability', score: 76, rating: 'good' },
      { key: 'easeOfUse', label: 'Ease of use', score: 80, rating: 'very-good' },
      { key: 'safety', label: 'Safety', score: 79, rating: 'good' },
    ],
    communityRating: 4.5,
    communityCount: 980,
    retailers: [
      { retailer: 'Amazon', price: 344, inStock: true },
      { retailer: 'Walmart', price: 329, inStock: true },
    ],
    whyThisFits: [
      'Multiple ride modes grow with your child.',
      'Strong safety scores for the price band.',
    ],
  },
]

export const featuredProduct = products[0]
export const topThree = [products[0], products[1], products[3]]

export const getProduct = (id: string) => products.find((p) => p.id === id)
