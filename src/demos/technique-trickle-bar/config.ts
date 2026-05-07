import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "NProgress trickle bar",
  description:
    "Top-edge bar for sub-second waits. Naive: nothing happens between click and result. Tuned: a thin bar trickles to ~80 % over the first ~300 ms, holds calm at 80 %, then snaps to 100 % when the actual work lands. Lighter cousin of the gradient-overshoot bar — no animation in the held state, no completion claim made.",
  timeBand: "100 MS – 1 S",
};

export const TOTAL_DURATION_P50_MS = 850;
export const TRICKLE_TARGET = 0.8;
export const TRICKLE_AT_MS = 320;
