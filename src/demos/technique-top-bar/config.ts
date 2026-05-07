import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Top-edge progress bar",
  description:
    "A thin gradient bar across the top of the page. Naive: no top bar, just the content card filling in when ready. Tuned: bar trickles to ~95 % well before completion, then animates the gradient left-to-right until the actual work finishes — the wait reads as polish, not absence.",
  timeBand: "1 – 10 S",
};

export const TOTAL_DURATION_P50_MS = 4500;
/** Bar reaches this fraction long before completion, then idle-loops. */
export const OVERSHOOT_TARGET = 0.95;
/** Time at which the bar reaches OVERSHOOT_TARGET (about half the wait). */
export const OVERSHOOT_AT_MS = 1800;
