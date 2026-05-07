import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. ~10 Hz / 100-ms-per-frame animation refresh recommendation that underlies modern transition timings.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. ~100 ms perceptual processing frame; the lower bound for transitions to feel like motion rather than discrete jumps.",
  },
];
