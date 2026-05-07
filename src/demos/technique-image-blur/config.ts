import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Blurred image (LQIP)",
  description:
    "True LQIP — Low-Quality Image Placeholder. Naive: empty muted box, then snap. Tuned: a heavily blurred preview of the actual image fills the slot from frame zero (in production: a tiny 16×16 base64 thumbnail blown up and blurred). The blur transitions to zero over 350 ms when the full file lands. The user reads the wait as resolution, not absence.",
  timeBand: "1 – 10 S",
};

export const TOTAL_DURATION_P50_MS = 2400;

export const HERO = {
  gradient:
    "radial-gradient(ellipse at 60% 70%, #f6c989 0%, #d99c5a 50%, #8a4f1e 100%)",
  alt: "Desert dune at golden hour",
} as const;
