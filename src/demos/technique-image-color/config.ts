import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Predominant-colour image",
  description:
    "Image hero loading. Naive: empty muted box until the file arrives, then the image snaps in. Tuned: the image's dominant colour fills the slot from frame zero (cheap to inline as a one-pixel data-uri at upload time), then crossfades into the actual image as it streams in. The eye reads the colour as the image arriving — perception starts before the file does.",
  timeBand: "1 – 10 S",
};

export const TOTAL_DURATION_P50_MS = 2400;

/**
 * The "real" image is rendered as a CSS gradient — it gets painted into
 * the slot when "loading" finishes. The dominant colour is the
 * single-hue HSL that summarises the gradient.
 */
export const HERO = {
  gradient:
    "radial-gradient(ellipse at 30% 35%, #ffd07b 0%, #ff8a5c 38%, #c64657 78%)",
  /** Single-hue summary of the gradient — what a 1×1 LQIP would carry. */
  predominantColor: "#ee8e62",
  alt: "Sunset over a dune ridge",
} as const;
