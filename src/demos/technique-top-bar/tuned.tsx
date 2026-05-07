"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import {
  OVERSHOOT_AT_MS,
  OVERSHOOT_TARGET,
  TOTAL_DURATION_P50_MS,
} from "./config";

type Phase = "trickle" | "idle-loop" | "complete";

/**
 * Tuned — Instagram / NProgress-style top-edge progress bar.
 *
 * Behaviour:
 *   1. The bar trickles from 0 % to OVERSHOOT_TARGET (~95 %) over the
 *      first ~1.8 s of the wait, eased so it feels eager early and
 *      slow as it approaches the end.
 *   2. It then *holds* at ~95 % while a primary-coloured gradient
 *      animates left-to-right inside the filled portion. This is the
 *      perception trick: the user reads "almost done" early, and the
 *      remaining wait is interpreted as polish rather than absence.
 *   3. When the actual work completes, the bar snaps to 100 % and
 *      fades out shortly after.
 *
 * The same simulated wait drives both sides of the demo, so it is
 * apples-to-apples: same wall-clock time, very different felt time.
 */
export function TunedTopBar({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("trickle");
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(performance.now());
  const totalRef = useRef(TOTAL_DURATION_P50_MS);

  useEffect(() => {
    startedAt.current = performance.now();
    totalRef.current = seededGamma(seed, TOTAL_DURATION_P50_MS);

    const tick = setInterval(() => {
      const elapsed = performance.now() - startedAt.current;

      if (elapsed >= totalRef.current) {
        setProgress(1);
        setPhase("complete");
        clearInterval(tick);
        return;
      }

      if (elapsed < OVERSHOOT_AT_MS) {
        // Ease-out trickle from 0 → OVERSHOOT_TARGET.
        const t = elapsed / OVERSHOOT_AT_MS;
        const eased = 1 - Math.pow(1 - t, 2.2);
        setProgress(eased * OVERSHOOT_TARGET);
        setPhase("trickle");
      } else {
        // Past the trickle: hold at the overshoot target. The visible
        // motion now comes from the gradient sweep, not the width.
        setProgress(OVERSHOOT_TARGET);
        setPhase("idle-loop");
      }
    }, 50);

    return () => clearInterval(tick);
  }, [seed]);

  const widthPct = Math.round(progress * 100);
  const showBar = phase !== "complete";

  return (
    <div className="relative h-40 overflow-hidden rounded-md border border-border bg-background">
      {/* Top-edge progress bar */}
      <div className="relative h-1 w-full overflow-hidden bg-muted/40">
        {showBar ? (
          <div
            role="progressbar"
            aria-label="Loading page"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={widthPct}
            className="h-full transition-[width] duration-200 ease-out"
            style={{
              width: `${widthPct}%`,
              backgroundImage:
                "linear-gradient(90deg, color-mix(in oklch, var(--primary) 40%, transparent) 0%, var(--primary) 50%, color-mix(in oklch, var(--primary) 40%, transparent) 100%)",
              backgroundSize: "200% 100%",
              animation:
                phase === "idle-loop"
                  ? "topbar-sweep 1100ms linear infinite"
                  : undefined,
            }}
          />
        ) : null}
      </div>

      <div className="px-4 pt-3">
        {phase === "complete" ? (
          <ContentMock />
        ) : (
          <p className="text-xs text-muted-foreground">Loading…</p>
        )}
      </div>

      <style>{`
        @keyframes topbar-sweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

function ContentMock() {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Latest activity</p>
      <p className="text-xs text-muted-foreground">
        Maya merged a PR. Ben deployed staging. Lin opened an issue.
      </p>
      <p className="text-xs text-muted-foreground">
        Refactor the analytics module · Audit the dependency tree
      </p>
    </div>
  );
}
