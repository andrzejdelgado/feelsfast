"use client";

import { Loader2, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { PHASES } from "./config";

/**
 * Naive agentic workflow — a single "Running agent…" spinner runs for
 * the full ~20-second duration. No phase information, no per-phase
 * progress, no cancellation. The user has to either trust the whole
 * thing or kill the tab.
 */
export function NaiveAiAgenticWorkflow({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const run = () => {
    setPhase("running");
    const totalMs = PHASES.reduce(
      (sum, p, i) => sum + seededGamma(seed + i * 1009, p.durationMs),
      0,
    );
    timeoutRef.current = setTimeout(() => {
      setPhase("done");
    }, totalMs);
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
          <span>Running agent…</span>
        </div>
      ) : null}

      {phase === "done" ? (
        <div className="rounded-md border border-border bg-background px-3 py-2 text-sm">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-4" aria-hidden />
            <span className="font-medium">Report ready.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
