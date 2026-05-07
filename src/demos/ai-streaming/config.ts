import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "AI · Streaming response",
  description:
    "A chat-style assistant returns a ~200-character answer. Naive: total wait, then the full response drops in. Tuned: ~600 ms thinking state, then tokens stream at a natural reading pace.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const RESPONSE =
  "Perceived performance is the gap between objective time and how fast a UI feels. The clock might say 1.6 seconds, but a tuned interface can feel as fast as 1.4 — and that delta is the entire field.";

/** Shared p50 used by both Naive and Tuned via the seed so both finish together. */
export const TOTAL_DURATION_P50_MS = 5500;
/** Fraction of the total spent in the "thinking" pre-token state (Tuned). */
export const THINKING_FRACTION = 0.15;
