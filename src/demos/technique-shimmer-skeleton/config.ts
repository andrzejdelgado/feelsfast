import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Shimmer skeleton",
  description:
    "Same content, same wait. Naive: plain static gray skeleton. Tuned: a low-contrast gradient sweeps across all skeleton blocks in sync. Per Anstis, low-contrast motion *feels* slower — which is exactly what you want from a calm, non-attention-grabbing wait.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Inner skeleton card is ~115 px tall at mobile (text wraps to 3
  // lines). Match it so the panel doesn't grow when Run is pressed.
  panelMinHeight: "min-h-[115px]",
};

export const TOTAL_DURATION_P50_MS = 3500;
