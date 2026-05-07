import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 17-transaction taxonomy that the popularised 0.1 / 1 / 10-second trichotomy is later distilled from.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. Source of the human-processor time constants — perceptual processing ~100 ms, immediate response ~1 s, unit task ~10 s.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. Source of the ~10 Hz / 100-ms-per-frame animation refresh recommendation that underlies most modern transition timing defaults.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Empirical productivity-vs-response-time curve breaking sharply at ~400 ms — the basis of the 'Doherty threshold' framing.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    citation:
      "Nielsen, J. (1993). Response Times: The 3 Important Limits. From *Usability Engineering*, Ch. 5. Morgan Kaufmann. The synthesis that distilled Miller, Card-Moran-Newell, and the field's empirical work into the clean 0.1 / 1 / 10-second trichotomy.",
  },
] as const;
