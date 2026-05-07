import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "ng-2012",
    label: "Ng et al. 2012",
    citation:
      "Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *Proceedings of UIST '12*, 453–464. Establishes that experienced users can detect single-millisecond latency improvements in direct-touch contexts.",
  },
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. JNDs ~33 ms drag, ~82 ms tap.",
  },
  {
    id: "deber-2015",
    label: "Deber et al. 2015",
    citation:
      "Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? *Proceedings of CHI '15*, 1827–1836. Confirms and extends the touch-input JND finding.",
  },
];
