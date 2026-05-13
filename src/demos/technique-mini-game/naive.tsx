"use client";

import { Check, Download, Loader2 } from "lucide-react";
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
    <div className="grid h-full min-h-[10rem] place-items-center rounded-md border border-border bg-background p-4">
      {phase === "loading" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Working…</span>
        </div>
      ) : (
        <ReportReady />
      )}
    </div>
  );
}

export function ReportReady() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="inline-flex items-center gap-1.5 text-sm text-primary">
        <Check aria-hidden className="size-4" />
        <span className="font-medium">Report is Ready</span>
      </p>
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Download aria-hidden className="size-3" />
        Download
      </button>
    </div>
  );
}
