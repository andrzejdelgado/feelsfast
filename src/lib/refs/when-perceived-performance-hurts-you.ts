import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "eizenberg",
    label: "Eizenberg",
    citation:
      "Eizenberg, E. *When Actual Performance Is More Important Than Perceived Performance* (Medium). Argues that placeholders are not a substitute for interactivity on production surfaces; introduces TTI as the right metric for surfaces where the user is reaching to act.",
  },
  {
    id: "ng-2012",
    label: "Ng et al. 2012",
    citation:
      "Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *Proceedings of UIST '12*, 453–464. Earlier evidence that experienced users can detect latency improvements down to single-millisecond ranges in direct-touch contexts.",
  },
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. Direct-touch dragging JND ~33 ms; tapping ~82 ms — well below the canonical 100 ms perceptual frame for indirect interactions.",
  },
  {
    id: "deber-2015",
    label: "Deber et al. 2015",
    citation:
      "Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? User perception of latency & latency improvements in direct and indirect touch. *Proceedings of CHI '15*, 1827–1836. Confirms and extends the Jota et al. result; quantifies the gap between direct- and indirect-touch latency JNDs.",
  },
] as const;
