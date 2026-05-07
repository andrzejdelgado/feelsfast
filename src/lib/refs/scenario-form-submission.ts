import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Sub-second response on submit clears the productivity-cliff bar even when the underlying server work is slower.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. Determinate progress beats blank wait — applies once submission lasts longer than ~1 s.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). The 200 ms active-state animation sweet spot on the submit button.",
  },
];
