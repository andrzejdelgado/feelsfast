"use client";

import { Download, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

type Phase = "idle" | "generating" | "ready";

export function NaiveDataExport({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const generate = () => {
    setPhase("generating");
    timeoutRef.current = setTimeout(() => {
      setPhase("ready");
    }, seededGamma(seed, TOTAL_DURATION_P50_MS));
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={generate}
        disabled={phase === "generating"}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download className="size-4" aria-hidden />
        {phase === "ready" ? "Download ready" : "Generate CSV"}
      </button>

      {phase === "generating" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Generating download…</span>
        </div>
      ) : null}

      {phase === "ready" ? (
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
      ) : null}
    </div>
  );
}
