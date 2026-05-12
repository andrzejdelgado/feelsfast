import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "block-zakay-1997",
    label: "Block & Zakay 1997",
    citation:
      "Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197. The filled-vs-empty-time finding that justifies token streaming on AI surfaces — content arriving mid-wait shortens retrospective duration even when wall-clock latency is unchanged.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 17-transaction taxonomy. Useful in this essay as a counter-example — AI conversations are not unit tasks, and Miller's tier-based budgeting does not survive the move.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    citation:
      "Nielsen, J. (1993). *Usability Engineering*. Academic Press. The 0.1 / 1 / 10 s thresholds. Still load-bearing for AI — the perceptual frame applies to first-token latency, the 1 s wall applies to the thinking state, the 10 s wall closes during agentic tool-call sequences unless the work is surfaced.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. Perceptual / immediate-response / unit-task tiers. The tiered framing assumes discrete user tasks; this essay argues the assumption breaks on AI's continuous conversational surfaces.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. ~100 ms perceptual processing frame — applied here to the send-button acknowledgement on AI input surfaces, where a slow ack produces double-tap submission and parallel inference jobs.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadhani, A. J. (1982). *The Economic Value of Rapid Response Time*. IBM. The 400 ms productivity cliff. Relevant to autocomplete-band AI surfaces (inline code completion sits inside this budget); a category error when invoked for chat-band surfaces, which are not productivity transactions in Doherty's sense.",
  },
  {
    id: "ziegler-2022",
    label: "Ziegler et al. 2022",
    citation:
      "Ziegler, A., Kalliamvakou, E., Li, X. A., Rice, A., Rifkin, D., Simister, S., Sittampalam, G., & Aftandilian, E. (2022). Productivity assessment of neural code completion. *Proceedings of MAPS 2022* (PLDI workshop). GitHub Research study of Copilot acceptance and timing — useful as an industry anchor for the inline-completion latency band where Doherty's cliff still bites.",
  },
] as const;
