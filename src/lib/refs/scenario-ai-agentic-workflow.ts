import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 10 S+ wall multi-step agent execution pushes past — beyond which engagement, not raw progress, is the perception lever.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    citation:
      "Nielsen, J. (1993). Response Times: The 3 Important Limits. From *Usability Engineering*, Ch. 5. Morgan Kaufmann. The 10-second wall — past it, the user's attention is no longer reliably on the task and a hand-off (notification, background work) is the right register.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % preferred a percent-done progress bar — directly applicable to per-phase determinate sub-step progress where the agent has measurable units.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. ~11–12 % perceived speed-up from animation pattern — the per-phase bar can use the same backwards-decelerating treatment.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame each phase-state transition needs to clear so the timeline reads as live work.",
  },
];
