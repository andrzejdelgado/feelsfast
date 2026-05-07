"use client";

import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — a static "Working…" line. Honest but lifeless; the user
 * cannot tell the difference between actively working and stuck.
 */
export function NaivePulsingOrb({ seed = 1 }: { seed?: number }) {
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

  return (
    <div className="space-y-2">
      {loaded ? (
        <p className="text-sm leading-relaxed text-foreground">
          Yes — that&apos;s exactly the right framing.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">Working…</p>
      )}
    </div>
  );
}
