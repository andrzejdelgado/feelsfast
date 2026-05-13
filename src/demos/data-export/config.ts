import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Long-task Progress",
  description:
    "Server generates a 5,000-row CSV. Naive: opaque spinner past the 10-second wall. Tuned: row-count milestones, engagement copy, and an email-when-ready hand-off if the wait runs long.",
  timeBand: "10 S+",
  runMode: "manual",
};

export const TOTAL_ROWS = 5000;
export const TOTAL_DURATION_P50_MS = 12000;
/** Past this point, surface the "email me when ready" hand-off. */
export const ENGAGEMENT_THRESHOLD_MS = 10000;

export const ENGAGEMENT_MESSAGES = [
  "Compiling rows…",
  "Applying filters and sorts…",
  "Calculating aggregates…",
  "Compressing the export…",
  "Finalising the download…",
] as const;
