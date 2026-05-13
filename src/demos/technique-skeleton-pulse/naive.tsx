"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — content-true skeleton with no animation. The skeleton is
 * honest but the page reads as "frozen" rather than "loading."
 *
 * Outer card always renders the loaded text (invisible while waiting)
 * so the box height is locked to the loaded state from the first
 * paint. Skeleton overlays during the wait. Off and On panels share
 * the exact same height at every moment.
 */
export function NaiveSkeletonPulse({ seed = 1 }: { seed?: number }) {
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
    <div className="relative rounded-md border border-border bg-background p-3 text-sm">
      <p className={cn("font-medium", !loaded && "invisible")}>
        Project status
      </p>
      <p
        className={cn(
          "mt-1 text-xs leading-relaxed text-muted-foreground",
          !loaded && "invisible",
        )}
      >
        Three open PRs awaiting review. One blocking issue on the database
        migration. Sprint review is Friday at 14:00.
      </p>
      {!loaded ? (
        <div className="pointer-events-none absolute inset-3 space-y-2">
          <div className="h-4 w-1/2 rounded bg-muted" />
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-5/6 rounded bg-muted" />
          <div className="h-3 w-2/3 rounded bg-muted" />
        </div>
      ) : null}
    </div>
  );
}
