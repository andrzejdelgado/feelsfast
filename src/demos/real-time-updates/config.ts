import type { DemoConfig } from "@/components/DemoRunner";
import { mulberry32, seededGamma } from "@/lib/jitter";

export const config: DemoConfig = {
  title: "Real-time updates",
  description:
    "A live activity feed with new events arriving at random intervals. Naive: items pop in instantly with no register. Tuned: items slide in with a brief highlight that fades, so the eye knows what is new.",
  timeBand: "0–100 MS",
  runMode: "manual",
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

export type ScheduledEvent = { event: Event; at: number };

/**
 * Pre-roll a deterministic event stream for the feed. Both Off and On
 * sides consume the *same* stream from the *same* seed, so every event
 * (its arrival time, actor, and verb) is identical between the panels
 * — the only difference is how the panel reveals it.
 */
export function rollEventStream(
  seed: number,
  count: number = 30,
): ScheduledEvent[] {
  const events: ScheduledEvent[] = [];
  const pickRng = mulberry32(seed);
  let t = 0;
  for (let i = 0; i < count; i++) {
    t += seededGamma(seed + i * 1009 + 1, EVENT_INTERVAL_P50_MS);
    events.push({
      at: t,
      event: {
        id: i + 1,
        actor: ACTORS[Math.floor(pickRng() * ACTORS.length)],
        verb: VERBS[Math.floor(pickRng() * VERBS.length)],
        at: t,
      },
    });
  }
  return events;
}

export function formatRelative(at: number, now: number): string {
  const diff = Math.max(0, Math.round((now - at) / 1000));
  if (diff === 0) return "just now";
  if (diff === 1) return "1 s ago";
  return `${diff} s ago`;
}
