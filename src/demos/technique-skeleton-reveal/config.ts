import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Skeleton-to-content reveal",
  description:
    "Navigation transition. Naive: outgoing article → blank → incoming article. The blank frame reads as a stutter. Tuned: outgoing article → content-true skeleton of incoming article → real incoming article. The transition decouples the navigation from the data fetch — the user sees \"the next page is here, the data is on its way\" instead of \"the page broke.\"",
  timeBand: "1 – 10 S",
};

export const FETCH_DURATION_P50_MS = 1400;

export type Article = { title: string; body: string };

/**
 * Two-word titles + 3-line bodies, kept tight so every article wraps
 * to the same 3-line shape and the card height is identical for all
 * three (no card-to-card jump as the reader clicks Next).
 */
export const ARTICLES: readonly Article[] = [
  {
    title: "Perception time",
    body: "The clock says one thing; experience says another. That gap is perceived performance.",
  },
  {
    title: "Decelerating ribs",
    body: "Harrison 2010: bars that fill fast then slow near the end feel ~12 % faster than linear. Costs nothing.",
  },
  {
    title: "Ten-second wall",
    body: "Past 10 s the user's attention drifts. The right pattern stops being progress and becomes engagement.",
  },
];
