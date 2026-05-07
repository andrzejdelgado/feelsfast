import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Mini interactive widget",
  description:
    "T-Rex Run-style mini-game during a long wait. Naive: a spinner for the full duration. Tuned: a clickable runner game — press Jump to leap over incoming obstacles. The wait stops being time the user is paying and becomes time they are spending. Block & Zakay 1997: filled time has shorter retrospective duration than empty time.",
  timeBand: "10 S+",
  runMode: "manual",
};

/** Long enough that the user has many obstacles to jump. */
export const TOTAL_DURATION_P50_MS = 18000;
/** Time the runner takes to traverse the screen, in ms. */
export const OBSTACLE_TRAVEL_MS = 2200;
/** Min / max ms between successive obstacle spawns. */
export const SPAWN_MIN_MS = 1300;
export const SPAWN_MAX_MS = 2400;
/** Jump duration. */
export const JUMP_MS = 700;
