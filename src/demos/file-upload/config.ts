import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Determinate Progress Bar + Percentage Count",
  description:
    "Upload a 4.2 MB file. Naive: generic spinner with no progress signal. Tuned: optimistic filename render, determinate progress bar, success affordance with checkmark.",
  timeBand: "1 – 10 S",
};

export const FILE = { name: "vacation-photo.jpg", size: 4_200_000 } as const;
export const TOTAL_DURATION_P50_MS = 5000;
