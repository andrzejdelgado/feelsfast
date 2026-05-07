import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "AI pulsing orb",
  description:
    "AI-presence cue for short waits. Naive: a static \"Working…\" line. Tuned: a small primary-coloured circle that breathes (opacity + scale). Calmer than a spinner, more present than nothing — the modern \"the agent is here\" signal used between tool calls and after a user message.",
  timeBand: "100 MS – 1 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 3500;
