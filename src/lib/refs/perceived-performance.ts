import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    citation:
      "Nielsen, J. (1993). Response Times: The 3 Important Limits. Excerpt from *Usability Engineering*, Ch. 5. Morgan Kaufmann.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0.",
  },
  {
    id: "weber-fechner",
    label: "Weber–Fechner",
    citation:
      "Weber, E. H. & Fechner, G. T. (c. 1834+). The Weber–Fechner Law of perceived stimulus intensity. UX-readable application: Mishunov, *Why Performance Matters: The Perception of Time* (Smashing Magazine, 2015).",
  },
  {
    id: "eizenberg",
    label: "Eizenberg",
    citation:
      "Eizenberg, E. *When Actual Performance Is More Important Than Perceived Performance* (Medium).",
  },
] as const;
