import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Active-state press feedback",
  description:
    "Visual acknowledgement of the press itself, before any work happens. Naive: button stays static until the action completes. Tuned: button scales down ~3 % and shifts colour the moment the user presses, all under 50 ms — the input feels heard within the perceptual frame even if the result takes longer.",
  timeBand: "0–100 MS",
};
