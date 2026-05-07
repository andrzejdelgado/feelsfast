import {
  BookOpen,
  Boxes,
  FlaskConical,
  Home,
  Layers,
  Library,
  Sparkles,
  Type,
  type LucideIcon,
} from "lucide-react";

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
  icon: LucideIcon;
  badge?: string;
};

export const sidebarSections: SidebarItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Skill", href: "/skill", icon: Sparkles, badge: "New" },
  { label: "Concepts", href: "/concepts", icon: BookOpen },
  { label: "Scenarios", href: "/scenarios", icon: Layers },
  { label: "Patterns", href: "/patterns", icon: Boxes },
  { label: "Playground", href: "/playground", icon: FlaskConical },
  { label: "Glossary", href: "/glossary", icon: Type },
  { label: "References", href: "/references", icon: Library },
];

export const timeBands = [
  { id: "instant", label: "0–100 MS", maxMs: 100 },
  { id: "responsive", label: "100 MS – 1 S", maxMs: 1000 },
  { id: "engaged", label: "1 – 10 S", maxMs: 10000 },
  { id: "long", label: "10 S+", maxMs: Infinity },
] as const;

export type TimeBand = (typeof timeBands)[number]["id"];
