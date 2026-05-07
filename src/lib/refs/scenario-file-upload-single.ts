import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % preferred a determinate progress bar over a blank wait — file upload is the canonical use case.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. ~11–12 % perceived speed-up from backwards-decelerating ribs on the progress bar.",
  },
  {
    id: "miller-1968",
    label: "Miller 1968",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 1 – 10 S band most single-file uploads sit inside.",
  },
];
