"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import {
  TOTAL_DURATION_P50_MS,
  TRICKLE_AT_MS,
  TRICKLE_TARGET,
} from "./config";

type Phase = "trickle" | "hold" | "complete";

/**
 * Tuned — NProgress-style trickle bar. Three phases:
 *   1. Trickle: 0 → 80 % over the first ~320 ms with a brisk ease-out.
 *   2. Hold: stays at 80 % calmly. No animation in this state — the
 *      bar is *honest* that it does not yet know how long the
 *      remainder will take.
 *   3. Complete: snaps to 100 % when the work finishes; fades after
 *      a moment.
 *
 * This is the right cue for the 100 MS – 1 S band: a clear "something
 * is happening" without claiming a duration the implementation does
 * not actually know.
 */
export function TunedTrickleBar() {
  const [phase, setPhase] = useState<Phase>("trickle");
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(performance.now());
  const totalRef = useRef(TOTAL_DURATION_P50_MS);

  useEffect(() => {
    startedAt.current = performance.now();
    totalRef.current = gammaJitter(TOTAL_DURATION_P50_MS);

    const tick = setInterval(() => {
      const elapsed = performance.now() - startedAt.current;

      if (elapsed >= totalRef.current) {
        setProgress(1);
        setPhase("complete");
        clearInterval(tick);
        return;
      }

      if (elapsed < TRICKLE_AT_MS) {
        const t = elapsed / TRICKLE_AT_MS;
        const eased = 1 - Math.pow(1 - t, 2);
        setProgress(eased * TRICKLE_TARGET);
        setPhase("trickle");
      } else {
        setProgress(TRICKLE_TARGET);
        setPhase("hold");
      }
    }, 30);

    return () => clearInterval(tick);
  }, []);

  const widthPct = Math.round(progress * 100);
  const showBar = phase !== "complete";

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="relative h-1 w-full overflow-hidden bg-muted/40">
        {showBar ? (
          <div
            role="progressbar"
            aria-label="Loading"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={widthPct}
            className="h-full bg-primary transition-[width] duration-100 ease-out"
            style={{ width: `${widthPct}%` }}
          />
        ) : null}
      </div>
      <div className="px-4 pt-3 text-xs text-muted-foreground">
        {phase === "complete" ? "Done." : "Loading…"}
      </div>
    </div>
  );
}
