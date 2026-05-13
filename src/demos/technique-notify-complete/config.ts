import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Put into Background + Success Message",
  description:
    "Past the 10-second wall, foreground waiting is the wrong unit. Naive: spinner blocks the panel; the user must keep watching. Tuned: a \"Run in background\" affordance demotes the wait to a small corner indicator and surfaces a toast when the work lands. Foreground attention is freed; the result still arrives loudly.",
  timeBand: "10 S+",
  runMode: "manual",
  // Reserve the 10 rem stage so idle → loading / foreground →
  // background → done never resizes the panel.
  panelMinHeight: "min-h-[10rem]",
};

export const TOTAL_DURATION_P50_MS = 11000;
