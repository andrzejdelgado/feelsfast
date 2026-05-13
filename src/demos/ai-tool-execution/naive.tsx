"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { STEPS, STEPS_MOBILE, type ToolStep } from "./config";

/**
 * Naive tool execution — a single "Working…" spinner runs for the full
 * end-to-end duration, then the final summary appears. Auto-starts on
 * mount; total duration = sum of seeded per-step durations, so Naive
 * finishes at the same wall-clock moment as Tuned.
 */
export function NaiveAiToolExecution({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"running" | "done">("running");
  const [steps, setSteps] = useState<readonly ToolStep[]>(STEPS);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setSteps(mq.matches ? STEPS_MOBILE : STEPS);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const totalMs = steps.reduce(
      (sum, s, i) => sum + seededGamma(seed + i * 1009, s.durationMs),
      0,
    );
    timeoutRef.current = setTimeout(() => {
      setPhase("done");
    }, totalMs);
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [seed, steps]);

  return (
    <div className="space-y-3">
      {phase === "running" ? (
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Working…</span>
        </div>
      ) : (
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
      )}
    </div>
  );
}
