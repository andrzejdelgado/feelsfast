import type { Metadata } from "next";
import { GlossaryContent } from "@/components/GlossaryContent";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Short definitions of the terms used across feelsfast — active vs. passive phase, JND, INP, LCP, TTI, optimistic UI, skeleton screen, predictive preloading, spinners, engaging loading, time band, and more. Cross-linked to the Concepts essays where each term is developed.",
};

export default function GlossaryPage() {
  return <GlossaryContent />;
}
