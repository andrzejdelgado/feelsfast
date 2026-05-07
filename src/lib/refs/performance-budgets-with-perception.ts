import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. The 400 ms productivity cliff that the modern INP target of 200 ms maps onto with comfortable margin.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual processing frame that defines the Tier 1 (~50 ms) feedback target.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the active-to-passive transition (the Tier 2 budget) and the performance-scaler concept (adaptive loading calibrated to each user's actual connection).",
  },
] as const;
