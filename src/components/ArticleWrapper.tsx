"use client";

import { usePathname } from "next/navigation";
import { BackToSection } from "./BackToSection";

const WIDE_SECTIONS = new Set(["scenarios", "patterns"]);

/**
 * Wrapper for MDX article pages.
 *
 * Section-aware width:
 * - /concepts/*    — max-w-3xl (essay measure, ~75 ch for prose readability)
 * - /scenarios/*   — max-w-4xl (matches /scenarios index for visual parity)
 * - /patterns/*    — max-w-4xl (matches /patterns index for visual parity)
 *
 * The back-link → H1 gap is tight (`mb-2`) so individual pages feel like
 * the index pages they came from, not like a different layout family.
 */
export function ArticleWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean)[0] ?? "";
  const isWide = WIDE_SECTIONS.has(section);
  const maxWidth = isWide ? "max-w-4xl" : "max-w-3xl";

  return (
    <article
      className={`mx-auto ${maxWidth} px-8 py-12 lg:px-12 xl:px-16`}
    >
      <BackToSection />
      {children}
    </article>
  );
}
