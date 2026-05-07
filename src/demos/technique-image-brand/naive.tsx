"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { HERO, TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — empty muted box until the image arrives, then snap. The
 * slot communicates nothing about what is loading or who it is from.
 */
export function NaiveImageBrand({ seed = 1 }: { seed?: number }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
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
