"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — an empty horizontal track. Communicates exactly nothing
 * about whether work is happening; the user wonders if the page is
 * stuck.
 */
export function NaiveMarqueeBar() {
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
    <div className="space-y-3">
      <div className="h-1.5 w-full rounded-full bg-muted/60" />
      <p className="text-xs text-muted-foreground">
        {phase === "loading" ? "Working…" : "Done."}
      </p>
    </div>
  );
}
