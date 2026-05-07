import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. ~100 ms perceptual frame; the input must respond inside that floor on every keystroke.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The keystroke-echo tier (~0.1 s) at the top of the response-time taxonomy.",
  },
  {
    id: "eizenberg",
    label: "Eizenberg",
    citation:
      "Eizenberg, E. *When Actual Performance Is More Important Than Perceived Performance* (Medium). The argument that production surfaces (search inputs) cannot be saved by perception layers — input responsiveness is real performance, not perceived.",
  },
];
