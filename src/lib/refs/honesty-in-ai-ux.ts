import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "eizenberg",
    label: "Eizenberg",
    citation:
      "Eizenberg, E. *When Actual Performance Is More Important Than Perceived Performance* (Medium). The headline argument that polished placeholders are not a substitute for interactivity. Applied here to AI surfaces: a polished cue is not a substitute for accurate underlying state, and the gap between the two is the deception surface this essay names.",
  },
  {
    id: "block-zakay-1997",
    label: "Block & Zakay 1997",
    citation:
      "Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197. The filled-vs-empty-time argument used in the previous essay to justify streaming. Used here to argue the inverse: filling the wait with fake or retimed content cheats the same perception mechanism rather than honouring it.",
  },
  {
    id: "anstis-2003",
    label: "Anstis 2003",
    citation:
      "Anstis, S. (2003). Moving objects appear to slow down at low contrasts. *Neural Networks*, 16(5–6), 933–938. Low-contrast motion feels slower than high-contrast motion. Borrowed in this essay as the rendering convention for low-confidence AI output — low contrast as a visual claim of uncertainty the user can read without parsing hedging language.",
  },
  {
    id: "guo-2017",
    label: "Guo et al. 2017",
    citation:
      "Guo, C., Pleiss, G., Sun, Y., & Weinberger, K. Q. (2017). On calibration of modern neural networks. *Proceedings of ICML 2017*. Showed that modern neural networks tend to be over-confident in their probability estimates and proposed temperature scaling as a calibration fix. Used here as the academic anchor for the claim that AI confidence is a renderable signal and that the UX layer typically discards it.",
  },
] as const;
