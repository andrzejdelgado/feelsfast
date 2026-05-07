"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { HERO, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — empty muted slot until the image "loads," then the gradient
 * snaps in. No dominant-colour cue, no progressive reveal. The visitor
 * stares at absence for the full wait.
 */
export function NaiveImageColor({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div
        aria-label={HERO.alt}
        aria-busy={!loaded}
        className="aspect-video w-full bg-muted"
        style={loaded ? { backgroundImage: HERO.gradient } : undefined}
      />
      <div className="px-3 py-2 text-xs text-muted-foreground">{HERO.alt}</div>
    </div>
  );
}
