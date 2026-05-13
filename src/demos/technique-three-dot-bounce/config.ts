import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Three-dot bounce",
  description:
    "Chat-style typing indicator. Naive: the chat just sits empty until the reply arrives. Tuned: three small dots stagger up-and-down to signal an actor is composing. Lighter footprint than a spinner, calmer than a marquee — well-suited to messaging interfaces where the wait is brief.",
  timeBand: "100 MS – 1 S",
  runMode: "manual",
  // Hug the bouncing-dots block exactly so the panel is snug to the
  // animation and doesn't jump on Run.
  panelMinHeight: "min-h-[52px]",
};

export const TOTAL_DURATION_P50_MS = 3500;
