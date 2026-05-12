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
};

export const scenarios: readonly Scenario[] = [
  {
    number: "01",
    slug: "page-load-cold",
    title: "Page load (cold)",
    band: "1 – 10 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "First arrival on the site, no cache. Skeleton-driven layout while the server-rendered content streams in.",
    status: "published",
  },
  {
    number: "02",
    slug: "page-load-warm-cache",
    title: "Page load (warm cache)",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Returning user, assets cached. View Transitions for the fade between the previous page and the new one.",
    status: "published",
  },
  {
    number: "03",
    slug: "route-navigation",
    title: "Route navigation",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "User clicks a link. Route is prefetched on hover; transition is optimistic; fallback skeleton if the network slips.",
    status: "published",
  },
  {
    number: "04",
    slug: "form-submission",
    title: "Form submission",
    band: "1 – 10 S",
    category: "input-forms",
    ai: false,
    blurb:
      "User submits a form. Pre-action feedback within 50 ms; optimistic UI for ≤ 1 % rejection rate; determinate progress otherwise.",
    status: "published",
  },
  {
    number: "05",
    slug: "search-as-you-type",
    title: "Search as you type",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "User types into a search box. Input always responsive; results dim during stale state; cancellation on every keystroke. (Live demo on /playground.)",
    status: "published",
  },
  {
    number: "06",
    slug: "long-list-pagination",
    title: "Long list / pagination",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "User scrolls or paginates through a long list. Skeleton rows for the next page; predictive preload as the user approaches the boundary.",
    status: "published",
  },
  {
    number: "07",
    slug: "infinite-scroll",
    title: "Infinite scroll",
    band: "100 MS – 1 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Continuous content stream as the user scrolls. Predictive load before the bottom; layout stability during reflows.",
    status: "published",
  },
  {
    number: "08",
    slug: "image-gallery",
    title: "Image gallery",
    band: "1 – 10 S",
    category: "content-loading",
    ai: false,
    blurb:
      "Grid of images loading at varying rates. LQIP / blur-up for each image; predictive preload of likely next-clicks.",
    status: "published",
  },
  {
    number: "09",
    slug: "file-upload-single",
    title: "File upload (single)",
    band: "1 – 10 S",
    category: "upload-download",
    ai: false,
    blurb:
      "Single file upload. Determinate progress with backwards-decelerating animation; optimistic UI for the metadata while bytes transfer.",
    status: "published",
  },
  {
    number: "10",
    slug: "file-upload-batch",
    title: "File upload (batch)",
    band: "10 S+",
    category: "upload-download",
    ai: false,
    blurb:
      "Multi-file upload with parallel transfers. Per-file determinate progress; aggregate progress at the top; engagement cue past 10 s.",
    status: "published",
  },
  {
    number: "11",
    slug: "auth-oauth",
    title: "Auth / OAuth flow",
    band: "1 – 10 S",
    category: "input-forms",
    ai: false,
    blurb:
      "Sign-in or third-party OAuth handshake. Pre-action feedback on the button, optimistic post-auth redirect, determinate progress for the round-trip.",
    status: "published",
  },
  {
    number: "12",
    slug: "data-table-loading",
    title: "Data table loading",
    band: "100 MS – 1 S",
    category: "content-loading",
    ai: false,
    blurb:
      "Sort, filter, paginate a table. Skeleton rows that match column widths; SWR for repeat queries.",
    status: "published",
  },
  {
    number: "13",
    slug: "data-export-download",
    title: "Data export / download generation",
    band: "10 S+",
    category: "upload-download",
    ai: false,
    blurb:
      "Server generates a download (CSV, PDF). Engagement during the wait; notification on completion; option to receive via email if very long.",
    status: "published",
  },
  {
    number: "14",
    slug: "real-time-updates",
    title: "Real-time updates / live data",
    band: "0–100 MS",
    category: "content-loading",
    ai: false,
    blurb:
      "WebSocket / SSE-driven live updates. Animation timing for state changes; SWR fallback if the socket drops.",
    status: "published",
  },
  {
    number: "15",
    slug: "chat-input",
    title: "Chat input (typing-time feedback)",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "User types into a chat composer. Input always responsive; cursor handling; optimistic message render.",
    status: "published",
  },
  {
    number: "16",
    slug: "ai-chat-streaming-response",
    title: "Chat / streaming response",
    band: "1 – 10 S",
    category: "ai",
    ai: true,
    blurb:
      "AI streams tokens after a brief thinking state. Pace tokens to a natural reading rhythm; cancellation on every keystroke. (Live demo on /playground.)",
    status: "published",
  },
  {
    number: "17",
    slug: "multi-step-wizard-checkout",
    title: "Multi-step wizard / checkout",
    band: "1 – 10 S",
    category: "navigation-loading",
    ai: false,
    blurb:
      "Linear multi-step flow. Predictive preload of the next step while the user fills the current one; optimistic redirect on submit.",
    status: "published",
  },
  {
    number: "18",
    slug: "map-interactions",
    title: "Map interactions",
    band: "0–100 MS",
    category: "direct-manipulation",
    ai: false,
    blurb:
      "Pan, zoom, query a map. Direct-manipulation latency budget; adaptive tile loading; dedicated touch handling.",
    status: "published",
  },
  {
    number: "19",
    slug: "drag-and-drop",
    title: "Drag and drop",
    band: "0–100 MS",
    category: "direct-manipulation",
    ai: false,
    blurb:
      "Reorder, dock, drop. Touch-input latency under 33 ms; pre-action feedback on grab; optimistic placement.",
    status: "published",
  },
  {
    number: "20",
    slug: "optimistic-actions",
    title: "Optimistic actions (like, save, undo)",
    band: "0–100 MS",
    category: "input-forms",
    ai: false,
    blurb:
      "Single-tap action with low rejection rate. Render success immediately; reconcile in the background; honest visible failure path.",
    status: "published",
  },
  {
    number: "21",
    slug: "ai-long-compute-inference",
    title: "Long compute / Inference",
    band: "10 S+",
    category: "ai",
    ai: true,
    blurb:
      "Long-running AI inference (image generation, complex analysis). Engagement, progress where measurable, tool-call transparency where applicable.",
    status: "published",
  },
  {
    number: "22",
    slug: "ai-inline-completion",
    title: "Inline completion / suggestion",
    band: "100 MS – 1 S",
    category: "ai",
    ai: true,
    blurb:
      "Cursor / Copilot / v0 territory — typing-time inference. Debounced query, abort on next keystroke, optimistic accept on Tab.",
    status: "published",
  },
  {
    number: "23",
    slug: "ai-tool-execution",
    title: "Tool execution / agentic step",
    band: "1 – 10 S",
    category: "ai",
    ai: true,
    blurb:
      "Agent visibly does something (reads a file, runs a query, edits code). Tool-call transparency is the perception trick.",
    status: "published",
  },
  {
    number: "24",
    slug: "ai-agentic-workflow",
    title: "Agentic workflow",
    band: "10 S+",
    category: "ai",
    ai: true,
    blurb:
      "Multi-step agent that may run for minutes. The user can watch the trajectory; cancellation always available; determinate progress where the agent can estimate it.",
    status: "published",
  },
];

export function scenariosByCategory(
  categoryId: ScenarioCategory,
): Scenario[] {
  return scenarios.filter((s) => s.category === categoryId);
}
