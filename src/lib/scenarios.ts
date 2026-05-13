export type ScenarioStatus = "published" | "drafting" | "planned";

export type ScenarioCategory =
  | "navigation-loading"
  | "input-forms"
  | "content-loading"
  | "upload-download"
  | "direct-manipulation"
  | "ai";

export type CategoryMeta = {
  id: ScenarioCategory;
  label: string;
  blurb: string;
};

export const categories: readonly CategoryMeta[] = [
  {
    id: "navigation-loading",
    label: "Nav & loading",
    blurb:
      "Page transitions, route changes, and progressive content reveal. The user is moving through the app and waiting for the next view to arrive.",
  },
  {
    id: "input-forms",
    label: "Forms",
    blurb:
      "Typing, clicking, submitting. The first 100 ms of intent and the round-trip after the submit.",
  },
  {
    id: "content-loading",
    label: "Content",
    blurb:
      "Tabular data, image grids, and live streams. The user is reading, not navigating.",
  },
  {
    id: "upload-download",
    label: "Transfer",
    blurb:
      "Bytes moving between client and server, long enough that progress matters.",
  },
  {
    id: "direct-manipulation",
    label: "Manipulation",
    blurb:
      "Pan, zoom, drag, drop. The user is operating the interface in real time — latency is felt directly in the hand.",
  },
  {
    id: "ai",
    label: "AI",
    blurb:
      "Streaming responses, agentic workflows, inline completion. Perception techniques tuned for the AI wait pattern.",
  },
];

export type Scenario = {
  number: string;
  slug: string;
  title: string;
  band: "0–100 MS" | "100 MS – 1 S" | "1 – 10 S" | "10 S+";
  category: ScenarioCategory;
  /** True if this scenario carries the `AI` tag in legacy filters. The category field supersedes this for navigation. */
  ai: boolean;
  blurb: string;
  status: ScenarioStatus;
  /** ISO date (YYYY-MM-DD) when the piece was published. */
  publishedAt?: string;
};

export const scenarios: readonly Scenario[] = [
  {
    number: "01",
    slug: "page-load-cold",
    title: "Cold Page Load",
    band: "1 – 10 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "First arrival on the site, no cache. Skeleton-driven layout while the server-rendered content streams in.",
    publishedAt: "2026-05-08",
    status: "published",
  },
  {
    number: "02",
    slug: "page-load-warm-cache",
    title: "Warm Cache Page Load",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Returning user, assets cached. View Transitions for the fade between the previous page and the new one.",
    publishedAt: "2026-05-11",
    status: "published",
  },
  {
    number: "03",
    slug: "route-navigation",
    title: "Route Navigation",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "User clicks a link. Route is prefetched on hover; transition is optimistic; fallback skeleton if the network slips.",
    publishedAt: "2026-04-28",
    status: "published",
  },
  {
    number: "04",
    slug: "form-submission",
    title: "Form Submission",
    band: "1 – 10 S",
    category: "input-forms",
    ai: false,
    blurb:
      "User submits a form. Pre-action feedback within 50 ms; optimistic UI for ≤ 1 % rejection rate; determinate progress otherwise.",
    publishedAt: "2026-04-25",
    status: "published",
  },
  {
    number: "05",
    slug: "search-as-you-type",
    title: "Search-as-you-type",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "User types into a search box. Input always responsive; results dim during stale state; cancellation on every keystroke. (Live demo on /playground.)",
    publishedAt: "2026-05-08",
    status: "published",
  },
  {
    number: "06",
    slug: "long-list-pagination",
    title: "Long List Pagination",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "User scrolls or paginates through a long list. Skeleton rows for the next page; predictive preload as the user approaches the boundary.",
    publishedAt: "2026-04-30",
    status: "published",
  },
  {
    number: "07",
    slug: "infinite-scroll",
    title: "Infinite Scroll",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Continuous content stream as the user scrolls. Predictive load before the bottom; layout stability during reflows.",
    publishedAt: "2026-05-09",
    status: "published",
  },
  {
    number: "08",
    slug: "image-gallery",
    title: "Image Gallery",
    band: "1 – 10 S",
    category: "content-loading",
    ai: false,
    blurb:
      "Grid of images loading at varying rates. LQIP / blur-up for each image; predictive preload of likely next-clicks.",
    publishedAt: "2026-05-09",
    status: "published",
  },
  {
    number: "09",
    slug: "file-upload-single",
    title: "Single File Upload",
    band: "1 – 10 S",
    category: "upload-download",
    ai: false,
    blurb:
      "Single file upload. Determinate progress with backwards-decelerating animation; optimistic UI for the metadata while bytes transfer.",
    publishedAt: "2026-04-12",
    status: "published",
  },
  {
    number: "10",
    slug: "file-upload-batch",
    title: "Batch File Upload",
    band: "10 S+",
    category: "upload-download",
    ai: false,
    blurb:
      "Multi-file upload with parallel transfers. Per-file determinate progress; aggregate progress at the top; engagement cue past 10 s.",
    publishedAt: "2026-05-01",
    status: "published",
  },
  {
    number: "11",
    slug: "auth-oauth",
    title: "OAuth Flow",
    band: "1 – 10 S",
    category: "input-forms",
    ai: false,
    blurb:
      "Sign-in or third-party OAuth handshake. Pre-action feedback on the button, optimistic post-auth redirect, determinate progress for the round-trip.",
    publishedAt: "2026-05-02",
    status: "published",
  },
  {
    number: "12",
    slug: "data-table-loading",
    title: "Data Table Loading",
    band: "100 MS – 1 S",
    category: "content-loading",
    ai: false,
    blurb:
      "Sort, filter, paginate a table. Skeleton rows that match column widths; SWR for repeat queries.",
    publishedAt: "2026-05-06",
    status: "published",
  },
  {
    number: "13",
    slug: "data-export-download",
    title: "Data Export Download",
    band: "10 S+",
    category: "upload-download",
    ai: false,
    blurb:
      "Server generates a download (CSV, PDF). Engagement during the wait; notification on completion; option to receive via email if very long.",
    publishedAt: "2026-04-25",
    status: "published",
  },
  {
    number: "14",
    slug: "real-time-updates",
    title: "Real-time Updates",
    band: "0–100 MS",
    category: "content-loading",
    ai: false,
    blurb:
      "WebSocket / SSE-driven live updates. Animation timing for state changes; SWR fallback if the socket drops.",
    publishedAt: "2026-05-02",
    status: "published",
  },
  {
    number: "15",
    slug: "chat-input",
    title: "Chat Input",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "User types into a chat composer. Input always responsive; cursor handling; optimistic message render.",
    publishedAt: "2026-04-30",
    status: "published",
  },
  {
    number: "16",
    slug: "ai-chat-streaming-response",
    title: "Chat Streaming Response",
    band: "1 – 10 S",
    category: "ai",
    ai: true,
    blurb:
      "AI streams tokens after a brief thinking state. Pace tokens to a natural reading rhythm; cancellation on every keystroke. (Live demo on /playground.)",
    publishedAt: "2026-05-03",
    status: "published",
  },
  {
    number: "17",
    slug: "multi-step-wizard-checkout",
    title: "Multi-step Checkout",
    band: "1 – 10 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Linear multi-step flow. Predictive preload of the next step while the user fills the current one; optimistic redirect on submit.",
    publishedAt: "2026-04-24",
    status: "published",
  },
  {
    number: "18",
    slug: "map-interactions",
    title: "Map Interactions",
    band: "0–100 MS",
    category: "direct-manipulation",
    ai: false,
    blurb:
      "Pan, zoom, query a map. Direct-manipulation latency budget; adaptive tile loading; dedicated touch handling.",
    publishedAt: "2026-04-12",
    status: "published",
  },
  {
    number: "19",
    slug: "drag-and-drop",
    title: "Drag and Drop",
    band: "0–100 MS",
    category: "direct-manipulation",
    ai: false,
    blurb:
      "Reorder, dock, drop. Touch-input latency under 33 ms; pre-action feedback on grab; optimistic placement.",
    publishedAt: "2026-04-14",
    status: "published",
  },
  {
    number: "20",
    slug: "optimistic-actions",
    title: "Optimistic Actions",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "Single-tap action with low rejection rate. Render success immediately; reconcile in the background; honest visible failure path.",
    publishedAt: "2026-05-02",
    status: "published",
  },
  {
    number: "21",
    slug: "ai-long-compute-inference",
    title: "Long Compute Inference",
    band: "10 S+",
    category: "ai",
    ai: true,
    blurb:
      "Long-running AI inference (image generation, complex analysis). Engagement, progress where measurable, tool-call transparency where applicable.",
    publishedAt: "2026-04-19",
    status: "published",
  },
  {
    number: "22",
    slug: "ai-inline-completion",
    title: "Inline Completion",
    band: "100 MS – 1 S",
    category: "ai",
    ai: true,
    blurb:
      "Cursor / Copilot / v0 territory — typing-time inference. Debounced query, abort on next keystroke, optimistic accept on Tab.",
    publishedAt: "2026-05-06",
    status: "published",
  },
  {
    number: "23",
    slug: "ai-tool-execution",
    title: "Tool Execution",
    band: "1 – 10 S",
    category: "ai",
    ai: true,
    blurb:
      "Agent visibly does something (reads a file, runs a query, edits code). Tool-call transparency is the perception trick.",
    publishedAt: "2026-04-30",
    status: "published",
  },
  {
    number: "24",
    slug: "ai-agentic-workflow",
    title: "Agentic Workflow",
    band: "10 S+",
    category: "ai",
    ai: true,
    blurb:
      "Multi-step agent that may run for minutes. The user can watch the trajectory; cancellation always available; determinate progress where the agent can estimate it.",
    publishedAt: "2026-04-25",
    status: "published",
  },
];

export function scenariosByCategory(
  categoryId: ScenarioCategory,
): Scenario[] {
  return scenarios.filter((s) => s.category === categoryId);
}
