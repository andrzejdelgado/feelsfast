import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Real-time updates",
  description:
    "A live activity feed with new events arriving at random intervals. Naive: items pop in instantly with no register. Tuned: items slide in with a brief highlight that fades, so the eye knows what is new.",
  timeBand: "0–100 MS",
};

export const EVENT_INTERVAL_P50_MS = 1500;

export const ACTORS = [
  "Maya",
  "Ben",
  "Ade",
  "Lin",
  "Tom",
  "Rin",
  "Joel",
  "Pia",
] as const;

export const VERBS = [
  "merged a PR",
  "opened an issue",
  "deployed staging",
  "updated the status",
  "left a review",
  "commented on a thread",
  "started a build",
  "tagged a release",
] as const;

export type Event = {
  id: number;
  actor: (typeof ACTORS)[number];
  verb: (typeof VERBS)[number];
  /** ms since the demo started, used for relative-time labels. */
  at: number;
};

let nextId = 1;

export function makeEvent(at: number): Event {
  return {
    id: nextId++,
    actor: ACTORS[Math.floor(Math.random() * ACTORS.length)],
    verb: VERBS[Math.floor(Math.random() * VERBS.length)],
    at,
  };
}

export function formatRelative(at: number, now: number): string {
  const diff = Math.max(0, Math.round((now - at) / 1000));
  if (diff === 0) return "just now";
  if (diff === 1) return "1 s ago";
  return `${diff} s ago`;
}
