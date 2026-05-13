import type { Metadata } from "next";
import { GlossaryContent } from "@/components/GlossaryContent";

export const metadata: Metadata = {
  title: "Glossary — Loading State & UX Performance Terms",
  description:
    "Definitions for skeleton screen, optimistic UI, JND, INP, LCP, TTI, time band, engaging loading, predictive preloading — every loading-state term used on feelsfast.",
  alternates: { canonical: "/glossary" },
  keywords: [
    "skeleton screen definition",
    "optimistic ui",
    "what is perceived performance",
    "loading state glossary",
    "core web vitals",
    "interaction to next paint",
    "largest contentful paint",
  ],
  openGraph: {
    title: "Glossary — Loading State & UX Performance Terms",
    description:
      "Definitions for skeleton screen, optimistic UI, JND, INP, LCP, TTI, time band, engaging loading — every loading-state term used on feelsfast.",
    type: "website",
    url: "/glossary",
    images: ["/opengraph-image"],
  },
};

export default function GlossaryPage() {
  return <GlossaryContent />;
}
