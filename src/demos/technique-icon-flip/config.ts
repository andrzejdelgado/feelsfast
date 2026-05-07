import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Optimistic icon flip",
  description:
    "A heart, a star, a bookmark. Naive: the icon waits for the server before it fills, so the user feels the round-trip on every press. Tuned: the icon flips instantly; the server commit reconciles in the background. At ~99 % success the experience is sub-perceptible feedback; at the rare ~1 % failure, the icon visibly rolls back.",
  timeBand: "0–100 MS",
};

export const SIMULATED_COMMIT_MS = 600;
/** ~10 % of clicks fail to demonstrate the rollback path. */
export const FAILURE_RATE = 0.1;
