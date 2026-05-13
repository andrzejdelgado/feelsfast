import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Drag to Reorder",
  description:
    "Drag the handles to reorder the list. Naive: nothing visibly moves until you drop, then a server round-trip stalls the reorder. Tuned: live drop-position indicator while dragging, optimistic placement on drop, server commit in the background.",
  timeBand: "0–100 MS",
};

export const SERVER_DELAY_P50_MS = 350;

export type Item = {
  id: string;
  title: string;
};

export const ITEMS: Item[] = [
  { id: "a", title: "Wire up the new auth flow" },
  { id: "b", title: "Migrate the staging database" },
  { id: "c", title: "Audit the dependency tree" },
  { id: "d", title: "Refactor the analytics module" },
  { id: "e", title: "Backfill the missing tests" },
];
