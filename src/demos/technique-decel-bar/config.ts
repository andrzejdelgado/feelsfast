import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Backwards-decelerating progress bar",
  description:
    "Two bars, same actual duration. Naive: linear fill from 0 → 100 %. Tuned: same fill, but eased to be fast at the start and slow as it approaches the end, with backwards-moving ribbed pattern overlaid. Harrison et al. 2010 measured ~11–12 % perceived speed-up vs. linear at the same real wall-clock time. Free perception with no engineering cost.",
  timeBand: "1 – 10 S",
};

export const TOTAL_DURATION_P50_MS = 4500;
