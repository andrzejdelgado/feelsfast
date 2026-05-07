"use client";

import { Loader2, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { STEPS } from "./config";

const TOTAL_DURATION = STEPS.reduce((sum, s) => sum + s.durationMs, 0);

/**
 * Naive tool execution — a single "Working…" spinner runs for the full
 * end-to-end duration, then the final summary appears. The user has no
 * signal that the agent is doing distinct things, no signal of how far
 * along it is, and no recourse if a single step is hanging.
 */
export function NaiveAiToolExecution() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const run = () => {
    setPhase("running");
    timeoutRef.current = setTimeout(() => {
      setPhase("done");
    }, gammaJitter(TOTAL_DURATION));
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={run}
        disabled={phase === "running"}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Play className="size-4" aria-hidden />
        Run agent
      </button>

      {phase === "running" ? (
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Working…</span>
        </div>
      ) : null}

      {phase === "done" ? (
        <div className="rounded-md border border-border bg-background px-3 py-2 text-sm">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-4" aria-hidden />
            <span className="font-medium">Done.</span>
          </div>
          <p className="mt-1 text-muted-foreground">
            Replaced <code>useState</code> with{" "}
            <code>useDeferredValue</code> in SearchBox.tsx. Typecheck passed.
          </p>
        </div>
      ) : null}
    </div>
  );
}
