import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "harrison-2007",
    label: "Harrison et al. 2007",
    citation:
      "Harrison, C., Amento, B., Kuznetsov, S., & Bell, R. (2007). Rethinking the progress bar. *Proceedings of UIST '07*, 115–118. Establishes that the animation pattern measurably alters perceived progress-bar duration even with identical real duration.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. The headline result: backwards-moving, decelerating ribbed progress bars produce ~11–12 % perceived speed-up over a plain bar.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. Foundational result that any determinate progress beats no progress; the Harrison work refines the *how*.",
  },
];
