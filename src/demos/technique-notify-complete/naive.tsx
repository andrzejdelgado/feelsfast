"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — spinner blocks the panel for the full duration. The user
 * has to keep this tab in the foreground or they will miss the
 * completion entirely.
 */
export function NaiveNotifyComplete({ seed = 1 }: { seed?: number }) {
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
    <div className="grid min-h-[10rem] place-items-center rounded-md border border-border bg-background">
      {phase === "loading" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Generating report…</span>
        </div>
      ) : (
        <p className="text-sm text-foreground">Report ready.</p>
      )}
    </div>
  );
}
