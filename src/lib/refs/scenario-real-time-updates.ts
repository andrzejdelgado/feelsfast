import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame the highlight animation must start within so the new event registers as motion rather than a stealth re-render.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. ~10 Hz / 100-ms-per-frame animation refresh rate underlying perceived continuity for the slide-in motion.",
  },
  {
    id: "harrison-2007",
    label: "Harrison et al. 2007",
    citation:
      "Harrison, C., Amento, B., Kuznetsov, S., & Bell, R. (2007). Rethinking the progress bar. *Proceedings of UIST '07*, 115–118. The principle that animation pattern alters perception applies to incoming-event affordances as much as to progress bars.",
  },
];
