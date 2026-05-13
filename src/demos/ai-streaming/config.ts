import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Animated Text Streaming",
  description:
    "A chat-style assistant returns a short answer. Naive: total wait, then the full response drops in. Tuned: ~600 ms thinking state, then tokens stream at a natural reading pace.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserve the loaded-response card height. The response wraps to
  // 2 lines on most viewports but to 3 lines on very narrow ones
  // (≤ ~340 px) — lock to the 3-line natural so even the narrowest
  // mobile never jumps between idle and streaming.
  panelMinHeight: "min-h-[102px] sm:min-h-[79px]",
};

/** Single response used at every breakpoint — short enough that
 *  mobile wraps to 2 lines and md+ fits it on one. */
export const RESPONSE =
  "The gap between how fast a UI is and how fast it feels.";

/** Mobile uses the same response — same copy, just narrower wrap. */
export const RESPONSE_MOBILE = RESPONSE;

/** Shared p50 used by both Naive and Tuned via the seed so both finish together. */
export const TOTAL_DURATION_P50_MS = 5500;
/** Fraction of the total spent in the "thinking" pre-token state (Tuned). */
export const THINKING_FRACTION = 0.15;
