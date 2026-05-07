export type PatternStatus = "published" | "drafting" | "planned";

export type Pattern = {
  number: string;
  slug: string;
  title: string;
  /** True if this pattern carries the `AI` tag in the catalog filter. */
  ai: boolean;
  /** Two existing patterns get an AI variant section in their body — flag here so the index can label it. */
  hasAiVariant?: boolean;
  blurb: string;
  primaryCitation: string;
  status: PatternStatus;
};

export const patterns: readonly Pattern[] = [
  {
    number: "01",
    slug: "skeleton-screens",
    title: "Skeleton screens",
    ai: false,
    blurb:
      "Layout-matching placeholders that fill the prospective wait. Anchor framing in the filled-duration asymmetry, not blog folklore.",
    primaryCitation: "James 1890; Ornstein 1969; Block & Zakay 1997",
    status: "published",
  },
  {
    number: "02",
    slug: "optimistic-ui",
    title: "Optimistic UI",
    ai: false,
    hasAiVariant: true,
    blurb:
      "Render the user's action as if it succeeded; reconcile when the response lands. AI variant: render the user's message immediately on submit, stream the assistant response in parallel.",
    primaryCitation: "Miller 1968; Card et al. 1991",
    status: "published",
  },
  {
    number: "03",
    slug: "determinate-progress",
    title: "Determinate progress bars",
    ai: false,
    blurb:
      "Percent-done indicator backed by real progress data. ~86 % preference over a blank wait in the original study.",
    primaryCitation: "Myers 1985 (CHI '85)",
    status: "published",
  },
  {
    number: "04",
    slug: "animated-progress",
    title: "Animated progress (backwards-decelerating ribs)",
    ai: false,
    blurb:
      "Backwards-moving, decelerating bands inside a forwards-moving progress bar. ~11–12 % perceived speed-up over a plain bar.",
    primaryCitation: "Harrison, Yeo & Hudson 2010 (CHI '10)",
    status: "published",
  },
  {
    number: "05",
    slug: "spinners",
    title: "Spinners (when appropriate)",
    ai: false,
    blurb:
      "Indeterminate feedback for the narrow 1–2 s window where duration is unknown but a wait must be acknowledged. Not 'always bad' — just narrow.",
    primaryCitation: "Myers 1985; Eli Fitch",
    status: "published",
  },
  {
    number: "06",
    slug: "view-transitions",
    title: "View Transitions API",
    ai: false,
    blurb:
      "Browser-orchestrated cross-document and same-document animations. Eliminates most manual route-transition orchestration.",
    primaryCitation: "Card et al. 1991 (100 ms transition principle)",
    status: "published",
  },
  {
    number: "07",
    slug: "image-progressive-loading",
    title: "Image progressive loading (LQIP, blur-up)",
    ai: false,
    blurb:
      "Low-quality placeholder establishes shape and colour; full image swaps in. Edge contrast as the perceived-speed lever.",
    primaryCitation: "Anstis 2001; James 1890",
    status: "published",
  },
  {
    number: "08",
    slug: "route-prefetching",
    title: "Route prefetching",
    ai: false,
    blurb:
      "Begin loading the target route before the user navigates — on viewport entry, hover, or mouse deceleration. Idempotent operations only.",
    primaryCitation: "Eli Fitch (predictive preloading); Miller 1968 thresholds",
    status: "planned",
  },
  {
    number: "09",
    slug: "mousedown-vs-click",
    title: "mousedown / pointerdown vs. click",
    ai: false,
    blurb:
      "Listen on press, not release. ~100–150 ms head-start per Fitch's Mechanical Turk study. Touch needs `touchmove` gating to avoid accidental fires while scrolling.",
    primaryCitation: "Eli Fitch's Mechanical Turk study; Jota et al. 2013",
    status: "published",
  },
  {
    number: "10",
    slug: "streaming-ssr",
    title: "Streaming SSR / Suspense",
    ai: false,
    blurb:
      "Server-rendered chunks streamed as data arrives. React Suspense + the App Router make this composable per component.",
    primaryCitation: "Card et al. 1991 unit-task levels",
    status: "planned",
  },
  {
    number: "11",
    slug: "stale-while-revalidate",
    title: "Stale-while-revalidate",
    ai: false,
    blurb:
      "Serve the cached response immediately, validate in the background, update on completion. Pairs with TanStack Query / SWR.",
    primaryCitation: "Doherty & Thadani 1982",
    status: "planned",
  },
  {
    number: "12",
    slug: "pre-action-feedback",
    title: "Pre-action feedback (`:active`, button press)",
    ai: false,
    blurb:
      "CSS-only acknowledgment within ~50 ms of input. The `:active` pseudo-class plus a 200 ms press animation; ~50 ms behavioural extension as a bonus (Fitch).",
    primaryCitation: "Eli Fitch (200 ms active-state sweet spot); Card et al. 1991",
    status: "published",
  },
  {
    number: "13",
    slug: "animation-timing",
    title: "Animation timing for state changes",
    ai: false,
    blurb:
      "The 100 / 200 / 400 ms families — when to use which. Defaults that match the cognitive transitions, not arbitrary preference.",
    primaryCitation: "Card et al. 1991; Harrison et al. 2010",
    status: "planned",
  },
  {
    number: "14",
    slug: "engaging-loading",
    title: "Engaging loading states",
    ai: false,
    hasAiVariant: true,
    blurb:
      "Slack-style boot sequences, FIFA-style mini-games during long waits. Trades retrospective duration for prospective engagement. AI variant: agent narration during multi-step workflows (Claude Code, Cursor agent mode).",
    primaryCitation: "Block & Zakay 1997; Eli Fitch (Slack/FIFA examples)",
    status: "planned",
  },
  {
    number: "15",
    slug: "empty-state-loading",
    title: "Empty states that hint at loading",
    ai: false,
    blurb:
      "When a content area is genuinely empty post-load, distinguish that from still-loading. Anti-pattern: blank page during a 2-second load.",
    primaryCitation: "Myers 1985 (indeterminate-feedback principle)",
    status: "planned",
  },
  {
    number: "16",
    slug: "background-sync",
    title: "Background sync",
    ai: false,
    blurb:
      "Service Worker Background Sync API + offline-first IndexedDB. Defer the wait until the user is no longer waiting.",
    primaryCitation: "Doherty & Thadani 1982",
    status: "planned",
  },
  {
    number: "17",
    slug: "predictive-preloading-hover",
    title: "Predictive preloading (hover, mouse deceleration)",
    ai: false,
    blurb:
      "Watch the cursor's velocity vector and start loading before the click. The 600 ms 'fancy hover' sweet spot; mouse-deceleration trick.",
    primaryCitation: "Eli Fitch (Future Link library, hover study)",
    status: "planned",
  },
  {
    number: "18",
    slug: "touch-pointer-down",
    title: "Touch start / pointer down on touch",
    ai: false,
    blurb:
      "Touch-input latency JNDs: ~33 ms drag, ~82 ms tap. The '100 ms feels instant' myth on direct manipulation; the fix is engineering, not perception.",
    primaryCitation: "Deber et al. 2015; Jota et al. 2013",
    status: "planned",
  },
  {
    number: "19",
    slug: "adaptive-loading",
    title: "Adaptive loading (performance scaler)",
    ai: false,
    blurb:
      "Measure each user's actual round-trip times. Scale skeleton durations, animation timings, and loader thresholds accordingly. Honesty engineering, not a perception trick.",
    primaryCitation: "Eli Fitch (concept)",
    status: "planned",
  },
  {
    number: "20",
    slug: "time-aware-feedback",
    title: "Time-aware feedback",
    ai: false,
    blurb:
      "The decision rule per band: nothing < 1 s · spinner 1–2 s · progress 2–10 s · engagement 10 s+. Distilled into a single rule sheet.",
    primaryCitation: "Miller 1968; Eli Fitch",
    status: "published",
  },
  {
    number: "21",
    slug: "ai-token-streaming",
    title: "Token-by-token streaming render",
    ai: true,
    blurb:
      "Pace token reveals to a natural reading rhythm. Instant per-token feels jarring; constant rate feels mechanical; variable chunk sizes feel right. (Live demo on /playground.)",
    primaryCitation: "Card et al. 1991; James 1890; Anthropic / OpenAI streaming guides (industry)",
    status: "drafting",
  },
  {
    number: "22",
    slug: "ai-thinking-state",
    title: "Thinking state (pre-first-token)",
    ai: true,
    blurb:
      "Animated state before the first token arrives. Distinct from a generic spinner because it implies process, not stall. (Live demo on /playground.)",
    primaryCitation: "Myers 1985; recent CHI/UIST chatbot-trust literature; Claude / ChatGPT / Cursor (industry)",
    status: "drafting",
  },
  {
    number: "23",
    slug: "ai-tool-call-transparency",
    title: "Tool-call transparency",
    ai: true,
    blurb:
      "Surface what the agent is doing — \"Reading file…\", \"Searching…\", \"Running tests…\". Compresses retrospective duration; builds trust during long agentic work.",
    primaryCitation: "Block & Zakay 1997; IUI/CHI agent-explainability work; Claude Code / Cursor agent mode (industry)",
    status: "planned",
  },
  {
    number: "24",
    slug: "ai-cancellation-affordance",
    title: "Cancellation affordance for streaming / long ops",
    ai: true,
    blurb:
      "The stop button must respond within ~100 ms; mid-stream cancel must not lose state.",
    primaryCitation: "Doherty 1982 (control = perceived productivity); ChatGPT / Claude stop-button patterns (industry)",
    status: "planned",
  },
];
