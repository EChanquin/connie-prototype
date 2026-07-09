# Connie

A working prototype of **Connie** — a Consumer Reports browser-extension assistant that overlays
retail pages to help a shopper research and buy a stroller. Built from the Figma "Discovery
Prototype / for Vibe Coding" page.

## Stack
React 18 · TypeScript · Vite · Tailwind CSS · React Router v6 · Zustand · mock data only.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

Open `/` for the **flow menu** (jump to any screen), or click **Start the full flow** to walk the
prototype from install → onboarding → browse → decide → collaborate → post-purchase.

## Architecture
73 Figma frames collapse into ~22 routes rendered by ~30 reusable components over 3 shared layouts.
Same-named frames are *states* of one screen (URL params + Zustand), not duplicated screens.

```
src/
  app/         router + typed route constants and flow order
  styles/      tokens.css (design tokens) + globals
  layouts/     ExtensionShell · NaviBar · ConniePanel · OnboardingLayout · RetailBackdrop
  components/  primitives · display · cards · chat · overlays · icons
  features/    onboarding · tour · productInsights · annotations · priorityInference
               decisionSupport · collaboration · postPurchase · chat · home · ds
  store/       useJourneyStore · usePriorityStore · useCollabStore
  mocks/       products · priorities · annotations · collaborators · chatScripts
  types/       shared domain types
```

Design tokens (CR brand green `#00803e`, rating scale, spacing, type, shadows) were pulled from the
Figma DS Reference frames and live as CSS variables bridged into the Tailwind theme.

## Routes
- `/` flow menu · `/ds` design-system gallery
- `/onboarding/*` — install, welcome, member-check, login, promise, survey (communities/priorities),
  permissions, done
- `/browse/*` — insights (`?v=match|detailed|not-recommended`), annotations, priorities, tour,
  decision (`?view=cards|table&mode=default|detailed|compare`),
  collaborate (`?stage=confirm|share|add|permissions|shared`), post-purchase, chat

See `IMPLEMENTATION_PLAN.md` for the full design rationale.
