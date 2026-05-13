import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Mousedown vs click head-start",
  description:
    "Same button, same work. Naive: fires on `click` (after the user releases the mouse). Tuned: fires on `mousedown` (the moment the press begins). The user holds the button down for ~100–150 ms — that whole window is free latency budget you reclaim by starting work earlier.",
  timeBand: "0–100 MS",
  // Mobile idle wraps the helper line to 2 lines (taller than
  // running/done); md+ keeps it on a single line. Lock each
  // breakpoint to its tallest state so neither side jumps.
  panelMinHeight: "min-h-[150px] md:min-h-[134px]",
};

/** Server round-trip simulated on the Tuned side. */
export const SIMULATED_WORK_MS = 600;
/**
 * Penalty applied to the Naive side per click — stands in for the
 * ~100–150 ms hold-time the user wastes by waiting for `click`
 * (which fires on release) instead of `mousedown` (which fires on
 * press). 1.2 → Off is exactly 20 % slower than On every time.
 */
export const NAIVE_LATENCY_FACTOR = 1.2;
