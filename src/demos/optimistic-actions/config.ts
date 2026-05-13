import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Optimistic State Update",
  description:
    "Click the heart. Naive: button waits for the server, the count updates only after the round-trip. Tuned: optimistic flip, background commit, visible rollback on the rare failure (~10 %).",
  timeBand: "0–100 MS",
};

export const FAILURE_RATE = 0.1;
export const COMMIT_LATENCY_P50_MS = 600;
