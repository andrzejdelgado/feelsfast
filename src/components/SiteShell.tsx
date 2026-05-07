import { Sidebar } from "./Sidebar";
import { ReferencesPanel } from "./ReferencesPanel";

/**
 * SiteShell — the 3-column desktop layout per PRD §7.3.
 * Desktop (≥1024 px): [Sidebar 280px] [Main flexible] [References 280px].
 * Tablet  (≥768 px):  [Sidebar 280px] [Main flexible] (references collapse to inline footnotes).
 * Mobile  (<768 px):  single column, sidebar collapses to a top sheet (Phase 1).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_280px]">
      <aside
        className="hidden border-r border-border bg-sidebar md:block"
        aria-label="Site navigation"
      >
        <div className="sticky top-0 max-h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <div className="min-w-0">{children}</div>

      <aside
        className="hidden border-l border-border bg-sidebar lg:block"
        aria-label="References for the current article"
      >
        <div className="sticky top-0 max-h-screen overflow-y-auto">
          <ReferencesPanel />
        </div>
      </aside>
    </div>
  );
}
