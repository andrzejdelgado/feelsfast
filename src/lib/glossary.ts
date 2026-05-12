export type GlossaryEntry = {
  /** Canonical term name. */
  term: string;
  /** Stable id used as a URL anchor — kebab-case of the term. */
  id: string;
  /** One- or two-sentence plain-English definition. */
  definition: string;
  /** Optional cross-link to the Concepts essay where the term is developed. */
  seeAlso?: { label: string; href: string };
};

export const glossary: readonly GlossaryEntry[] = [
  {
    term: "Active phase",
    id: "active-phase",
    definition:
      "The mental state during which a user is engaged with an interface — typing, clicking, reading. Time perception compresses; waits feel shorter. Transitions to the passive phase at roughly the one-second mark of an unbroken wait.",
    seeAlso: { label: "Concepts §2", href: "/concepts/how-humans-perceive-time" },
  },
  {
    term: "Animation timing for state changes",
    id: "animation-timing",
    definition:
      "The duration and easing curve applied when a UI moves between states. Card et al. 1991's ~10 Hz / 100 ms-per-frame budget is the underlying recommendation; the three-duration family (~100 / ~200 / ~400 ms) covers micro-feedback, state changes, and large layout shifts respectively.",
    seeAlso: { label: "Concepts §3", href: "/concepts/canonical-thresholds" },
  },
  {
    term: "Background sync",
    id: "background-sync",
    definition:
      "Cache-and-queue strategy that moves an operation off the user's perceived path: the action commits to a local queue immediately, the network request fires whenever connectivity allows. Doesn't shorten the wait — moves it. Failure mode: silent rollback when reconciliation fails, and unbounded queues that grow when sync repeatedly fails.",
    seeAlso: { label: "Concepts §6", href: "/concepts/when-perceived-performance-hurts-you" },
  },
  {
    term: "Cancellation affordance",
    id: "cancellation",
    definition:
      "A visible control to stop an in-progress operation. Especially important for AI streaming and long agentic workflows. The ~100 ms perceptual-frame contract applies to the visible state flip on press (input re-activating, cancel disappearing), not to the underlying abort propagation — the two timelines must be designed separately. Partial state should be preserved; theatrical cancel that wipes the partial response is a second violation on top of the first.",
    seeAlso: { label: "Concepts §10", href: "/concepts/honesty-in-ai-ux" },
  },
  {
    term: "CLS — Cumulative Layout Shift",
    id: "cls",
    definition:
      "Web Vitals metric for visual stability. Scored 0 to 1; below 0.1 is good. Caused by content reflowing as it loads; the fix is reserving layout space (image dimensions, skeleton screens that match the final layout).",
  },
  {
    term: "Determinate progress",
    id: "determinate-progress",
    definition:
      "A progress indicator that reflects real, measurable progress through a known total. Strongly preferred over indeterminate spinners when the duration can be estimated (Myers 1985, ~86 % preference). Backwards-decelerating bands buy a further ~11–12 % perceived speed-up (Harrison et al. 2010). The preference holds for might-be-inaccurate bars; not for deliberately-inaccurate ones.",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Direct-manipulation latency",
    id: "direct-manipulation-latency",
    definition:
      "Sub-100 ms latency budget required for drag, scrub, pan, zoom interactions — far tighter than the canonical 100 ms perceptual frame for content updates. Jota et al. 2013 measured ~33 ms JND for dragging and ~82 ms for tapping; Deber et al. 2015 confirmed; Ng et al. 2012 showed experienced users detect single-millisecond improvements. No perception layer fixes lag on these surfaces — real engineering is the only fix.",
    seeAlso: { label: "Concepts §6", href: "/concepts/when-perceived-performance-hurts-you" },
  },
  {
    term: "Doherty threshold",
    id: "doherty-threshold",
    definition:
      "The ~400 ms response-time boundary at which user productivity rises non-linearly. Established by Doherty & Thadani's 1982 IBM technical report. Underlies the modern INP target of 200 ms.",
    seeAlso: { label: "Concepts §3", href: "/concepts/canonical-thresholds" },
  },
  {
    term: "Empty state",
    id: "empty-state",
    definition:
      "A view rendered when a content collection has zero items. Loading-empty (data has not yet arrived) and settled-empty (data arrived, collection is genuinely zero) must look obviously different — if they don't, the user can't tell whether to wait or to act. The settled-empty state needs to say three things: the load completed, the area is empty, and what the user can do about it.",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Engaging loading",
    id: "engaging-loading",
    definition:
      "Loading affordance for the 10 s+ band that fills the wait with information (Slack-style boot, agent narration, FIFA-style mini-game) rather than a static spinner. Prospectively shortens via Block & Zakay's filled-duration; retrospectively can lengthen via Ornstein's storage-size theory. The trade should be conscious. Honest when the engagement is information about the system; deceptive when it is decoration around it.",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Filled vs. empty duration",
    id: "filled-vs-empty-duration",
    definition:
      "William James's observation that empty intervals feel long while passing and short in memory; filled intervals do the reverse. Skeleton screens exploit this: they fill the prospective wait so it registers as shorter.",
    seeAlso: { label: "Concepts §2", href: "/concepts/how-humans-perceive-time" },
  },
  {
    term: "FMP — First Meaningful Paint",
    id: "fmp",
    definition:
      "Older Web Vitals metric capturing when the primary content of a page is visible. Largely superseded by LCP. Useful historical context for tools that report it.",
  },
  {
    term: "Gamma jitter",
    id: "gamma-jitter",
    definition:
      "Right-skewed random latency drawn from a gamma distribution (Erlang-2 in this project). Models real-network response times — most cluster near a median, a fat tail extends beyond. Used by the demo runner so naive/tuned comparisons feel realistic.",
  },
  {
    term: "Geometric-mean indifference threshold",
    id: "geometric-mean-indifference",
    definition:
      "The point at which a user genuinely cannot tell which of two waits is faster. Sits at the geometric mean of the two durations, not the arithmetic mean. Translation: to feel as fast as a 2-second competitor when you load in 5 seconds, you need to ship sub-3.16 s, not sub-3.5 s.",
    seeAlso: { label: "Concepts §5", href: "/concepts/time-perception-illusions" },
  },
  {
    term: "INP — Interaction to Next Paint",
    id: "inp",
    definition:
      "Web Vitals metric (replaced FID in 2024) for interaction responsiveness — the worst response time across all interactions on a page. Below 200 ms is good. Maps directly onto Doherty's 400 ms productivity cliff with margin to spare.",
  },
  {
    term: "Just-Noticeable Difference (JND)",
    id: "jnd",
    definition:
      "The threshold at which a stimulus change becomes detectable to a human observer. For latency in the sub-30-second range, the JND is roughly 20 % (Weber–Fechner). A 5 % improvement is wasted; a 25 % improvement is felt.",
    seeAlso: { label: "Concepts §1", href: "/concepts/perceived-performance" },
  },
  {
    term: "LCP — Largest Contentful Paint",
    id: "lcp",
    definition:
      "Web Vitals metric: when the largest above-the-fold element is rendered. Below 2.5 s is good; above 4 s is poor. Captures user-facing load speed better than older metrics like FCP.",
  },
  {
    term: "LQIP — Low-Quality Image Placeholder",
    id: "lqip",
    definition:
      "A small, low-resolution version of an image displayed first; the full image swaps in once it has loaded. Often combined with a blur-up filter so the transition feels organic. Anstis on edge contrast: a higher-contrast placeholder reads as faster than a soft ghostly one, even when both swap to the same final image at the same wall-clock moment.",
    seeAlso: { label: "Concepts §5", href: "/concepts/time-perception-illusions" },
  },
  {
    term: "Miller's thresholds",
    id: "miller-thresholds",
    definition:
      "Robert B. Miller's 1968 taxonomy of acceptable response times across 17 transaction types. The source under Nielsen's clean 0.1 / 1 / 10-second trichotomy; Miller's actual table is more granular.",
    seeAlso: { label: "Concepts §3", href: "/concepts/canonical-thresholds" },
  },
  {
    term: "Mousedown / pointerdown",
    id: "mousedown",
    definition:
      "DOM events that fire when a button is pressed, before it is released. Listening on these instead of `click` buys ~100–150 ms of head-start (Fitch). Touch equivalents need to gate against `touchmove` so scrolling does not trigger the action.",
  },
  {
    term: "Optimistic UI",
    id: "optimistic-ui",
    definition:
      "Render the user's action as if it succeeded, then reconcile with the server when the response arrives. Works well at ~99 % success rates. Failure modes: silent rollback, generic error toasts, and loss of mid-flight user input.",
  },
  {
    term: "Passive phase",
    id: "passive-phase",
    definition:
      "The mental state during a wait the user has noticed. Dopamine production drops, time stretches: humans overestimate passive duration by ~36 % (Fitch). Most loading-state patterns are about managing this phase.",
    seeAlso: { label: "Concepts §2", href: "/concepts/how-humans-perceive-time" },
  },
  {
    term: "Perceptual frame",
    id: "perceptual-frame",
    definition:
      "The ~100 ms time constant for sensory input to register, from Card-Moran-Newell 1983. Responses inside the frame feel caused by the user; responses outside it feel like a delay.",
  },
  {
    term: "Performance scaler",
    id: "performance-scaler",
    definition:
      "Adaptive perception calibrated to each user's actual response times. Measure the round-trip times the user is experiencing; scale skeleton durations, animation timings, and loading thresholds accordingly. From Eli Fitch's talk.",
    seeAlso: { label: "Concepts §7", href: "/concepts/performance-budgets-with-perception" },
  },
  {
    term: "Pre-action feedback",
    id: "pre-action-feedback",
    definition:
      "The system's acknowledgment that an input was received — a `:active` state, a button press animation, a focus-ring move. Should land within ~50 ms; the cheap ones cost nothing and prevent the double-tap failure mode.",
  },
  {
    term: "Predictive preloading",
    id: "predictive-preloading",
    definition:
      "Begin loading a resource before the user has confirmed they want it — on hover, on mouse deceleration, on form-step proximity. Idempotent and reversible operations only; not for side-effects with cost (charging cards, sending email).",
  },
  {
    term: "prefers-reduced-motion",
    id: "prefers-reduced-motion",
    definition:
      "CSS media query / accessibility setting indicating the user has asked for less motion. Replace shimmer pulses with static blocks, slides with opacity changes. Always honour it; never animate around it.",
  },
  {
    term: "Prospective vs. retrospective duration",
    id: "prospective-vs-retrospective",
    definition:
      "Block & Zakay's 1997 split. Prospective duration is judged in the moment — empty time feels long. Retrospective duration is judged after the fact — empty time feels short. Skeleton screens shorten prospective duration; engaging loading sequences can lengthen retrospective duration as a side effect.",
    seeAlso: { label: "Concepts §2", href: "/concepts/how-humans-perceive-time" },
  },
  {
    term: "Route prefetching",
    id: "route-prefetching",
    definition:
      "Begin loading a target route's bundle and data before the user navigates. Modern frameworks (Next.js, Remix, SvelteKit) prefetch on viewport entry or hover by default; tuning the trigger is a perception-layer lever.",
  },
  {
    term: "Skeleton screen",
    id: "skeleton-screen",
    definition:
      "A placeholder layout that matches the shape of the final content. Fills empty time so the prospective wait registers as shorter. Generic shimmers do not work — the skeleton must match the layout the content is going to take. The often-cited \"30 % faster than spinners\" figure is later folklore; the load-bearing research is the prospective/retrospective asymmetry (James 1890, Ornstein 1969, Block & Zakay 1997).",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Spinner",
    id: "spinner",
    definition:
      "Indeterminate-feedback animation for the narrow 1–2 s band with unknown duration. Below 1 s, no loader — tip-the-hand. Above 2 s, switch to a skeleton or determinate progress. The 500-ms-delayed pattern (gate every spinner behind a 500 ms timer) enforces the tip-the-hand rule cheaply: if the operation resolves before then, no spinner appears at all.",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Stale-while-revalidate",
    id: "stale-while-revalidate",
    definition:
      "Cache strategy: serve the stored response immediately, validate it in the background, update on completion. The user sees instant feedback even on cache hits that are about to expire.",
  },
  {
    term: "Streaming SSR / Suspense",
    id: "streaming-ssr",
    definition:
      "Server-rendered pages delivered in chunks as data becomes available, instead of all at once at the end. React Suspense + the App Router's streaming primitives make this composable per-component.",
  },
  {
    term: "Thinking state",
    id: "thinking-state",
    definition:
      "The pre-first-token indicator on AI surfaces — typically animated dots or a pulsing avatar. Distinct from a generic spinner because it implies process, not stall. Belongs to the responsive (100 ms – 1 s) band before token streaming begins.",
  },
  {
    term: "Time band",
    id: "time-band",
    definition:
      "One of four cognitive-transition zones used throughout this site: 0–100 ms (instant), 100 ms – 1 s (responsive), 1 – 10 s (engaged), 10 s+ (long). The Skill installs this as a decision rule.",
  },
  {
    term: "Time-aware feedback",
    id: "time-aware-feedback",
    definition:
      "The decision rule for which loading affordance to show: nothing under 1 s; spinner 1–2 s; skeleton or determinate progress 2–10 s; engagement 10 s+. Distilled from Miller 1968, Nielsen 1993, Fitch, and Myers 1985.",
    seeAlso: { label: "Concepts §8", href: "/concepts/what-cue-to-show-when" },
  },
  {
    term: "Tip-the-hand rule",
    id: "tip-the-hand",
    definition:
      "If the wait will resolve under one second, do not show a loader. Showing one tells the user they are waiting and pulls them out of active mode prematurely — a wait that would have gone unnoticed becomes a felt one.",
    seeAlso: { label: "Concepts §4", href: "/concepts/anatomy-of-a-wait" },
  },
  {
    term: "Token-by-token streaming",
    id: "token-streaming",
    definition:
      "Reveal AI-generated text as tokens arrive instead of after the full response is ready. Pace at a natural reading rhythm — instant per-token reveal feels jarring.",
  },
  {
    term: "Tool-call transparency",
    id: "tool-call-transparency",
    definition:
      "Surface what an agent is doing during a tool execution — \"Reading file…\", \"Searching…\", \"Running tests…\". Compresses retrospective duration (Block & Zakay 1997) and builds trust during long agentic workflows.",
  },
  {
    term: "TTI — Time to Interactive",
    id: "tti",
    definition:
      "The point at which layout has stabilised, key webfonts are visible, and the main thread is available enough to handle user input. The metric Eizenberg's argument anchors to — \"looks fast\" without TTI is a polished lie.",
    seeAlso: { label: "Concepts §6", href: "/concepts/when-perceived-performance-hurts-you" },
  },
  {
    term: "View Transitions API",
    id: "view-transitions",
    definition:
      "Web platform standard for cross-document and same-document animated transitions. Lets the browser handle morph-between-states animation with very little author code. Modern alternative to manually orchestrated route transitions. Gotcha: the API does not respect `prefers-reduced-motion` automatically — the author must short-circuit `animation-duration: 0s` or skip the `startViewTransition` call entirely when the user has asked for less motion. Easy to miss; ships as a silent accessibility regression.",
    seeAlso: { label: "Concepts §7", href: "/concepts/performance-budgets-with-perception" },
  },
  {
    term: "Weber–Fechner law",
    id: "weber-fechner",
    definition:
      "Foundational psychophysics: the smallest detectable change in a stimulus is roughly proportional to the magnitude of the stimulus. For latency, this implies the JND is ~20 % over a wide range — the basis for the rule that improvements under 20 % are mostly invisible.",
    seeAlso: { label: "Concepts §1", href: "/concepts/perceived-performance" },
  },
] as const;
