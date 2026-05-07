"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — a single "Loading…" line + spinner for the full ~12 s wait.
 * The user has nothing to read, nothing to do, and nothing to learn
 * about the wait. Past the 10-second wall this reads as broken.
 */
export function NaiveRotatingTips() {
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
      {phase === "loading" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Loading…</span>
        </div>
      ) : (
        <p className="text-sm text-foreground">Done.</p>
      )}
    </div>
  );
}
