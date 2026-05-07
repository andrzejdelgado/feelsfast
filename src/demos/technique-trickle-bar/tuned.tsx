"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import {
  TOTAL_DURATION_P50_MS,
  TRICKLE_AT_MS,
  TRICKLE_TARGET,
} from "./config";

type Phase = "trickle" | "hold" | "complete";

/**
 * Tuned — NProgress-style trickle bar. Three phases:
 *   1. Trickle: 0 → ~80 % over the first ~320 ms with a brisk ease-out.
 *   2. Hold: stays at 80 % calmly. The bar is honest that it does not
 *      yet know how long the remainder will take.
 *   3. Complete: visibly snaps to 100 % when the work finishes and the
 *      success label appears.
 *
 * The card fills the panel; bar + status sit centred inside it.
 */
export function TunedTrickleBar({ seed = 1 }: { seed?: number }) {
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
  }, [seed]);

  const widthPct = Math.round(progress * 100);

  return (
    <div className="flex h-full min-h-[8rem] flex-col items-center justify-center gap-3 rounded-md border border-border bg-background p-4">
      <div
        role="progressbar"
        aria-label="Loading"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={widthPct}
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40"
      >
        <div
          className="h-full bg-primary transition-[width] duration-200 ease-out"
          style={{ width: `${widthPct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {phase === "complete" ? "Done." : "Loading…"}
      </p>
    </div>
  );
}
