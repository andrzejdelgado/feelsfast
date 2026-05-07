import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Rotating tips",
  description:
    "Engaging copy during a long wait. Naive: a static \"Loading…\" line for the full duration; the user has nothing to do but stare. Tuned: a \"Did you know?\" card cycles through a handful of perception facts every ~2.5 s with a soft cross-fade. Same wait — but the time fills with information instead of absence.",
  timeBand: "10 S+",
};

export const TOTAL_DURATION_P50_MS = 12000;
export const TIP_INTERVAL_MS = 2500;

export const TIPS: readonly string[] = [
  "Below 100 ms, users perceive the system as instantaneous (Card-Moran-Newell 1983).",
  "Backwards-decelerating progress bars feel ~12 % faster than linear ones (Harrison et al. 2010).",
  "Skeleton screens reduce perceived wait time vs. spinners by filling the slot with structure.",
  "The first 50 ms is your perceptual frame for input acknowledgement.",
  "Animation between 150–250 ms feels neither rushed nor sluggish (Eli Fitch).",
  "Optimistic UI works at < 1 % failure rate; above that, it lies.",
];
