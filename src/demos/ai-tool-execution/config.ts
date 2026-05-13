import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Live Status Timeline",
  description:
    "An agent reads a file, searches the codebase, and runs a typecheck. Naive: opaque \"Working…\" spinner for the full duration. Tuned: each tool call streams in as the agent runs it, with its own running / done state.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserves the tallest Tuned list height: 2 mobile rows + Done line
  // (mobile), 3 md+ rows + Done line. With the items pre-rendered at
  // constant row height, neither panel jumps as steps complete.
  panelMinHeight: "min-h-[162px] md:min-h-[226px]",
};

export type ToolStep = {
  id: string;
  label: string;
  detail: string;
  /** Median duration in ms; gamma-jittered at runtime. */
  durationMs: number;
};

/** Full 3-step set used at md+. Mobile uses the first two. */
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

/** 2-step set used at mobile so the panel fits without stacking. */
export const STEPS_MOBILE: readonly ToolStep[] = STEPS.slice(0, 2);
