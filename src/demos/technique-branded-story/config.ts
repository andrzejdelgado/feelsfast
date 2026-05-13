import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Branded story sequence",
  description:
    "Slack-style cold-boot pattern. Naive: a single \"Loading…\" line for the full ~12 s. Tuned: a paced sequence of branded frames — wordmark, tagline, skeleton, near-ready — each fading to the next over the wait. The user reads the wait as the app composing itself, not as absence.",
  timeBand: "10 S+",
  runMode: "manual",
  // Reserve the 10 rem stage height so the panel sits at the same
  // size from idle through every frame to done — no jump on Run.
  panelMinHeight: "min-h-[10rem]",
};

export const TOTAL_DURATION_P50_MS = 12000;

export type Frame = {
  /** ms into the wait at which this frame becomes the active one. */
  at: number;
  render: "wordmark" | "tagline" | "skeleton" | "ready";
};

export const FRAMES: readonly Frame[] = [
  { at: 0, render: "wordmark" },
  { at: 3000, render: "tagline" },
  { at: 6500, render: "skeleton" },
  { at: 10000, render: "ready" },
];
