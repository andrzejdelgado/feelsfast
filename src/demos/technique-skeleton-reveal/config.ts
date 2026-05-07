import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Skeleton-to-content reveal",
  description:
    "Navigation transition. Naive: outgoing article → blank → incoming article. The blank frame reads as a stutter. Tuned: outgoing article → content-true skeleton of incoming article → real incoming article. The transition decouples the navigation from the data fetch — the user sees \"the next page is here, the data is on its way\" instead of \"the page broke.\"",
  timeBand: "1 – 10 S",
};

export const FETCH_DURATION_P50_MS = 1400;

export type Article = { title: string; body: string };

export const ARTICLES: readonly Article[] = [
  {
    title: "How perception bends time",
    body: "The clock can say one thing; the experience can say another. Card-Moran-Newell's perceptual frame is the budget the rest of the platform is built on.",
  },
  {
    title: "Backwards-decelerating ribs",
    body: "Harrison et al. measured a ~12 % perceived speed-up from progress bars that fill fast and slow as they approach the end. The trick costs nothing.",
  },
  {
    title: "The 10-second wall",
    body: "Past 10 s the user's attention is no longer reliably on the task. The right pattern stops being progress and becomes engagement or hand-off.",
  },
];
