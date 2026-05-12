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
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Active-to-passive transition (~1 s); the 500-ms-delayed-spinner pattern; the Slack and FIFA case studies for engaging loading.",
  },
  {
    id: "myers-1985",
    label: "Myers 1985",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % of participants preferred a determinate progress bar over a blank wait — the preference held even when the bar was inaccurate.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. ~11–12 % perceived speed-up from backwards-moving, decelerating ribbed progress bars.",
  },
  {
    id: "james-1890",
    label: "James 1890",
    citation:
      "James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15. Holt. Empty intervals feel long while passing and short in memory; filled intervals do the reverse — the mechanism behind the skeleton-screen rationale.",
  },
  {
    id: "ornstein-1969",
    label: "Ornstein 1969",
    citation:
      "Ornstein, R. E. (1969). *On the Experience of Time*. Penguin Books. Storage-size account of remembered duration — engagement compresses time prospectively but can expand it retrospectively.",
  },
  {
    id: "block-zakay-1997",
    label: "Block & Zakay 1997",
    citation:
      "Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197. Confirms the prospective/retrospective asymmetry at meta-analysis scale.",
  },
] as const;
