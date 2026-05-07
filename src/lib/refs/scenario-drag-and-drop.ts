import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. Direct-touch dragging JND ~33 ms — the perceptual budget for the cursor-to-content tracking on a real drag.",
  },
  {
    id: "ng-2012",
    label: "Ng et al. 2012",
    citation:
      "Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *Proceedings of UIST '12*, 453–464. Experienced users detect single-millisecond latency improvements in direct-touch contexts.",
  },
  {
    id: "deber-2015",
    label: "Deber et al. 2015",
    citation:
      "Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? *Proceedings of CHI '15*, 1827–1836. Quantifies the gap between direct- and indirect-touch latency JNDs; reorder UIs sit on the indirect side.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. The ~100 ms perceptual frame the press-feedback animation must clear so the grab feels coupled to the pointer.",
  },
];
