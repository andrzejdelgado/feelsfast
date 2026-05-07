"use client";

import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — nothing visible happens during the wait. The user has no
 * signal of activity at all; on the longer end of this band they
 * start to wonder if their click registered.
 */
export function NaiveSpinner() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    ref.current = setTimeout(
      () => setLoaded(true),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (ref.current !== null) clearTimeout(ref.current);
    };
  }, []);

  return (
    <div className="grid min-h-[5rem] place-items-center rounded-md border border-border bg-background">
      <p className="text-sm text-foreground">
        {loaded ? "Settings saved." : ""}
      </p>
    </div>
  );
}
