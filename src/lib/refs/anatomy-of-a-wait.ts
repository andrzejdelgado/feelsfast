import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the mousedown / pointerdown head start (~100–150 ms median hold time, n ≈ 100 via Mechanical Turk), the 200 ms active-state sweet spot, and the predictive-preloading patterns referenced in this essay.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. ~10 Hz / 100-ms-per-frame animation refresh recommendation underlying the modern transition-timing defaults referenced in the Animation phase.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. ~100 ms perceptual processing frame; the upper bound for the Response phase to feel caused by the user.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 17-transaction taxonomy whose finer-grained tiers underlie the 'tip-the-hand' rule about sub-1-second loaders.",
  },
] as const;
