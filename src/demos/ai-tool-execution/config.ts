import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Tool execution",
  description:
    "An agent reads a file, searches the codebase, and runs a typecheck. Naive: opaque \"Working…\" spinner for the full duration. Tuned: each tool call streams in as the agent runs it, with its own running / done state.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserve the loaded-state height of the 3-step tuned list (each
  // item with always-rendered title + detail) + the trailing "Done."
  // so neither panel jumps as steps complete.
  panelMinHeight: "min-h-[226px]",
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
    detail: "Found 3 dependencies",
    durationMs: 500,
  },
  {
    id: "search",
    label: "Search useState",
    detail: "14 matches",
    durationMs: 1200,
  },
  {
    id: "typecheck",
    label: "Run typecheck",
    detail: "0 errors",
    durationMs: 1800,
  },
];
