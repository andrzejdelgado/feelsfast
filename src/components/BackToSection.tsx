"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useNavigationHistory } from "./NavigationHistoryProvider";

const KNOWN_SECTIONS = new Set(["concepts", "scenarios", "patterns"]);

const BACK_LINK_CLASSES =
  "mb-2 flex w-fit items-center gap-1 font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary";

/**
 * "< Back" link for individual content pages (essays, scenarios,
 * patterns).
 *
 * Renders on routes like `/concepts/<slug>` or `/scenarios/<slug>` and
 * sends the user to whatever page they came from inside the site. If
 * they landed on this page directly (no in-app history yet — fresh tab,
 * shared link, search-engine click), falls back to the parent section
 * index so the user never gets stranded off-site.
 *
 * Decision is driven by `<NavigationHistoryProvider>` in `SiteShell`.
 */
export function BackToSection() {
  const pathname = usePathname();
  const router = useRouter();
  const { hasInternalHistory } = useNavigationHistory();

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) return null;

  const sectionSlug = parts[0];
  if (!KNOWN_SECTIONS.has(sectionSlug)) return null;

  if (hasInternalHistory) {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        className={BACK_LINK_CLASSES}
      >
        <ChevronLeft aria-hidden className="size-3" />
        <span>Back</span>
      </button>
    );
  }

  return (
    <Link href={`/${sectionSlug}`} className={BACK_LINK_CLASSES}>
      <ChevronLeft aria-hidden className="size-3" />
      <span>Back</span>
    </Link>
  );
}
