"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — no top-edge bar. The body waits in silence until the work
 * completes. For sub-second waits this often goes unnoticed, but for
 * the longer end of this band the user starts to wonder if anything
 * is happening.
 */
export function NaiveTrickleBar() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="h-1 w-full bg-transparent" />
      <div className="px-4 pt-3 text-xs text-muted-foreground">
        {phase === "loading" ? "Loading…" : "Done."}
      </div>
    </div>
  );
}
