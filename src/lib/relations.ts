/**
 * Cross-link registry for Scenarios ↔ Playground demos.
 *
 * Two surfaces share the same underlying dataset and the registry encodes
 * the relationship once so each surface can render its own "Appears in"
 * strip without each MDX having to manually duplicate the cross-links.
 *
 * (The platform previously had a third surface — Patterns — that this
 * registry also indexed. Patterns were dismantled and their content
 * redistributed into Concepts essays, Scenarios, and the Glossary; the
 * arrays / helpers that referenced them are gone.)
 */

export type ScenarioRel = {
  slug: string;
  title: string;
  /** The `src/demos/<key>` folder this scenario embeds. */
  demoKey: string | null;
};

export const scenarios: readonly ScenarioRel[] = [
  { slug: "ai-agentic-workflow", title: "Agentic workflow", demoKey: "ai-agentic-workflow" },
  { slug: "ai-chat-streaming-response", title: "AI · Chat / streaming response", demoKey: "ai-streaming" },
  { slug: "ai-inline-completion", title: "Inline completion / suggestion", demoKey: "ai-inline-completion" },
  { slug: "ai-long-compute-inference", title: "AI · Long compute / Inference", demoKey: "ai-streaming" },
  { slug: "ai-tool-execution", title: "Tool execution / agentic step", demoKey: "ai-tool-execution" },
  { slug: "auth-oauth", title: "Auth / OAuth flow", demoKey: "list-fetch" },
  { slug: "chat-input", title: "Chat input (typing-time feedback)", demoKey: "search-as-you-type" },
  { slug: "data-export-download", title: "Data export / download generation", demoKey: "data-export" },
  { slug: "data-table-loading", title: "Data table loading", demoKey: "list-fetch" },
  { slug: "drag-and-drop", title: "Drag and drop", demoKey: "drag-and-drop" },
  { slug: "file-upload-batch", title: "File upload (batch)", demoKey: "file-upload" },
  { slug: "file-upload-single", title: "File upload (single)", demoKey: "file-upload" },
  { slug: "form-submission", title: "Form submission", demoKey: "optimistic-actions" },
  { slug: "image-gallery", title: "Image gallery", demoKey: "image-gallery" },
  { slug: "infinite-scroll", title: "Infinite scroll", demoKey: "list-fetch" },
  { slug: "long-list-pagination", title: "Long list / pagination", demoKey: "list-fetch" },
  { slug: "map-interactions", title: "Map interactions", demoKey: null },
  { slug: "multi-step-wizard-checkout", title: "Multi-step wizard / checkout", demoKey: "list-fetch" },
  { slug: "optimistic-actions", title: "Optimistic actions (like, save, undo)", demoKey: "optimistic-actions" },
  { slug: "page-load-cold", title: "Page load (cold)", demoKey: "list-fetch" },
  { slug: "page-load-warm-cache", title: "Page load (warm cache)", demoKey: "list-fetch" },
  { slug: "real-time-updates", title: "Real-time updates / live data", demoKey: "real-time-updates" },
  { slug: "route-navigation", title: "Route navigation", demoKey: "list-fetch" },
  { slug: "search-as-you-type", title: "Search as you type", demoKey: "search-as-you-type" },
];

export type DemoContext = {
  scenarios: { slug: string; title: string }[];
};

/**
 * Given a demo key (the folder name under src/demos/), return every
 * scenario that references it.
 *
 * The Playground uses this to render an "Appears in" strip per demo
 * card so each Playground entry has a back-pointer into the prose.
 */
export function demoContext(demoKey: string): DemoContext {
  const scenarioMatches = scenarios
    .filter((s) => s.demoKey === demoKey)
    .map((s) => ({ slug: s.slug, title: s.title }));

  return {
    scenarios: scenarioMatches,
  };
}
