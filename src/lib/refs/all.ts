import type { Reference } from "@/components/ReferencesProvider";

/**
 * Master bibliography for feelsfast.fyi.
 *
 * Single source of truth for every citation that appears anywhere on the
 * platform. Per-essay reference files in this directory currently inline
 * their own copies for autonomy — but if the lists ever drift, this is
 * the canonical version.
 */

type ReferenceWithKind = Reference & {
  /** "academic" = peer-reviewed; "industry" = published case study, talk, blog. */
  kind: "academic" | "industry";
};

export const FOUNDATIONAL_HCI: readonly ReferenceWithKind[] = [
  {
    id: "miller-1968",
    label: "Miller 1968",
    kind: "academic",
    citation:
      "Miller, R. B. (1968). Response time in man-computer conversational transactions. *Proceedings of the AFIPS Fall Joint Computer Conference*, 33(I), 267–277. The 17-transaction taxonomy that the popularised 0.1 / 1 / 10-second trichotomy is later distilled from.",
  },
  {
    id: "card-moran-newell-1983",
    label: "Card, Moran & Newell 1983",
    kind: "academic",
    citation:
      "Card, S. K., Moran, T. P., & Newell, A. (1983). *The Psychology of Human-Computer Interaction*. Lawrence Erlbaum. Source of the human-processor time constants — perceptual processing ~100 ms, immediate response ~1 s, unit task ~10 s.",
  },
  {
    id: "card-1991",
    label: "Card et al. 1991",
    kind: "academic",
    citation:
      "Card, S. K., Robertson, G. G., & Mackinlay, J. D. (1991). The information visualizer, an information workspace. *Proceedings of CHI '91*, 181–188. ~10 Hz / 100-ms-per-frame animation refresh recommendation underlying modern transition-timing defaults.",
  },
  {
    id: "doherty-1982",
    label: "Doherty 1982",
    kind: "academic",
    citation:
      "Doherty, W. J., & Thadani, A. J. (1982). The Economic Value of Rapid Response Time. IBM Technical Report GE20-0752-0. Empirical productivity-vs-response-time curve breaking sharply at ~400 ms — the basis of the 'Doherty threshold' framing.",
  },
  {
    id: "nielsen-1993",
    label: "Nielsen 1993",
    kind: "academic",
    citation:
      "Nielsen, J. (1993). Response Times: The 3 Important Limits. From *Usability Engineering*, Ch. 5. Morgan Kaufmann. The synthesis that distilled Miller, Card-Moran-Newell, and the field's empirical work into the clean 0.1 / 1 / 10-second trichotomy.",
  },
];

export const PROGRESS_INDICATORS: readonly ReferenceWithKind[] = [
  {
    id: "myers-1985",
    label: "Myers 1985",
    kind: "academic",
    citation:
      "Myers, B. A. (1985). The importance of percent-done progress indicators for computer-human interfaces. *Proceedings of CHI '85*, 11–17. ~86 % of participants preferred a determinate progress bar over a blank wait.",
  },
  {
    id: "harrison-2007",
    label: "Harrison et al. 2007",
    kind: "academic",
    citation:
      "Harrison, C., Amento, B., Kuznetsov, S., & Bell, R. (2007). Rethinking the progress bar. *Proceedings of UIST '07*, 115–118. Establishes that animation pattern measurably alters perceived progress-bar duration even with identical real duration.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    kind: "academic",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. ~11–12 % perceived speed-up from backwards-moving, decelerating ribbed progress bars.",
  },
];

export const LATENCY_JNDS: readonly ReferenceWithKind[] = [
  {
    id: "arapakis-2014",
    label: "Arapakis et al. 2014",
    kind: "academic",
    citation:
      "Arapakis, I., Bai, X., & Cambazoglu, B. B. (2014). Impact of response latency on user behavior in web search. *Proceedings of SIGIR '14*, 103–112. Below ~500 ms added latency, users rarely consciously notice; above ~1,000 ms detection is high.",
  },
  {
    id: "ng-2012",
    label: "Ng et al. 2012",
    kind: "academic",
    citation:
      "Ng, A., Lepinski, J., Wigdor, D., Sanders, S., & Dietz, P. H. (2012). Designing for low-latency direct-touch input. *Proceedings of UIST '12*, 453–464. Experienced users can detect latency improvements down to single-millisecond ranges in some direct-touch contexts.",
  },
  {
    id: "jota-2013",
    label: "Jota et al. 2013",
    kind: "academic",
    citation:
      "Jota, R., Ng, A., Dietz, P., & Wigdor, D. (2013). How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks. *Proceedings of CHI '13*, 2291–2300. Direct-touch dragging JND ~33 ms; tapping ~82 ms.",
  },
  {
    id: "deber-2015",
    label: "Deber et al. 2015",
    kind: "academic",
    citation:
      "Deber, J., Jota, R., Forlines, C., & Wigdor, D. (2015). How much faster is fast enough? *Proceedings of CHI '15*, 1827–1836. Confirms and extends Jota et al.; quantifies the gap between direct- and indirect-touch latency JNDs.",
  },
];

export const TIME_AND_MOTION_PERCEPTION: readonly ReferenceWithKind[] = [
  {
    id: "james-1890",
    label: "James 1890",
    kind: "academic",
    citation:
      "James, W. (1890). The Perception of Time. *The Principles of Psychology*, Ch. 15. Holt. Classical statement of the prospective–retrospective asymmetry — empty time feels long while passing and short in memory; filled time the reverse.",
  },
  {
    id: "ornstein-1969",
    label: "Ornstein 1969",
    kind: "academic",
    citation:
      "Ornstein, R. E. (1969). *On the Experience of Time*. Penguin Books. Storage-size account of remembered duration.",
  },
  {
    id: "block-zakay-1997",
    label: "Block & Zakay 1997",
    kind: "academic",
    citation:
      "Block, R. A., & Zakay, D. (1997). Prospective and retrospective duration judgments: A meta-analytic review. *Psychonomic Bulletin & Review*, 4(2), 184–197.",
  },
  {
    id: "anstis-2001",
    label: "Anstis 2001",
    kind: "academic",
    citation:
      "Anstis, S. M. (2001). Footsteps and inchworms: Illusions show that contrast modulates motion salience. *Perception*, 30(7), 785–794.",
  },
  {
    id: "anstis-2003",
    label: "Anstis 2003",
    kind: "academic",
    citation:
      "Anstis, S. M. (2003). Moving objects appear to slow down at low contrasts. *Neural Networks*, 16(5), 933–938.",
  },
  {
    id: "anstis-2004",
    label: "Anstis 2004",
    kind: "academic",
    citation:
      "Anstis, S. M. (2004). Factors affecting footsteps: contrast can change the apparent speed, amplitude and direction of motion. *Vision Research*, 44(18), 2171–2178.",
  },
  {
    id: "weber-fechner",
    label: "Weber–Fechner",
    kind: "academic",
    citation:
      "Weber, E. H. & Fechner, G. T. (c. 1834+). The Weber–Fechner Law of perceived stimulus intensity. Foundational psychophysics; UX-readable application: Mishunov 2015.",
  },
  {
    id: "church-macinnis-guilhardi",
    label: "Church et al.",
    kind: "academic",
    citation:
      "Church, R. M., MacInnis, M., & Guilhardi, P. Work on animal interval timing at Brown University. The geometric-mean indifference property between two intervals; cited via Mishunov 2015 for its UX framing.",
  },
];

export const INDUSTRY_PRIMARY: readonly ReferenceWithKind[] = [
  {
    id: "fitch",
    label: "Fitch",
    kind: "industry",
    citation:
      "Fitch, E. *Perceived Performance: The Only Kind That Really Matters* (conference talk). Source for the active-to-passive transition, the mousedown / pointerdown head-start study, the 200 ms active-state sweet spot, predictive preloading via mouse deceleration, and the performance-scaler concept.",
  },
  {
    id: "eizenberg",
    label: "Eizenberg",
    kind: "industry",
    citation:
      "Eizenberg, E. *When Actual Performance Is More Important Than Perceived Performance* (Medium). The argument that placeholders are not a substitute for interactivity on production surfaces.",
  },
  {
    id: "mishunov-2015",
    label: "Mishunov 2015",
    kind: "industry",
    citation:
      "Mishunov, D. (2015). *Why Performance Matters, Part 1: The Perception Of Time*. Smashing Magazine. Surfaces the Weber–Fechner law and the geometric-mean indifference threshold for the UX community.",
  },
];

export const ALL_CATEGORIES = [
  {
    id: "foundational-hci",
    title: "Foundational HCI response-time research",
    description:
      "The four-paper chain behind every modern response-time graph and Web Vitals threshold. See Concepts §3 for the full lineage.",
    refs: FOUNDATIONAL_HCI,
  },
  {
    id: "progress-indicators",
    title: "Progress indicators",
    description:
      "Empirical evidence on whether and how progress feedback works. See Concepts §5 for the backwards-decelerating finding.",
    refs: PROGRESS_INDICATORS,
  },
  {
    id: "latency-jnds",
    title: "Latency JNDs",
    description:
      "Just-noticeable differences for added latency, with the gap between web-content responses and direct-manipulation interactions. See Concepts §6.",
    refs: LATENCY_JNDS,
  },
  {
    id: "time-and-motion-perception",
    title: "Time and motion perception",
    description:
      "Prospective vs. retrospective duration, contrast and motion, the geometric-mean indifference threshold. See Concepts §2 and §5.",
    refs: TIME_AND_MOTION_PERCEPTION,
  },
  {
    id: "industry-primary",
    title: "Industry primary sources",
    description:
      "Conference talks, blog posts, and case studies that document patterns the academic literature has not yet caught up to. Labelled with the industry tag.",
    refs: INDUSTRY_PRIMARY,
  },
] as const;
