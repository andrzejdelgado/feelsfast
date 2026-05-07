import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Marquee progress bar",
  description:
    "Indeterminate inline bar. Naive: empty muted line; the wait reads as absence. Tuned: a primary-coloured segment slides left-to-right repeatedly inside the track. No completion claim — just motion that says \"working.\" The right cue when you genuinely don't know how long it will take.",
  timeBand: "100 MS – 1 S",
};

export const TOTAL_DURATION_P50_MS = 950;
