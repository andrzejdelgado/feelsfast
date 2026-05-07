import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Tool execution",
  description:
    "An agent reads a file, searches the codebase, edits a file, and runs a typecheck. Naive: opaque \"Working…\" spinner for the full duration. Tuned: each tool call streams in as the agent runs it, with its own running / done state.",
  timeBand: "1 – 10 S",
};

export type ToolStep = {
  id: string;
  label: string;
  detail: string;
  /** Median duration in ms; gamma-jittered at runtime. */
  durationMs: number;
};

export const STEPS: readonly ToolStep[] = [
  {
    id: "read",
    label: "Read package.json",
    detail: "Found react@19, next@16, tailwindcss@4",
    durationMs: 350,
  },
  {
    id: "search",
    label: "Search for useState across src",
    detail: "14 matches in 8 files",
    durationMs: 1100,
  },
  {
    id: "edit",
    label: "Edit src/components/SearchBox.tsx",
    detail: "Replaced useState with useDeferredValue",
    durationMs: 700,
  },
  {
    id: "typecheck",
    label: "Run npm run typecheck",
    detail: "No errors. 0 warnings.",
    durationMs: 1500,
  },
];
