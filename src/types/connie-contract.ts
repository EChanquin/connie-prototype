/**
 * Connie ↔ Langflow response contract
 * =====================================
 * SINGLE SOURCE OF TRUTH for what the Langflow "brain" emits and the frontend consumes.
 *
 * This types the WIRE FORMAT exactly as the Langflow agent returns it (snake_case JSON),
 * so `JSON.parse(langflowResponse) as ConnieResponse` is directly and safely typed.
 *
 * Derived from the `Langflow Research Agent v3` system prompt. Replaces the stale
 * `src/types/index.ts` (Product/Metric/etc.) which the screens never used.
 *
 * Every top-level response has EXACTLY two fields: `response_type` and one payload field
 * named the same as the response_type value. Model it as the discriminated union below.
 *
 * NOTE ON NAMING: keep these snake_case names — they must match the JSON the agent produces.
 * If you prefer camelCase in React, add a mapping layer at the fetch boundary, don't rename here.
 */

/* ────────────────────────────────────────────────────────────────────────── *
 * Shared building blocks
 * ────────────────────────────────────────────────────────────────────────── */

export type ResponseType =
  | 'product_insights'
  | 'inline_annotations'
  | 'decision_support'
  | 'priority_inference'
  | 'chat'
  | 'post_purchase';

export type SourceType = 'consumer_reports' | 'reddit' | 'youtube' | 'web';

/** One piece of supporting evidence. All four fields always present; url may be null. */
export interface Evidence {
  source_type: SourceType;
  /** Human-readable label, never a raw URL. CR evidence is always "CR 2024 Lab Results". */
  source_name: string;
  /** Real URL from retrieved data, or null (e.g. CR DB rows have no URL). Never fabricated. */
  source_url: string | null;
  /** Direct quote or tight paraphrase, hard cap 20 words. */
  quote: string;
}

/* ────────────────────────────────────────────────────────────────────────── *
 * product_insights
 * ────────────────────────────────────────────────────────────────────────── */

export type InsightCategory =
  | 'safety'
  | 'maneuverability'
  | 'fold'
  | 'ease_of_use'
  | 'service'
  | 'durability'
  | 'value'
  | 'comfort';

export type InsightSentiment = 'positive' | 'caution';

export interface Insight {
  /** 2–3 word badge, e.g. "Top Rated". */
  label: string;
  /** Frontend maps this to a designed icon. */
  category: InsightCategory;
  /** "caution" = a drawback or trade-off. */
  sentiment: InsightSentiment;
  /** One warm, plain sentence. No hype. */
  summary: string;
  /** Count of supporting sources NOT included in `evidence`; 0 if none. */
  source_count: number;
  /** Exactly 1 or 2 items. CR item first when present. */
  evidence: Evidence[];
}

export interface ProductInsightsPayload {
  product_name: string;
  verdict: 'recommended' | 'not_recommended';
  /** Always null from backend — the "DID YOU KNOW" trivia is frontend-supplied. */
  trivia: null;
  /** Aim for 4–6 when data supports it; agreements/single-source only, never conflicts. */
  insights: Insight[];
}

/* ────────────────────────────────────────────────────────────────────────── *
 * inline_annotations
 * ────────────────────────────────────────────────────────────────────────── */

export type AnnotationVerdict =
  | 'misleading'
  | 'verified_by_both'
  | 'verified_by_community_only'
  | 'unverifiable';

/** Fixed vocabulary, derived from verdict. */
export type AnnotationVerdictLabel =
  | 'Verified claim' // verified_by_both | verified_by_community_only
  | 'Misleading claim' // misleading
  | 'Unable to verify claim'; // unverifiable

export interface InlineAnnotation {
  /** Exact text span on the page being annotated. */
  claim_text: string;
  verdict: AnnotationVerdict;
  verdict_label: AnnotationVerdictLabel;
  explanation: string;
  /**
   * Evidence rules by verdict:
   *  - verified_by_both: 2 items, CR first
   *  - verified_by_community_only: 1–2 community items, never CR
   *  - misleading: 1–2 items, CR first when present
   *  - unverifiable: always []
   */
  evidence: Evidence[];
}

export type InlineAnnotationsPayload = InlineAnnotation[];

/* ────────────────────────────────────────────────────────────────────────── *
 * decision_support
 * ────────────────────────────────────────────────────────────────────────── */

export type TerrainRating = 'All terrain' | 'Urban + gravel' | 'Pavement only';

export interface ProductSpecs {
  /** Fold type, e.g. "2-Step" or "1-Hand". */
  fold: string;
  /** e.g. "27 lb". */
  weight: string;
  terrain: TerrainRating;
}

/**
 * rank_label vocabulary is fixed:
 *  "#1 BEST MATCH" (rank 1) · "#2 RUNNER UP" (rank 2) · "#N" (others) ·
 *  "NOT RECOMMENDED" (advise-against, always last). Modeled loosely as string
 *  because "#N" is open-ended; validate against the rules at runtime if needed.
 */
export interface DecisionProduct {
  rank: number;
  rank_label: string;
  product_name: string;
  price: string;
  retailer: string | null;
  /** Null when user priorities are empty. */
  recommendation_rationale: string | null;
  /** Only exact priority strings that matched; frontend bolds these. */
  priority_matches: string[];
  evidence_badges: string[];
  specs: ProductSpecs;
}

export interface DecisionSupportPayload {
  /** One-sentence verdict, or null when priorities are empty. */
  cr_verdict: string | null;
  /** Always all strollers in the DB, ranked best→worst (currently 5). */
  products: DecisionProduct[];
}

/* ────────────────────────────────────────────────────────────────────────── *
 * priority_inference
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * ✅ CONFIRMED against Figma (file KYQBq2wC6kTRWZEFvhZFM3, "Priority Cards Bento Grid"):
 * the priority_inference screen surfaces exactly these four. Matches the Langflow prompt.
 * NOTE: the Figma design system also defines a larger priority-chip palette (Maneuverability,
 * Ease of Use, Service, Value, Comfort) that mirrors InsightCategory — that's a separate axis
 * (a component gallery), not the onboarding screen. Keep the two taxonomies distinct.
 */
export type PriorityLabel = 'Safety' | 'Durability' | 'Easy Fold' | 'Lightweight';

export interface PriorityInferencePayload {
  message: string;
  suggested_priorities: PriorityLabel[];
  follow_up_question: string | null;
  answer_options: string[];
}

/* ────────────────────────────────────────────────────────────────────────── *
 * chat
 * ────────────────────────────────────────────────────────────────────────── */

export interface ChatPayload {
  message: string;
}

/* ────────────────────────────────────────────────────────────────────────── *
 * post_purchase
 * ────────────────────────────────────────────────────────────────────────── *
 * Drives the Figma post-purchase check-in flow:
 *  1. Connie asks: "It's been 3 weeks with your {product}. How's it going?" + sentiment_options
 *  2. User picks a sentiment.
 *  3. Connie replies with a community_stat: "92% of owners feel the same at the 3-week mark."
 * `community_stat` is null on the initial check-in and populated after the user responds
 * (or stays null if no community data backs a figure — the model won't invent one).
 */
export interface CommunityStat {
  /** e.g. 92 */
  percent: number;
  /** Full sentence after the percent, e.g. "of owners feel the same at the 3-week mark". */
  statement: string;
}

export interface PostPurchasePayload {
  message: string;
  product_name: string;
  /** e.g. 3; null if not time-anchored. */
  weeks_since_purchase: number | null;
  /** Sentiment choices offered to the user; [] once they've answered. */
  sentiment_options: string[];
  /** Null on the initial check-in; populated in the follow-up response. */
  community_stat: CommunityStat | null;
  follow_up_question: string | null;
}

/* ────────────────────────────────────────────────────────────────────────── *
 * Top-level discriminated union
 * ────────────────────────────────────────────────────────────────────────── */

export type ConnieResponse =
  | { response_type: 'product_insights'; product_insights: ProductInsightsPayload }
  | { response_type: 'inline_annotations'; inline_annotations: InlineAnnotationsPayload }
  | { response_type: 'decision_support'; decision_support: DecisionSupportPayload }
  | { response_type: 'priority_inference'; priority_inference: PriorityInferencePayload }
  | { response_type: 'chat'; chat: ChatPayload }
  | { response_type: 'post_purchase'; post_purchase: PostPurchasePayload };

/* ────────────────────────────────────────────────────────────────────────── *
 * Type guards — narrow a parsed response by its response_type
 * ────────────────────────────────────────────────────────────────────────── */

export const isProductInsights = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'product_insights' }> =>
  r.response_type === 'product_insights';

export const isInlineAnnotations = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'inline_annotations' }> =>
  r.response_type === 'inline_annotations';

export const isDecisionSupport = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'decision_support' }> =>
  r.response_type === 'decision_support';

export const isPriorityInference = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'priority_inference' }> =>
  r.response_type === 'priority_inference';

export const isChat = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'chat' }> => r.response_type === 'chat';

export const isPostPurchase = (
  r: ConnieResponse,
): r is Extract<ConnieResponse, { response_type: 'post_purchase' }> =>
  r.response_type === 'post_purchase';
