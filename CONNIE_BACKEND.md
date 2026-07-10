# Connie Backend (Langflow)

The Connie "brain" is a **Langflow flow** — a separate service the frontend calls over REST. It
takes a chat message (plus the shopper's priorities), searches a Consumer Reports test database
(Chroma vector store) and the web (Tavily), and returns a single typed JSON object describing what
the UI should render.

The React app does **not** contain the brain; it calls it. This folder holds everything needed to
run and connect to it.

## Architecture

```
React app  ──REST──▶  Langflow flow (the brain)  ──▶  Chroma (CR test data) + Tavily (web) + Vertex Gemini
   │                                                        │
   └── src/api/connieClient.ts  ◀── single typed JSON ──────┘
       src/types/connie-contract.ts   (shared response contract)
```

Every response is one JSON object discriminated by `response_type`, one of:
`product_insights`, `inline_annotations`, `decision_support`, `priority_inference`, `chat`,
`post_purchase`. The full shape lives in `src/types/connie-contract.ts`.

## Files

| File | Purpose |
|---|---|
| `src/types/connie-contract.ts` | TypeScript types for every Connie response. Source of truth for the wire format. |
| `src/api/connieClient.ts` | `callConnie({ message, priorities })` → typed `ConnieResponse`. |
| `langflow/connie-flow.json` | The Langflow flow, secrets scrubbed. Import this to recreate the brain. |
| `.env.example` | Env vars the client reads. Copy to `.env.local`. |

## Usage (frontend)

```ts
import { callConnie, isDecisionSupport } from '@/api/connieClient';

const res = await callConnie({ message: userText, priorities: 'Safety, Durability' });
if (isDecisionSupport(res)) {
  res.decision_support.products.forEach(p => /* render */);
}
```

Priorities are delivered inside the message as a `[User priorities: ...]` prefix (the Langflow
prompt has a matching rule that reads it). This is intentional — tweaks on the priorities input
were not honored by the Langflow `/run` endpoint in this version.

## Running the brain (first-time setup)

1. **Install & start Langflow** (`pip install langflow`, `langflow run`), default `http://localhost:7860`.
2. **Import the flow:** Projects → New Flow → Import → `langflow/connie-flow.json`.
3. **Re-add the secrets that were scrubbed for git** (none of these are in the repo):
   - **Tavily API key** — on the Tavily AI Search node.
   - **Google Vertex service account** — upload your service-account JSON on both the Vertex AI and
     Vertex AI Embeddings nodes (Credentials field).
   - **CR stroller data** — upload the source data file on the File node so it ingests into Chroma
     (collection `cr_strollers_v6`). Without this, `decision_support` / `product_insights` are empty.
4. **Create a Langflow API key:** Settings → Langflow API Keys → Add New. Copy it.
5. **Configure the app:** copy `.env.example` to `.env.local`, set `VITE_LANGFLOW_URL` and
   `VITE_LANGFLOW_API_KEY`.
6. **Update the flow id if needed:** importing may assign a new flow id. Copy it from the Langflow
   URL (`/flow/<id>`) and set `FLOW_ID` in `src/api/connieClient.ts`.

## Known constraints

- **Vertex quota:** the free tier caps requests per minute. Human demo pace (one action at a time)
  is fine; rapid bursts can 429. For heavier use, request a Vertex quota increase or use billing.
- **Browser → Langflow directly** exposes the API key and needs CORS enabled on Langflow. Fine for
  local demos; for anything shared, proxy through a small backend route.
- `community_stat` in `post_purchase` returns `null` until a real community-data source backs a
  figure — the model will not invent a percentage.
