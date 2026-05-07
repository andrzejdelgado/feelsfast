import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 1 – 10 S band where multi-step agent execution typically lands.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame each tool-call status update must clear so the streaming feels live.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Productivity drops sharply past ~400 ms — relevant for the time-to-first-tool-call budget on agent execution.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % of participants preferred a percent-done indicator over a blank wait — extends to the streaming tool-call list as a non-numeric progress signal.",
  },
];
