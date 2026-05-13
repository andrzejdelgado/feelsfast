import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "AI thinking gradient",
  description:
    'AI pre-response state. Naive: a static "Thinking…" label next to a spinning circle. Tuned: the word "Thinking…" itself is rendered as a primary-coloured gradient that animates left-to-right inside the letters. Calmer, more present, no spinner distraction. Now standard in Claude, ChatGPT, Gemini.',
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Reserve the response card height at each breakpoint. Mobile
  // wraps the response to 2 lines; md+ fits it in 1 line.
  panelMinHeight: "min-h-[79px] md:min-h-[56px]",
};

export const TOTAL_DURATION_P50_MS = 3000;
