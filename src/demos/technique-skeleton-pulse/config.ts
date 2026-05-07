import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Pulse skeleton",
  description:
    "Lighter cousin of the shimmer skeleton. Naive: static skeleton — honest but quiet. Tuned: every block deepens to a darker grey at the pulse peak and breathes back to the resting muted tone over ~1.4 s. No gradient sweep, no horizontal motion — just a calm breath. Right when the surface is busy enough that a sweep would be visually noisy.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 3000;
