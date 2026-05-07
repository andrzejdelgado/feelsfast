import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Simple block skeleton",
  description:
    "Cheapest skeleton you can ship. Naive: empty card until the data arrives. Tuned: a few generic gray blocks at approximate positions — does not try to mirror the final layout, just signals that *something* is loading. Right when the cost of building a content-true skeleton is not worth the marginal perception gain.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 2400;
