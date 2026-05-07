"use client";

import { useEffect } from "react";
import { useReferences, type Reference } from "./ReferencesProvider";

/**
 * Drop one of these inside an MDX article (passing the article's reference
 * list) to populate the right-rail ReferencesPanel.
 *
 * Renders nothing visible. On unmount it clears the panel so navigating to
 * a page without citations leaves the panel empty.
 */
export function RegisterReferences({ refs }: { refs: readonly Reference[] }) {
  const { registerRefs } = useReferences();

  useEffect(() => {
    registerRefs([...refs]);
    return () => registerRefs([]);
  }, [refs, registerRefs]);

  return null;
}
