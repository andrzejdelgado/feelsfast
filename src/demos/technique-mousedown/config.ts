import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Mousedown vs click head-start",
  description:
    "Same button, same work. Naive: fires on `click` (after the user releases the mouse). Tuned: fires on `mousedown` (the moment the press begins). The user holds the button down for ~100–150 ms — that whole window is free latency budget you reclaim by starting work earlier.",
  timeBand: "0–100 MS",
};

export const SIMULATED_WORK_MS = 600;
