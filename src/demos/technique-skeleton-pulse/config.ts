import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Pulse Skeleton",
  description:
    "Lighter cousin of the shimmer skeleton. Naive: static skeleton — honest but quiet. Tuned: every block deepens to a darker grey at the pulse peak and breathes back to the resting muted tone over ~1.4 s. No gradient sweep, no horizontal motion — just a calm breath. Right when the surface is busy enough that a sweep would be visually noisy.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Inner skeleton card is ~128 px tall at mobile (body wraps to 4
  // lines). Match it so the panel doesn't grow when Run is pressed.
  panelMinHeight: "min-h-32",
};

export const TOTAL_DURATION_P50_MS = 3000;
