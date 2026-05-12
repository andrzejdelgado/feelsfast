export type EssayStatus = "published" | "drafting" | "planned";

export type EssayCategory = "foundations" | "practice";

export type EssayCategoryMeta = {
  id: EssayCategory;
  label: string;
  blurb: string;
};

export const essayCategories: readonly EssayCategoryMeta[] = [
  {
    id: "foundations",
    label: "Foundations",
    blurb:
      "What perceived performance actually is, how humans perceive time, and where the canonical thresholds come from.",
  },
  {
    id: "practice",
    label: "Practice",
    blurb:
      "Applying the science — anatomy of a wait, illusions you can exploit, where the perception layer breaks down, and budgets that include perception.",
  },
];

export type Essay = {
  slug: string;
  number: string;
  title: string;
  category: EssayCategory;
  blurb: string;
  citations: readonly string[];
  status: EssayStatus;
};

/**
 * Canonical ordered list of Concepts essays. Single source of truth used
 * by:
 *   - /concepts (the index)
 *   - <EssayNav>, the prev/next pager rendered at the bottom of each
 *     individual essay between the body and the References list.
 *
 * Order matters — it is the reading order the prev/next nav implies.
 */
export const essays: readonly Essay[] = [
  {
    slug: "perceived-performance",
    number: "01",
    title: "What perceived performance actually is",
    category: "foundations",
    blurb:
      "The dichotomy between objective and perceived performance, the 20 % just-noticeable difference, and where looking-fast stops being a substitute for being-fast.",
    citations: [
      "Miller 1968",
      "Nielsen 1993",
      "Doherty 1982",
      "Weber–Fechner",
      "Eizenberg",
    ],
    status: "published",
  },
  {
    slug: "how-humans-perceive-time",
    number: "02",
    title: "How humans perceive time",
    category: "foundations",
    blurb:
      "Active vs. passive phases, the dopamine pathway, filled vs. empty duration, prospective vs. retrospective duration judgments, and the one-second active-to-passive transition.",
    citations: [
      "James 1890",
      "Ornstein 1969",
      "Block & Zakay 1997",
      "Fitch",
      "Myers 1985",
    ],
    status: "published",
  },
  {
    slug: "canonical-thresholds",
    number: "03",
    title: "The canonical thresholds",
    category: "foundations",
    blurb:
      "Miller 1968's 17-transaction taxonomy, Card et al. 1991's perceptual / immediate-response / unit-task tiers, Doherty's 400 ms productivity cliff, and Nielsen's 1993 distillation. Why the clean 0.1 / 1 / 10 trichotomy is Nielsen's framing, not Miller's.",
    citations: [
      "Miller 1968",
      "Card, Moran & Newell 1983",
      "Card et al. 1991",
      "Doherty 1982",
      "Nielsen 1993",
    ],
    status: "published",
  },
  {
    slug: "anatomy-of-a-wait",
    number: "04",
    title: "The anatomy of a wait",
    category: "practice",
    blurb:
      "Decompose every wait into pre-action signal → response → animation → completion. What you can tune at each stage. The tip-the-hand rule.",
    citations: [
      "Fitch",
      "Card et al. 1991",
      "Card, Moran & Newell 1983",
      "Miller 1968",
    ],
    status: "published",
  },
  {
    slug: "time-perception-illusions",
    number: "05",
    title: "Time perception illusions you can exploit",
    category: "practice",
    blurb:
      "Anstis on contrast and motion. Harrison et al. on backwards-decelerating progress bars. The geometric-mean indifference threshold. When illusions are honest and when they cross into deception.",
    citations: [
      "Anstis 2001",
      "Anstis 2003",
      "Anstis 2004",
      "Harrison et al. 2007",
      "Harrison et al. 2010",
      "Church et al.",
      "Mishunov 2015",
    ],
    status: "published",
  },
  {
    slug: "when-perceived-performance-hurts-you",
    number: "06",
    title: "When perceived performance hurts you",
    category: "practice",
    blurb:
      "Eizenberg's argument, latency JNDs in direct manipulation, and where polished placeholders become polished lies.",
    citations: [
      "Eizenberg",
      "Ng et al. 2012",
      "Jota et al. 2013",
      "Deber et al. 2015",
    ],
    status: "published",
  },
  {
    slug: "performance-budgets-with-perception",
    number: "07",
    title: "Performance budgets that include perception",
    category: "practice",
    blurb:
      "INP and Web Vitals as a starting point. How to add perception to a quantitative budget. The role of adaptive loading and the performance scaler.",
    citations: ["Doherty 1982", "Card, Moran & Newell 1983", "Fitch"],
    status: "published",
  },
];

export const STATUS_LABEL: Record<EssayStatus, string> = {
  published: "Read",
  drafting: "Drafting",
  planned: "Planned",
};

export function essaysByCategory(categoryId: EssayCategory): Essay[] {
  return essays.filter((e) => e.category === categoryId);
}
