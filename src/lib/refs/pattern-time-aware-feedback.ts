import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 17-transaction taxonomy that the time bands collapse from.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    citation:
      "Nielsen, J. (1993). Response Times: The 3 Important Limits. From *Usability Engineering*, Ch. 5. Morgan Kaufmann. The 0.1 / 1 / 10-second trichotomy that the rule sheet uses as its band boundaries.",
  },
  {
    id: "fitch",
    label: "Fitch",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Active-to-passive transition (~1 s) and the rule of thumb that loaders below 1 s are counterproductive.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. Justifies the determinate-progress slot in the rule sheet.",
  },
];
