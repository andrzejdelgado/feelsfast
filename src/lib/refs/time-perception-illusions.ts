import type { Reference } from "@/components/ReferencesProvider";

export const references: readonly Reference[] = [
  {
    id: "anstis-2001",
    label: "Anstis 2001",
    citation:
      "Anstis, S. M. (2001). Footsteps and inchworms: Illusions show that contrast modulates motion salience. *Perception*, 30(7), 785–794. The first formal description of the footsteps illusion that grounds the contrast / perceived-speed relationship.",
  },
  {
    id: "anstis-2003",
    label: "Anstis 2003",
    citation:
      "Anstis, S. M. (2003). Moving objects appear to slow down at low contrasts. *Neural Networks*, 16(5), 933–938. Quantifies the contrast-and-speed effect that argues for higher-contrast skeletons and shimmers.",
  },
  {
    id: "anstis-2004",
    label: "Anstis 2004",
    citation:
      "Anstis, S. M. (2004). Factors affecting footsteps: contrast can change the apparent speed, amplitude and direction of motion. *Vision Research*, 44(18), 2171–2178. Generalises the effect: leading- and trailing-edge contrast drives apparent speed even on uniform backgrounds.",
  },
  {
    id: "harrison-2007",
    label: "Harrison et al. 2007",
    citation:
      "Harrison, C., Amento, B., Kuznetsov, S., & Bell, R. (2007). Rethinking the progress bar. *Proceedings of UIST '07*, 115–118. Establishes that animation pattern measurably alters perceived progress-bar duration even with identical real duration.",
  },
  {
    id: "harrison-2010",
    label: "Harrison et al. 2010",
    citation:
      "Harrison, C., Yeo, Z., & Hudson, S. E. (2010). Faster progress bars: Manipulating perceived duration with visual augmentations. *Proceedings of CHI '10*, 1545–1548. The headline result: backwards-moving, decelerating ribbed progress bars produce ~11–12 % perceived speed-up over a plain bar of identical duration.",
  },
  {
    id: "church-macinnis-guilhardi",
    label: "Church et al.",
    citation:
      "Church, R. M., MacInnis, M., & Guilhardi, P. Work on animal interval timing at Brown University. The geometric-mean indifference property between two intervals; cited via Mishunov 2015 for its UX framing.",
  },
  {
    id: "mishunov-2015",
    label: "Mishunov 2015",
    citation:
      "Mishunov, D. (2015). *Why Performance Matters, Part 1: The Perception Of Time*. Smashing Magazine. Surfaces the Weber–Fechner law and the geometric-mean indifference threshold for the UX community.",
  },
] as const;
