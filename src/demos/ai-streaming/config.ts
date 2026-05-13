import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "AI · Streaming response",
  description:
    "A chat-style assistant returns a short answer. Naive: total wait, then the full response drops in. Tuned: ~600 ms thinking state, then tokens stream at a natural reading pace.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserve the loaded-response card height at every breakpoint so the
  // panel doesn't jump between idle → thinking → streaming → done.
  // Values match the inner card's natural height so the card sits snug
  // to its content (no empty space below). Mobile uses
  // `RESPONSE_MOBILE`; md+ uses the longer `RESPONSE`.
  panelMinHeight: "min-h-[102px] md:min-h-[148px]",
};

/** Full-length answer for tablet and desktop (~200 characters). */
export const RESPONSE =
  "Perceived performance is the gap between objective time and how fast a UI feels. The clock might say 1.6 seconds, but a tuned interface can feel as fast as 1.4 — and that delta is the entire field.";

/** Shorter answer for mobile so the streamed text fits comfortably in
 *  the narrow panel without the card growing to ~250 px tall. */
export const RESPONSE_MOBILE =
  "Perceived performance is the gap between how fast a UI is and how fast it feels.";

/** Shared p50 used by both Naive and Tuned via the seed so both finish together. */
export const TOTAL_DURATION_P50_MS = 5500;
/** Fraction of the total spent in the "thinking" pre-token state (Tuned). */
export const THINKING_FRACTION = 0.15;
