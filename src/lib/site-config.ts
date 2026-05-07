export const siteConfig = {
  name: "feelsfast",
  domain: "feelsfast.fyi",
  description:
    "Educational platform on perceived performance — concepts, interactive scenarios, research-backed patterns, and an installable AI skill, for Product Designers, Design Engineers, and Frontend Engineers.",
  url: "https://feelsfast.fyi",
  ogImage: "/og.png",
  github: "https://github.com/andrzejdelgado/feelsfast",
  author: {
    name: "Andrzej Delgado",
    url: "https://github.com/andrzejdelgado",
  },
} as const;

export type SidebarItem = {
  label: string;
  href: string;
};

export const sidebarSections: SidebarItem[] = [
  { label: "Home", href: "/" },
  { label: "Skill", href: "/skill" },
  { label: "Concepts", href: "/concepts" },
  { label: "Scenarios", href: "/scenarios" },
  { label: "Patterns", href: "/patterns" },
  { label: "Playground", href: "/playground" },
  { label: "Glossary", href: "/glossary" },
  { label: "References", href: "/references" },
];

export const timeBands = [
  { id: "instant", label: "0–100 MS", maxMs: 100 },
  { id: "responsive", label: "100 MS – 1 S", maxMs: 1000 },
  { id: "engaged", label: "1 – 10 S", maxMs: 10000 },
  { id: "long", label: "10 S+", maxMs: Infinity },
] as const;

export type TimeBand = (typeof timeBands)[number]["id"];
