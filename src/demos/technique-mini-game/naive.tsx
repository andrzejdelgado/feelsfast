"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — a generic spinner for the full ~12 s. The user has nothing
 * to do but wait. The wait is pure cost.
 */
export function NaiveMiniGame({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="grid h-full min-h-[10rem] place-items-center rounded-md border border-border bg-background">
      {phase === "loading" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Working…</span>
        </div>
      ) : (
        <p className="text-sm text-foreground">Done.</p>
      )}
    </div>
  );
}
