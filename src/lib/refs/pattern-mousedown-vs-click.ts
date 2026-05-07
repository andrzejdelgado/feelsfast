import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the ~100–150 ms median button-down hold time, the 200 ms active-state animation sweet spot, and the predictive-preloading patterns built on top of mousedown.",
  },
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. Touch JNDs (~33 ms drag, ~82 ms tap) that frame how careful touch handling has to be.",
  },
  {
    id: "deber-2015",
    label: "Deber et al. 2015",
    citation:
      "Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? *Proceedings of CHI '15*, 1827–1836. Confirms and extends the Jota et al. result for direct-touch latency budgets.",
  },
];
