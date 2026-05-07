"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

type Phase = "generating" | "ready";

/**
 * Naive — opaque "Generating download…" spinner for the full duration,
 * then the download link appears. Auto-starts on mount.
 */
export function NaiveDataExport({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("generating");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPhase("ready");
    }, seededGamma(seed, TOTAL_DURATION_P50_MS));
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [seed]);

  return (
    <div className="space-y-3">
      {phase === "generating" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Generating download…</span>
        </div>
      ) : (
        <p className="text-sm">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-primary underline-offset-2 hover:underline"
          >
            export.csv
          </a>{" "}
          is ready.
        </p>
      )}
    </div>
  );
}
