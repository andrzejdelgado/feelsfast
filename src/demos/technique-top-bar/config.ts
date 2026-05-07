import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Top-edge progress bar",
  description:
    "A thin gradient bar across the top of the page. Naive: no top bar, just the content card filling in when ready. Tuned: bar trickles to ~95 % well before completion, then animates the gradient left-to-right until the actual work finishes — the wait reads as polish, not absence.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 4500;
/**
 * Bar visually reaches the end (100 %) long before the actual work
 * completes — the Instagram-stories trick. The remaining wait time is
 * filled by a gradient that animates left-to-right inside the now-
 * full bar, not by additional fill.
 */
export const OVERSHOOT_TARGET = 1;
/** Time at which the bar reaches OVERSHOOT_TARGET (about 40 % of the wait). */
export const OVERSHOOT_AT_MS = 1800;
