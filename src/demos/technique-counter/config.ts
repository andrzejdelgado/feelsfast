import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Animated Number Counter",
  description:
    "Reframe a static result as a discovery. Naive: \"847 results\" snaps in fully formed when the data lands. Tuned: same number, but it counts up from 0 to 847 over ~700 ms with an ease-out curve. The user reads the count as a *finding* the system arrived at, not a static label.",
  timeBand: "100 MS – 1 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 600;
export const TARGET_VALUE = 847;
export const COUNT_DURATION_MS = 700;
