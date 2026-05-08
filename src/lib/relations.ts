/**
 * Cross-link registry for Scenarios ↔ Patterns ↔ Playground demos.
 *
 * The three content types share the same underlying dataset; they just
 * present it from different angles. This registry encodes the
 * relationships once so each surface can render a "Built from / Used in
 * / Appears in" strip without each MDX having to manually duplicate the
 * cross-links.
 *
 * Source of truth:
 *   - Scenario → demo: extracted from `import { Naive... } from "@/demos/<key>/naive"`
 *   - Scenario → patterns: extracted from `[label](/patterns/<slug>)` references
 *   - Pattern → demo: extracted from imports in pattern MDX
 *   - Pattern → scenarios: inverted from the scenario-side data
 *   - Technique-only demos: hand-mapped to the canonical pattern they
 *     demonstrate (the technique-* demos are pattern micro-exhibits with
 *     no parent scenario)
 */

export type ScenarioRel = {
  slug: string;
  title: string;
  /** The `src/demos/<key>` folder this scenario embeds. */
  demoKey: string | null;
  /** Pattern slugs this scenario links to in its prose. */
  patterns: string[];
};

export type PatternRel = {
  slug: string;
  title: string;
  /** The `src/demos/<key>` folder this pattern embeds, if any. */
  demoKey: string | null;
  /** Scenario slugs that explicitly reference this pattern. */
  scenarios: string[];
};

export const scenarios: readonly ScenarioRel[] = [
  { slug: "ai-agentic-workflow", title: "Agentic workflow", demoKey: "ai-agentic-workflow", patterns: ["ai-cancellation-affordance", "ai-tool-call-transparency", "background-sync", "determinate-progress", "engaging-loading", "time-aware-feedback"] },
  { slug: "ai-chat-streaming-response", title: "AI · Chat / streaming response", demoKey: "ai-streaming", patterns: ["ai-cancellation-affordance", "ai-thinking-state", "ai-token-streaming", "ai-tool-call-transparency", "engaging-loading", "pre-action-feedback"] },
  { slug: "ai-inline-completion", title: "Inline completion / suggestion", demoKey: "ai-inline-completion", patterns: ["ai-cancellation-affordance", "optimistic-ui", "pre-action-feedback", "stale-while-revalidate", "time-aware-feedback"] },
  { slug: "ai-long-compute-inference", title: "AI · Long compute / Inference", demoKey: "ai-streaming", patterns: ["ai-cancellation-affordance", "ai-token-streaming", "ai-tool-call-transparency", "background-sync", "determinate-progress", "engaging-loading"] },
  { slug: "ai-tool-execution", title: "Tool execution / agentic step", demoKey: "ai-tool-execution", patterns: ["ai-cancellation-affordance", "ai-thinking-state", "ai-tool-call-transparency", "engaging-loading", "time-aware-feedback"] },
  { slug: "auth-oauth", title: "Auth / OAuth flow", demoKey: "list-fetch", patterns: ["determinate-progress", "optimistic-ui", "pre-action-feedback", "skeleton-screens"] },
  { slug: "chat-input", title: "Chat input (typing-time feedback)", demoKey: "search-as-you-type", patterns: ["optimistic-ui", "pre-action-feedback", "stale-while-revalidate", "time-aware-feedback"] },
  { slug: "data-export-download", title: "Data export / download generation", demoKey: "data-export", patterns: ["animated-progress", "background-sync", "determinate-progress", "engaging-loading", "time-aware-feedback"] },
  { slug: "data-table-loading", title: "Data table loading", demoKey: "list-fetch", patterns: ["animation-timing", "skeleton-screens", "stale-while-revalidate", "time-aware-feedback"] },
  { slug: "drag-and-drop", title: "Drag and drop", demoKey: "drag-and-drop", patterns: ["animation-timing", "mousedown-vs-click", "optimistic-ui", "pre-action-feedback", "touch-pointer-down"] },
  { slug: "file-upload-batch", title: "File upload (batch)", demoKey: "file-upload", patterns: ["ai-cancellation-affordance", "background-sync", "determinate-progress", "engaging-loading", "optimistic-ui", "time-aware-feedback"] },
  { slug: "file-upload-single", title: "File upload (single)", demoKey: "file-upload", patterns: ["ai-cancellation-affordance", "animated-progress", "determinate-progress", "optimistic-ui", "pre-action-feedback", "time-aware-feedback"] },
  { slug: "form-submission", title: "Form submission", demoKey: "optimistic-actions", patterns: ["animated-progress", "determinate-progress", "optimistic-ui", "pre-action-feedback", "time-aware-feedback"] },
  { slug: "image-gallery", title: "Image gallery", demoKey: "image-gallery", patterns: ["adaptive-loading", "image-progressive-loading", "predictive-preloading-hover", "skeleton-screens", "time-aware-feedback"] },
  { slug: "infinite-scroll", title: "Infinite scroll", demoKey: "list-fetch", patterns: ["predictive-preloading-hover", "skeleton-screens", "stale-while-revalidate"] },
  { slug: "long-list-pagination", title: "Long list / pagination", demoKey: "list-fetch", patterns: ["predictive-preloading-hover", "skeleton-screens", "stale-while-revalidate", "time-aware-feedback"] },
  { slug: "map-interactions", title: "Map interactions", demoKey: null, patterns: ["adaptive-loading", "animation-timing", "image-progressive-loading", "predictive-preloading-hover", "stale-while-revalidate"] },
  { slug: "multi-step-wizard-checkout", title: "Multi-step wizard / checkout", demoKey: "list-fetch", patterns: ["optimistic-ui", "pre-action-feedback", "predictive-preloading-hover", "skeleton-screens"] },
  { slug: "optimistic-actions", title: "Optimistic actions (like, save, undo)", demoKey: "optimistic-actions", patterns: ["animation-timing", "mousedown-vs-click", "optimistic-ui", "pre-action-feedback"] },
  { slug: "page-load-cold", title: "Page load (cold)", demoKey: "list-fetch", patterns: ["image-progressive-loading", "skeleton-screens", "streaming-ssr", "time-aware-feedback"] },
  { slug: "page-load-warm-cache", title: "Page load (warm cache)", demoKey: "list-fetch", patterns: ["route-prefetching", "skeleton-screens", "view-transitions"] },
  { slug: "real-time-updates", title: "Real-time updates / live data", demoKey: "real-time-updates", patterns: ["animation-timing", "pre-action-feedback", "skeleton-screens", "stale-while-revalidate", "time-aware-feedback"] },
  { slug: "route-navigation", title: "Route navigation", demoKey: "list-fetch", patterns: ["mousedown-vs-click", "optimistic-ui", "route-prefetching", "skeleton-screens", "view-transitions"] },
  { slug: "search-as-you-type", title: "Search as you type", demoKey: "search-as-you-type", patterns: ["pre-action-feedback", "stale-while-revalidate", "time-aware-feedback"] },
];

export const patterns: readonly PatternRel[] = [
  { slug: "adaptive-loading", title: "Adaptive loading (performance scaler)", demoKey: null, scenarios: [] },
  { slug: "ai-cancellation-affordance", title: "Cancellation affordance for streaming / long ops", demoKey: null, scenarios: [] },
  { slug: "ai-thinking-state", title: "Thinking state (pre-first-token)", demoKey: "ai-streaming", scenarios: [] },
  { slug: "ai-token-streaming", title: "Token-by-token streaming render", demoKey: "ai-streaming", scenarios: [] },
  { slug: "ai-tool-call-transparency", title: "Tool-call transparency", demoKey: null, scenarios: [] },
  { slug: "animated-progress", title: "Animated progress (backwards-decelerating ribs)", demoKey: null, scenarios: [] },
  { slug: "animation-timing", title: "Animation timing for state changes", demoKey: null, scenarios: [] },
  { slug: "background-sync", title: "Background sync", demoKey: null, scenarios: [] },
  { slug: "determinate-progress", title: "Determinate progress bars", demoKey: "file-upload", scenarios: [] },
  { slug: "empty-state-loading", title: "Empty states that hint at loading", demoKey: null, scenarios: [] },
  { slug: "engaging-loading", title: "Engaging loading states", demoKey: null, scenarios: [] },
  { slug: "image-progressive-loading", title: "Image progressive loading (LQIP, blur-up)", demoKey: null, scenarios: [] },
  { slug: "mousedown-vs-click", title: "mousedown / pointerdown vs. click", demoKey: null, scenarios: [] },
  { slug: "optimistic-ui", title: "Optimistic UI", demoKey: "optimistic-actions", scenarios: [] },
  { slug: "pre-action-feedback", title: "Pre-action feedback (`:active`, button press)", demoKey: null, scenarios: [] },
  { slug: "predictive-preloading-hover", title: "Predictive preloading (hover, mouse deceleration)", demoKey: null, scenarios: [] },
  { slug: "route-prefetching", title: "Route prefetching", demoKey: null, scenarios: [] },
  { slug: "skeleton-screens", title: "Skeleton screens", demoKey: "list-fetch", scenarios: [] },
  { slug: "spinners", title: "Spinners (when appropriate)", demoKey: null, scenarios: [] },
  { slug: "stale-while-revalidate", title: "Stale-while-revalidate", demoKey: null, scenarios: [] },
  { slug: "streaming-ssr", title: "Streaming SSR / Suspense", demoKey: null, scenarios: [] },
  { slug: "time-aware-feedback", title: "Time-aware feedback", demoKey: null, scenarios: [] },
  { slug: "touch-pointer-down", title: "Touch start / pointer down on touch", demoKey: null, scenarios: [] },
  { slug: "view-transitions", title: "View Transitions API", demoKey: null, scenarios: [] },
];

// Inverted: pattern slug → scenario slugs that reference it.
const scenariosByPattern = new Map<string, string[]>();
for (const sc of scenarios) {
  for (const p of sc.patterns) {
    if (!scenariosByPattern.has(p)) scenariosByPattern.set(p, []);
    scenariosByPattern.get(p)!.push(sc.slug);
  }
}
for (const p of patterns as PatternRel[]) {
  p.scenarios = scenariosByPattern.get(p.slug) ?? [];
}

/**
 * Hand-curated mapping for technique-* demos that don't appear in any
 * scenario MDX. Each technique demo is a micro-exhibit of a single
 * pattern, so we map them by hand to the canonical pattern slug. Scenario
 * lookup falls back to the pattern's scenario list.
 */
const techniqueDemoToPatterns: Record<string, string[]> = {
  "technique-top-bar": ["time-aware-feedback", "determinate-progress"],
  "technique-shimmer-skeleton": ["skeleton-screens"],
  "technique-skeleton-simple": ["skeleton-screens"],
  "technique-skeleton-true": ["skeleton-screens"],
  "technique-skeleton-pulse": ["skeleton-screens"],
  "technique-skeleton-reveal": ["skeleton-screens", "view-transitions"],
  "technique-image-color": ["image-progressive-loading"],
  "technique-image-brand": ["image-progressive-loading"],
  "technique-thinking-gradient": ["ai-thinking-state"],
  "technique-three-dot-bounce": ["ai-thinking-state"],
  "technique-pulsing-orb": ["ai-thinking-state"],
  "technique-mousedown": ["mousedown-vs-click"],
  "technique-icon-flip": ["optimistic-ui"],
  "technique-trickle-bar": ["time-aware-feedback"],
  "technique-marquee-bar": ["spinners", "engaging-loading"],
  "technique-rotating-tips": ["engaging-loading"],
  "technique-branded-story": ["engaging-loading"],
  "technique-mini-game": ["engaging-loading"],
  "technique-notify-complete": ["background-sync"],
  "technique-spinner": ["spinners"],
  "technique-decel-bar": ["animated-progress"],
  "technique-counter": ["animated-progress"],
};

export type DemoContext = {
  scenarios: { slug: string; title: string }[];
  patterns: { slug: string; title: string }[];
};

const patternsBySlug = new Map(patterns.map((p) => [p.slug, p]));
const scenariosBySlug = new Map(scenarios.map((s) => [s.slug, s]));

/**
 * Given a demo key (the folder name under src/demos/), return every
 * scenario and pattern that references it.
 *
 * The Playground uses this to render an "Appears in" strip per demo
 * card so each Playground entry has a back-pointer into the prose.
 */
export function demoContext(demoKey: string): DemoContext {
  const scenarioMatches = scenarios
    .filter((s) => s.demoKey === demoKey)
    .map((s) => ({ slug: s.slug, title: s.title }));

  const patternMatches = new Map<string, { slug: string; title: string }>();
  for (const p of patterns) {
    if (p.demoKey === demoKey) {
      patternMatches.set(p.slug, { slug: p.slug, title: p.title });
    }
  }
  // Technique demos: pull from the hand-curated map.
  if (demoKey in techniqueDemoToPatterns) {
    for (const slug of techniqueDemoToPatterns[demoKey]) {
      const p = patternsBySlug.get(slug);
      if (p) patternMatches.set(slug, { slug: p.slug, title: p.title });
    }
  }

  return {
    scenarios: scenarioMatches,
    patterns: Array.from(patternMatches.values()),
  };
}

/**
 * Patterns linked from a given scenario, resolved to title/slug pairs.
 * Used by the "Built from" rail at the top of each scenario page.
 */
export function patternsForScenario(
  scenarioSlug: string,
): { slug: string; title: string }[] {
  const sc = scenariosBySlug.get(scenarioSlug);
  if (!sc) return [];
  return sc.patterns
    .map((slug) => patternsBySlug.get(slug))
    .filter((p): p is PatternRel => Boolean(p))
    .map((p) => ({ slug: p.slug, title: p.title }));
}

/**
 * Scenarios that link to a given pattern, resolved to title/slug pairs.
 * Used by the "Used in" rail at the top of each pattern page.
 */
export function scenariosForPattern(
  patternSlug: string,
): { slug: string; title: string }[] {
  const p = patternsBySlug.get(patternSlug);
  if (!p) return [];
  return p.scenarios
    .map((slug) => scenariosBySlug.get(slug))
    .filter((s): s is ScenarioRel => Boolean(s))
    .map((s) => ({ slug: s.slug, title: s.title }));
}
