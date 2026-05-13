"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — same content-true skeleton, plus a low-contrast gradient
 * sweep that moves across every skeleton block in sync. Implementation
 * notes:
 *
 *  - Each skeleton block paints `linear-gradient(90deg, muted, ivory,
 *    muted)` at 200 % background-size and animates `background-position`.
 *  - The animation period (1.4 s) matches PRD §7.4's recommended
 *    skeleton shimmer cadence.
 *  - `motion-reduce:animate-none` strips the animation when the user
 *    has reduced-motion enabled — falling back to the static skeleton.
 *
 * The Anstis 2003 finding (low-contrast motion feels slower) is the
 * reason we use a *low*-contrast gradient. Bright contrast would feel
 * urgent; the calm shimmer feels like a deliberate, polished wait.
 */
export function TunedShimmerSkeleton({ seed = 1 }: { seed?: number }) {
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

  // The outer card always renders the loaded text (invisible while
  // waiting) so its height is locked from the first paint and matches
  // the Naive panel exactly. The shimmer skeleton overlays during the
  // wait — no height change when the real content arrives.
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
          <ShimmerBlock className="h-3 w-32" />
          <ShimmerBlock className="h-2.5 w-full" />
          <ShimmerBlock className="h-2.5 w-5/6" />
          <ShimmerBlock className="h-2.5 w-2/3" />
          <style>{`
            @keyframes shimmer-sweep {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
        </div>
      ) : null}
    </div>
  );
}

function ShimmerBlock({ className }: { className: string }) {
  return (
    <div
      className={`rounded motion-reduce:animate-none ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--muted) 0%, color-mix(in oklch, var(--muted) 78%, var(--muted-foreground)) 50%, var(--muted) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer-sweep 1400ms linear infinite",
      }}
    />
  );
}
