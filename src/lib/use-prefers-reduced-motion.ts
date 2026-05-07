"use client";

import { useEffect, useState } from "react";

/**
 * Reflects the user's `prefers-reduced-motion` setting.
 * Defaults to `false` on the server / initial render, then updates after mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(query.matches);
    const onChange = () => setPrefers(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return prefers;
}
