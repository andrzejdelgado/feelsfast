import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Mini interactive widget",
  description:
    "FIFA-style: give the user something to do during the wait. Naive: a spinner for ~12 s. Tuned: a small tap-the-dot widget — dots appear at random spots; tap them for a score. The wait is no longer time the user is paying; it is time they are spending. The retrospective duration shrinks accordingly.",
  timeBand: "10 S+",
};

export const TOTAL_DURATION_P50_MS = 12000;
export const DOT_INTERVAL_MS = 900;
/** Each dot stays on screen this long before disappearing. */
export const DOT_LIFETIME_MS = 1500;
