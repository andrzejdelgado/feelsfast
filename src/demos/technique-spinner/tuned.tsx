"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Tuned — a circular spinner (lucide `Loader2`) appears for the
 * duration of the wait. Honest about not knowing how long this will
 * take. Right cue when:
 *   - wait is genuinely indeterminate (no progress signal available)
 *   - wait is 1–3 s (above the no-cue band, below the band where
 *     determinate progress or skeletons start to earn their keep)
 *
 * `motion-reduce` swaps to a static dot — same presence cue, no
 * rotation.
 */
export function TunedSpinner() {
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
      {loaded ? (
        <p className="text-sm text-foreground">Settings saved.</p>
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none motion-reduce:rounded-full motion-reduce:bg-muted-foreground"
          />
          <span>Saving…</span>
        </div>
      )}
    </div>
  );
}
