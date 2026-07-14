# Connie — Session Handoff

**Read this first if you're picking up this project fresh.** It captures where things stand, what's
real vs. illustrative, what lives *outside* the repo, and what's still open.

Last updated: end of the session that merged `main` + wired the NOT RECOMMENDED card.

---

## 1. What this is

**Connie** — a Consumer Reports browser-extension shopping assistant that overlays retail pages to
help someone choose a stroller. MHCI capstone (CMU). Repo: `chloezqy/connie-prototype`.

Two pieces:

- **Frontend** — React + TypeScript + Vite. Faithful reproductions of Figma screens.
- **Backend ("the brain")** — a **Langflow flow** running as a *separate local service*. It is NOT
  part of the React app; the app calls it over REST. See `CONNIE_BACKEND.md` for setup.

Owner split: **Chloe owns the frontend/UX.** This session's work was the backend + wiring the
screens to live data.

---

## 2. Architecture (one paragraph)

Each screen calls `callConnie()` (`src/api/connieClient.ts`) on mount. That POSTs to
`/langflow/api/v1/run/<flow_id>`, which the **Vite dev proxy** (`vite.config.ts`) forwards to
Langflow, injecting the API key server-side (so it never reaches the browser, and no CORS).
Inside Langflow, a **tool-calling Agent** (Vertex AI `gemini-2.5-flash`) runs with two tools:
**Chroma** (the CR test database, collection `cr_strollers_v6`) and **Tavily** (live web search).
It returns a **single JSON object** typed by `response_type`, which the client parses into a typed
`ConnieResponse` (discriminated union in `src/types/connie-contract.ts`). Screens then map that
payload into their designed components.

Six response types: `product_insights`, `inline_annotations`, `decision_support`,
`priority_inference`, `post_purchase`, `chat`.

---

## 3. Current environment (local)

- **Langflow:** `http://localhost:7860` (must be running for anything to work)
- **Flow ID:** `5c8974c3-52ba-4b7e-b806-9ce2375b127a` — hardcoded in `src/api/connieClient.ts`
- **Env:** `.env.local` (gitignored) holds `LANGFLOW_URL` and `LANGFLOW_API_KEY` (no `VITE_` prefix
  — the proxy reads them server-side)
- **Run:** `npm run dev` → `http://localhost:5173`
- **Test script:** `~/Downloads/Connie/test-connie.mjs` — hits the backend directly, prints the typed
  response and validates its shape. Usage:
  ```bash
  LANGFLOW_API_KEY=<key> FLOW_ID=5c8974c3-52ba-4b7e-b806-9ce2375b127a \
    node ~/Downloads/Connie/test-connie.mjs "Rank these strollers for me"
  ```

⚠️ **Rotate the Langflow API key.** The current one was pasted into a chat transcript.

---

## 4. ⚠️ CRITICAL: prompt rules that live ONLY in Langflow

The Langflow **Prompt Template** node is the actual Connie contract (persona, schema, guardrails).
Over the session, **five things were added to it**. They ARE saved in the repo copy
(`langflow/connie-flow.json`) but the *running* flow is a separate live instance — if you ever
re-import the flow, or if the live prompt gets reset, these must be re-applied:

1. **`post_purchase` response type** — its schema block + routing rules.
2. **`OVERRIDE` rule** — reads priorities from a `[User priorities: …]` prefix in the user message.
   *(Necessary because Langflow `/run` does NOT honor tweaks on the priorities TextInput. Priorities
   are delivered inside the message — do not "fix" this back to tweaks; it doesn't work.)*
3. **Insight-ordering rule** — `product_insights` leads with the insights matching the user's
   priorities.
4. **`SOURCING INTEGRITY` rule** — never cite YouTube; only cite what was actually retrieved.
5. **`CLASSIFICATION GUARD`** — greetings/small talk return `chat`, not a product card.

**Also configured in the live flow (not obvious):** Vertex model = `gemini-2.5-flash`, **Max Output
Tokens = 8192** (at the default `0` the big `decision_support` payload gets truncated into invalid
JSON), and the **YouTube claim-extraction chain was deleted** (it exhausted the Vertex quota and
produced fabricated citations). Only `YouTubeTranscripts` remains, orphaned.

---

## 5. What is LIVE vs. ILLUSTRATIVE (important for demos)

**Genuinely live (real retrieved data):**
- **Consumer Reports lab data** — from the Chroma vector store (your CR data file).
- **Web evidence** — real Tavily search results with live URLs (The Bump, Strolleria, Mumsnet…).
- All six screens call the backend: Product Insights, Decision Support (cards/table/verdict/deep-dive),
  Priority Inference, Post-Purchase, Annotations, and a fully interactive **Chat**.
- Personalization is real: onboarding preferences are sent to the backend and genuinely reorder
  insights and re-rank Decision Support.

**Illustrative (authored synthetic data — do NOT present as live):**
- **Community posts** (Instagram / Reddit / TikTok / YouTube / Pinterest / Online blogs) in
  `src/mocks/communityPosts.ts`. There is no real social-listening pipeline — Instagram et al. have
  no open content API. These are authored samples, gated by what the user connects in onboarding.
- The **compare-prices popover** in Decision Support (fixed retailer prices).
- The **"DID YOU KNOW"** trivia (frontend-supplied by design; backend always returns `trivia: null`).

**Honest demo line:** *"CR lab data and web reviews are live; the community sentiment is illustrative
of the social-listening layer on our roadmap."*

**Sourcing rules enforced in `src/lib/sourceFilter.ts` (`cleanEvidence`):**
- **No YouTube** — filtered from the UI (the prompt rule alone wasn't reliable).
- **No CR competitors** — Wirecutter, BabyGearLab, Reviewed, Good Housekeeping, RTINGS are blocked
  (a Consumer Reports tool must not cite competing review authorities).
- **No evidence-less claims** — an insight whose evidence is entirely YouTube/competitors is hidden;
  annotations fall back to designed content rather than showing an unbacked "verified" claim.

---

## 6. Git state

- **Branch:** `connie-backend-integration`
- **21 commits ahead of `main`.** A PR is open (`connie-backend-integration` → `main`).
- ⚠️ **1 commit is unpushed:** the NOT RECOMMENDED live-data commit. Push it (GitHub Desktop →
  **Push origin**) so it lands on the PR.
- An earlier PR was already merged into `main`. Chloe then pushed UX refinements; **this branch has
  already merged her `main` in**, resolving conflicts in `productInsights`, `decisionSupport`, and
  `annotations`. Her work (NaviRail, RetailBackdrop, redesigned Annotations, draggable panels,
  intro coach mark) is preserved alongside the backend/sourcing logic.

---

## 7. Open threads / decisions pending

1. **1 vs. 2 not-recommended products** *(team decision — Yinzer is asking)*
   The CR database has 5 strollers and only **one is genuinely not-recommended: the "Lite 3."** The
   NOT RECOMMENDED card is now wired to live data for it. A **second** would require adding another
   poor-performing stroller to the **CR data file** (the "Stroller Test Data v4" uploaded to the
   Langflow File node — it is NOT in the repo; gitignored as `backend-data/`) and re-ingesting into
   Chroma. Note both grey badges on the page currently open the same Lite 3 card.

2. **Annotations verdicts** *(Chloe's call — frontend ownership)*
   The backend returns **all four verdicts** (verified-by-both, community-only, misleading,
   unverifiable). Chloe's redesign only surfaces **misleading**. Worth raising: "Unable to verify" is
   arguably Connie's strongest credibility moment. Suggested compromise: keep her hover pattern but
   put multiple highlighted claims on the page, each revealing its own verdict. **Do not change this
   without her** — she owns the frontend.

3. **NOT RECOMMENDED panel position** — anchored at `left: 176, top: 170` (a guess, under the left
   grey card). May need nudging. The panel is draggable.

---

## 8. Known constraints / gotchas (things that will bite you)

- **Vertex quota (429s).** `product_insights` is a heavy call (live web searches). Firing several in
  quick succession trips the per-minute limit. Screens fetch **once on mount**, guarded against
  React StrictMode's double-invoke. Don't spam-refresh; don't add fetches casually. The deep-dive and
  the NOT RECOMMENDED card fetch **lazily** (only when opened) for this reason.
- **Langflow `/run` ignores tweaks** on the priorities input — priorities go in the message. Already
  handled; don't "fix" it.
- **Re-importing the flow changes the flow ID** (and node IDs). If you re-import, grab the new ID
  from the Langflow URL and update `FLOW_ID` in `connieClient.ts`.
- **`vite.config.js`** (a stale compiled artifact) used to shadow `vite.config.ts` and silently break
  the proxy. It's deleted and gitignored — don't let it come back.
- **The CR data file is the one irreplaceable asset.** It's not in the repo. Without it, Chroma is
  empty and `decision_support` / `product_insights` return nothing. A teammate self-hosting needs it
  from Yinzer directly (see `CONNIE_BACKEND.md`).

---

## 9. Key files

| File | Purpose |
|---|---|
| `src/types/connie-contract.ts` | The typed response contract. Source of truth for the wire format. |
| `src/api/connieClient.ts` | `callConnie()` → typed `ConnieResponse`. Holds `FLOW_ID`. |
| `src/lib/sourceFilter.ts` | `cleanEvidence()` — drops YouTube + CR competitors. |
| `src/mocks/communityPosts.ts` | Illustrative community posts (synthetic — see §5). |
| `src/store/usePreferences.ts` | Onboarding preferences + connected communities; drives personalization. |
| `langflow/connie-flow.json` | The flow, secrets scrubbed. Re-importable. |
| `vite.config.ts` | Dev proxy → Langflow, injects API key server-side. |
| `CONNIE_BACKEND.md` | Full backend setup, incl. teammate self-hosting checklist. |
