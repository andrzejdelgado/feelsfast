import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Cursor affordance",
  description:
    "The cheapest cue on the platform — and the one most teams forget. Naive: every interactive element keeps the default arrow cursor. Tuned: clickable rows show a pointer, draggable handles show grab/grabbing, disabled rows show not-allowed. Affordance arrives in the same frame as the hover; zero JavaScript, zero round-trip.",
  timeBand: "0–100 MS",
};
