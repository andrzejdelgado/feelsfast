import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "james-1890",
    label: "James 1890",
    citation:
      "James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15. Holt. The classical statement of the prospective–retrospective asymmetry — empty time feels long while passing and short in memory; filled time the reverse.",
  },
  {
    id: "ornstein-1969",
    label: "Ornstein 1969",
    citation:
      "Ornstein, R. E. (1969). *On the Experience of Time*. Penguin Books. Storage-size account of remembered duration; the foundation under most modern filled-vs-empty UX framings.",
  },
  {
    id: "block-zakay-1997",
    label: "Block & Zakay 1997",
    citation:
      "Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the ~one-second active-to-passive transition and the 36 % overestimation of passive duration.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % of participants preferred a determinate progress bar over a blank wait.",
  },
] as const;
