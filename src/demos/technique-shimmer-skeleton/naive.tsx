"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — content-true skeleton with NO animation. The boxes are in
 * roughly the right places and the right sizes, but the surface stays
 * static. Honest, but visually quiet — the eye does not register that
 * anything is happening.
 *
 * The outer card always renders the loaded text (invisible while
 * waiting) so its height is locked to the loaded card from the first
 * paint. The skeleton sits absolutely on top during the wait. Result:
 * Off and On panels are identical heights, and neither one jumps when
 * the content arrives.
 */
export function NaiveShimmerSkeleton({ seed = 1 }: { seed?: number }) {
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
    <div className="relative rounded-md border border-border bg-background p-3 text-sm">
      <p className={cn("font-medium", !loaded && "invisible")}>
        Q3 sprint goals
      </p>
      <p
        className={cn(
          "mt-2.5 text-xs leading-relaxed text-muted-foreground",
          !loaded && "invisible",
        )}
      >
        Ship perceived-performance demos. Migrate staging. Cut Q3 release branch
        on Friday.
      </p>
      {!loaded ? (
        <div className="pointer-events-none absolute inset-3 space-y-2.5">
          <div className="h-3 w-32 rounded bg-muted" />
          <div className="h-2.5 w-full rounded bg-muted" />
          <div className="h-2.5 w-5/6 rounded bg-muted" />
          <div className="h-2.5 w-2/3 rounded bg-muted" />
        </div>
      ) : null}
    </div>
  );
}
