"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

/**
 * Naive — a generic spinning circle next to a static "Thinking…"
 * label. Honest but heavy: the spinner pulls the eye like a strobe
 * during what should be a calm wait, and the word itself sits dead.
 */
export function NaiveThinkingGradient() {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setLoaded(true),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="rounded-md border border-border bg-background p-4">
      {loaded ? (
        <Response />
      ) : (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Thinking…</span>
        </div>
      )}
    </div>
  );
}

function Response() {
  return (
    <p className="text-sm leading-relaxed text-foreground">
      Yes — perceived performance is what your users actually judge you on. The
      clock can say two seconds; the experience can feel like one.
    </p>
  );
}
