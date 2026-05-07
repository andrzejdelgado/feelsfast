import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Agentic workflow",
  description:
    "A multi-step agent — plan, research, synthesise, verify, write — runs for ~20 s. Naive: \"Running agent…\" for the duration. Tuned: timeline of phases with current step highlighted, sub-step progress within each phase, and cancellation always available.",
  timeBand: "10 S+",
  runMode: "manual",
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
    label: "Research sources",
    durationMs: 7500,
    units: { total: 12, label: "sources" },
  },
  {
    id: "synthesize",
    label: "Synthesise findings",
    durationMs: 4500,
  },
  {
    id: "verify",
    label: "Verify citations",
    durationMs: 3500,
    units: { total: 8, label: "citations" },
  },
  {
    id: "write",
    label: "Write report",
    durationMs: 3000,
  },
];
