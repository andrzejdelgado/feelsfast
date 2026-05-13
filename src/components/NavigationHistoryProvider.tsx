"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks whether the user has navigated at least once *within* the
 * site since this tab was opened.
 *
 * Used by `<BackToSection>` to decide between calling `router.back()`
 * (when there's in-app history to pop) and falling back to the parent
 * section index (when the user landed here directly — e.g. from a
 * shared URL, search-engine result, or new-tab open).
 *
 * The provider is mounted in `SiteShell`, which stays alive across
 * App Router transitions. State persists for the lifetime of the tab.
 * A hard refresh resets it (as it should — that's a "direct landing"
 * again).
 *
 * Only flips false → true on a *different* pathname. Coming back to the
 * same path via browser back doesn't count as internal navigation here
 * (which is correct: if the previous entry in history was external, we
 * don't want to send the user there via `router.back()`).
 */
const NavigationHistoryContext = createContext<{ hasInternalHistory: boolean }>(
  { hasInternalHistory: false },
);

export function NavigationHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const initialPath = useRef(pathname);
  const [hasInternalHistory, setHas] = useState(false);

  // On mount: if the document.referrer is same-origin, the user
  // arrived here from another page on this site (covers full-reload
  // navigations triggered by MDX `<a>` tags, which remount the
  // provider and lose any in-memory state).
  useEffect(() => {
    if (hasInternalHistory) return;
    if (typeof document === "undefined" || !document.referrer) return;
    try {
      const ref = new URL(document.referrer);
      if (ref.origin === window.location.origin) {
        setHas(true);
      }
    } catch {
      // malformed referrer — treat as external
    }
  }, [hasInternalHistory]);

  // On soft navigation (Next.js <Link>, router.push), the provider
  // stays mounted but the pathname changes. Flip true on the first
  // change.
  useEffect(() => {
    if (!hasInternalHistory && pathname !== initialPath.current) {
      setHas(true);
    }
  }, [pathname, hasInternalHistory]);

  return (
    <NavigationHistoryContext.Provider value={{ hasInternalHistory }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
}

export function useNavigationHistory() {
  return useContext(NavigationHistoryContext);
}
