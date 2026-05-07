import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. Indeterminate feedback (a spinner) beats no feedback; determinate beats indeterminate when duration can be estimated.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the 1–2 s window framing — below 1 s the spinner pulls users out of active mode prematurely; above 2 s a determinate or skeleton affordance carries more weight.",
  },
];
