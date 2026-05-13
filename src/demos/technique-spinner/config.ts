import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Indeterminate spinner",
  description:
    "The classic. Naive: nothing happens during the wait, then content snaps in. Tuned: a circular spinner appears the moment work starts, disappears when it lands. Honest about \"working, no estimate yet,\" and the right cue when the wait is brief enough that anything more elaborate would be over-engineering — but never deploy below 1 s, where it telegraphs a wait the user would not have noticed.",
  timeBand: "100 MS – 1 S",
  runMode: "manual",
  // Match the loaded spinner block so the panel doesn't jump from
  // idle (placeholder) to running (spinner).
  panelMinHeight: "min-h-[128px]",
};

export const TOTAL_DURATION_P50_MS = 800;
