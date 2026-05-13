import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "List Skeleton",
  description:
    "A small list of items loads from a synthetic API. The naive side waits silently; the tuned side shows skeletons that match the final layout.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Match the loaded 3-row list height exactly so the panel doesn't
  // jump from idle (placeholder) to running (skeleton / items).
  panelMinHeight: "min-h-[178px]",
};

export const items = [
  { id: 1, name: "Maria Chen", role: "Designer · maria@example.com" },
  { id: 2, name: "Pat Hayes", role: "Engineer · pat@example.com" },
  { id: 3, name: "Diego Romero", role: "PM · diego@example.com" },
];

export const LATENCY = { p50: 1500 } as const;
