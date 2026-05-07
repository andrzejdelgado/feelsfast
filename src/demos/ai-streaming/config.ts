import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "AI · Streaming response",
  description:
    "A chat-style assistant returns a ~200-character answer. Naive: total wait, then the full response drops in. Tuned: ~600 ms thinking state, then tokens stream at a natural reading pace.",
  timeBand: "1 – 10 S",
};

export const RESPONSE =
  "Perceived performance is the gap between objective time and how fast a UI feels. The clock might say 1.6 seconds, but a tuned interface can feel as fast as 1.4 — and that delta is the entire field.";
