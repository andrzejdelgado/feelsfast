import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "james-1890",
    label: "James 1890",
    citation:
      "James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15. Holt. The filled-duration principle behind skeleton rows for the next page.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the predictive-preloading-on-scroll technique that pre-fetches the next page before the user reaches the boundary.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 100 MS – 1 S band the next-page load should sit inside.",
  },
];
