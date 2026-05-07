"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Reference = {
  /** Stable id used in `<Cite id={id}>` and `id="ref-{id}"` anchors. */
  id: string;
  /** Inline label rendered by `<Cite>` (e.g. "Miller 1968"). */
  label: string;
  /** Full formatted citation text shown in the panel. */
  citation: string;
};

type ReferencesContextValue = {
  refs: Reference[];
  activeIds: Set<string>;
  registerRefs: (refs: Reference[]) => void;
};

const ReferencesContext = createContext<ReferencesContextValue | null>(null);

/**
 * Provides the right-rail ReferencesPanel with the current article's citation
 * list and tracks which `<Cite>` is in the user's reading zone via an
 * IntersectionObserver. Wraps the entire SiteShell so navigation between
 * articles updates both halves of the layout.
 */
export function ReferencesProvider({ children }: { children: React.ReactNode }) {
  const [refs, setRefs] = useState<Reference[]>([]);
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const activeIdsRef = useRef<Set<string>>(activeIds);

  const registerRefs = useCallback((newRefs: Reference[]) => {
    setRefs(newRefs);
    setActiveIds(new Set());
    activeIdsRef.current = new Set();
  }, []);

  // Observe all `<Cite>` elements in the current page. Re-runs whenever the
  // article registers a new reference list (i.e. on navigation between
  // articles, since the unmount of the old article calls registerRefs([]).)
  useEffect(() => {
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        const next = new Set(activeIdsRef.current);
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-cite");
          if (!id) continue;
          if (entry.isIntersecting) {
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          } else {
            if (next.has(id)) {
              next.delete(id);
              changed = true;
            }
          }
        }
        if (changed) {
          activeIdsRef.current = next;
          setActiveIds(next);
        }
      },
      {
        // Activate when the citation is in the upper 60 % of the viewport —
        // matches the natural reading zone, ignores the bottom edge where
        // citations are about to scroll into view but not yet read.
        rootMargin: "0px 0px -40% 0px",
      },
    );

    const elements = document.querySelectorAll<HTMLElement>("[data-cite]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [refs]);

  const value = useMemo(
    () => ({ refs, activeIds, registerRefs }),
    [refs, activeIds, registerRefs],
  );

  return (
    <ReferencesContext.Provider value={value}>
      {children}
    </ReferencesContext.Provider>
  );
}

export function useReferences() {
  const ctx = useContext(ReferencesContext);
  if (!ctx) {
    throw new Error("useReferences must be used inside <ReferencesProvider>.");
  }
  return ctx;
}
