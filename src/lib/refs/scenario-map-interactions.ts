import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame the pan must clear so cursor and content stay coupled.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. ~10 Hz / 100-ms-per-frame animation refresh recommendation underlying the perceived continuity of progressive tile loads.",
  },
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. Direct-touch pan / drag JND ~33 ms — the perceptual budget for the pan-to-tile coupling.",
  },
  {
    id: "ng-2012",
    label: "Ng et al. 2012",
    citation:
      "Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *Proceedings of UIST '12*, 453–464. Single-millisecond detection in trained users — the upper bound of the budget.",
  },
];
