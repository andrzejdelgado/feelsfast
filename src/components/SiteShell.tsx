"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { ReferencesPanel } from "./ReferencesPanel";
import { MobileNav } from "./MobileNav";
import { ReferencesProvider } from "./ReferencesProvider";

/**
 * SiteShell — the 3-column desktop layout per PRD §7.3, but only on
 * individual essay pages where the right-rail references panel earns
 * its keep. On every other route (catalog indexes, scenario / pattern
 * pages, glossary, references list, home, skill, playground) the right
 * column is dropped and the main column reclaims the space.
 *
 * Essay routes: `/concepts/<slug>` (NOT `/concepts` itself, which is
 * the index).
 *
 * Desktop layout, two cases:
 *   - essay:  [Sidebar 280px] [Main flexible] [References 280px]
 *   - other:  [Sidebar 280px] [Main flexible]
 *
 * Tablet (≥768 px) and mobile (<768 px) are unaffected.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showReferences =
    pathname.startsWith("/concepts/") && pathname !== "/concepts";

  return (
    <ReferencesProvider>
      <div
        className={
          showReferences
            ? "grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_280px]"
            : "grid min-h-screen w-full grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)]"
        }
      >
        <aside
          className="hidden border-r border-border bg-sidebar md:block"
          aria-label="Site navigation"
        >
          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        <div className="min-w-0">
          <MobileNav />
          {children}
        </div>

        {showReferences ? (
          <aside
            className="hidden border-l border-border bg-sidebar lg:block"
            aria-label="References for the current article"
          >
            <div className="sticky top-0">
              <ReferencesPanel />
            </div>
          </aside>
        ) : null}
      </div>
    </ReferencesProvider>
  );
}
