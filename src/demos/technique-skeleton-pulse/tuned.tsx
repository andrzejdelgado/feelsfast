"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — every skeleton block pulses opacity from 0.5 to 1 and back
 * over 1.4 s, in sync. No horizontal sweep, no gradient — just a
 * breath. Lower visual cost than shimmer; preferred when the
 * surrounding surface (sidebar, navigation) already has motion of
 * its own.
 *
 * Outer card always renders the loaded text (invisible while waiting)
 * so the box height matches the Naive panel exactly. Skeleton pulses
 * overlay during the wait — no height change when the real content
 * arrives.
 */
export function TunedSkeletonPulse({ seed = 1 }: { seed?: number }) {
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
          <Block className="h-4 w-1/2" />
          <Block className="h-3 w-full" />
          <Block className="h-3 w-5/6" />
          <Block className="h-3 w-2/3" />
          <style>{`
            @keyframes skeleton-pulse {
              0%, 100% { background-color: var(--muted); }
              50%      { background-color: color-mix(in oklch, var(--muted) 78%, var(--muted-foreground)); }
            }
          `}</style>
        </div>
      ) : null}
    </div>
  );
}

function Block({ className }: { className: string }) {
  return (
    <div
      className={`rounded bg-muted motion-reduce:animate-none ${className}`}
      style={{ animation: "skeleton-pulse 1400ms ease-in-out infinite" }}
    />
  );
}
