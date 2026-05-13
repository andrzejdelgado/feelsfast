import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Multistep Status List",
  description:
    "A multi-step agent — plan, research, write — runs for ~12 s. Naive: \"Running agent…\" for the duration. Tuned: timeline of phases with current step highlighted, sub-step progress within the research phase, and a final success line.",
  timeBand: "10 S+",
  runMode: "manual",
  // Reserve the Tuned panel's loaded height (3 phase rows + report
  // line) at every breakpoint so both Off and On stay the same size
  // from idle through running to done, snug to the content.
  panelMinHeight: "min-h-[158px]",
};

export type Phase = {
  id: string;
  label: string;
  durationMs: number;
  /** If set, the phase shows determinate sub-step progress (X / total). */
  units?: { total: number; label: string };
};

export const PHASES: readonly Phase[] = [
  {
    id: "plan",
    label: "Plan",
    durationMs: 1500,
  },
  {
    id: "research",
    label: "Research",
    durationMs: 7500,
    units: { total: 12, label: "sources" },
  },
  {
    id: "write",
    label: "Write",
    durationMs: 3000,
  },
];
