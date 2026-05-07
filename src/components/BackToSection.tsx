"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTION_LABELS: Record<string, string> = {
  concepts: "Concepts",
  scenarios: "Scenarios",
  patterns: "Patterns",
};

/**
 * Small "← Section" link for individual content pages (essays, scenarios,
 * patterns). Renders only when the current pathname has at least two
 * segments (e.g. /concepts/perceived-performance) and the first segment
 * matches a known section. Returns null on index pages and unrelated
 * routes.
 */
export function BackToSection() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) return null;

  const sectionSlug = parts[0];
  const label = SECTION_LABELS[sectionSlug];
  if (!label) return null;

  return (
    <Link
      href={`/${sectionSlug}`}
      className="inline-flex items-center gap-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
    >
      <ChevronLeft aria-hidden className="size-3" />
      <span>{label}</span>
    </Link>
  );
}
