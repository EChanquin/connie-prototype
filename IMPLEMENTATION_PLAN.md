# Connie — Implementation Plan

**Product:** "Connie" — a Consumer Reports browser-extension assistant that overlays retail
pages (Amazon/Google) to help a shopper research and buy a stroller. The Figma "for Vibe Coding"
page contains ~73 frames spanning 8 flows.

**Goal:** Implement the complete prototype (all flows) as a React + TypeScript + Vite + Tailwind
app using mock data, preserving visual design and prototype navigation, with reusable components
and no duplicated code.

## Stack
| Concern | Choice |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS + CSS variables (design tokens) |
| State | Zustand |
| Mock data | Typed TS modules in `/mocks` |
| Icons | Local SVG components |

**Core principle:** Screens are (route + state) configurations layered over 3 shared layouts and
~30 reusable components. 73 frames collapse into ~22 routes; same-named frames are *states of one
screen*, not separate screens.

## Project structure
```
src/
  main.tsx
  app/            router.tsx, routes.ts
  styles/         tokens.css, globals.css
  layouts/        ExtensionShell, ConniePanel, OverlayLayout
  components/     primitives/ display/ cards/ overlays/ chat/ icons/
  features/       onboarding tour productInsights annotations
                  priorityInference decisionSupport collaboration postPurchase
  store/          useJourneyStore, usePriorityStore, useCollabStore
  mocks/          products, priorities, annotations, collaborators, chatScripts
  types/          index.ts
```

## Routing
- `/onboarding/*` — N0 install, N1 welcome, N2 member-check, M1 login, N3 promise,
  N4a survey/communities, N4b survey/priorities, N5 permissions, N6 done
- `/browse/*` (ExtensionShell layout) — insights, annotations, priorities, decision,
  collaborate, post-purchase, chat
- `/ds` — dev-only token & component gallery

Same-named frames become state/params on one route (e.g. `/browse/decision?view=table|cards`,
`/browse/post-purchase?step=1..9`).

## Component hierarchy
primitives (Button, IconButton, Input, Chip, Toggle, Radio, Checkbox, Link, Label, Icon)
→ display (Avatar, ConfidenceMeter, StarRating, Badge, SourcesList, WhyThisFits, SectionHeader)
→ cards/chat (ProductCard, InsightCard, PriorityCard, PriorityBentoGrid, ComparisonRow,
  ChatBubble, ChatInput, BotIntroduction, Tooltip, Popover)
→ layouts (ExtensionShell, ConniePanel, OverlayLayout)
→ features (thin screen compositions)

## Design tokens
Extracted from ★ Connie — DS Reference (1052:5971) and ★ Component States (1052:6089).
`styles/tokens.css` holds `:root` CSS variables; `tailwind.config.ts` maps them into the theme.
Groups: CR brand palette, annotation semantic colors (verified-cr / verified-community /
community-only / unverifiable), type scale, spacing, radii, panel shadow.

## Shared layouts
1. ExtensionShell — retailer bg + persistent Navi bar + Connie panel outlet.
2. ConniePanel — Header + scrollable MainContent + ChatFooter.
3. OverlayLayout — tooltips/popovers positioned over a base screen.

## State (Zustand)
- useJourneyStore — install/member/onboarding step, permissions, activeNaviTab, tourStep.
- usePriorityStore — communities, priority weights, inferred vs explicit.
- useCollabStore — shared list, collaborators, permissions.

## Mock data
Typed modules: products (strollers + metrics), priorities, annotations (1 per verdict),
collaborators, communities, chatScripts (scripted deterministic turns).

## Build order
1. Tokens → tokens.css + tailwind config.
2. Scaffold Vite/TS/Tailwind/Router.
3. Primitives + icons.
4. Layouts (ExtensionShell + Navi bar, ConniePanel).
5. Mock data + types + stores.
6. Flows: Onboarding → Product Insights → Annotations → Priority Inference →
   Decision Support → Collaboration → Post-Purchase → Chat.
7. Wire prototype flow order for clickthrough.
