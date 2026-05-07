import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "james-1890",
    label: "James 1890",
    citation:
      "James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15. Holt. The filled-duration principle behind column-aligned skeleton rows.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. Indeterminate-feedback principle that justifies the skeleton over a blank table.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Stale-while-revalidate on repeated queries clears the productivity-cliff bar.",
  },
];
