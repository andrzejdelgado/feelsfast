import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Simple Skeleton",
  description:
    "Cheapest skeleton you can ship. Naive: empty card until the data arrives. Tuned: a few generic gray blocks at approximate positions — does not try to mirror the final layout, just signals that *something* is loading. Right when the cost of building a content-true skeleton is not worth the marginal perception gain.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // All three inner-card states (empty, skeleton, loaded card) are
  // pinned to the same `min-h-[6rem]` so the panel doesn't shift
  // height before / during / after the run.
  panelMinHeight: "min-h-[6rem]",
};

export const TOTAL_DURATION_P50_MS = 2400;
