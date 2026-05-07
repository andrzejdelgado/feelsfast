"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { STEPS, type ToolStep } from "./config";

type StepState = {
  step: ToolStep;
  status: "pending" | "running" | "done";
};

/**
 * Tuned tool execution — every tool call surfaces as a discrete row as
 * the agent runs it. Each row carries:
 *   - a status icon (running spinner / done check);
 *   - the tool's human-readable label;
 *   - the result detail once the tool returns.
 *
 * Auto-starts on mount. The DemoRunner's external Run button mounts
 * the demo, which kicks off the steps in sequence and walks them to
 * completion.
 */
export function TunedAiToolExecution({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"running" | "done">("running");
  const [states, setStates] = useState<StepState[]>(
    STEPS.map((s) => ({ step: s, status: "pending" })),
  );
  const cancelRef = useRef<{ cancelled: boolean } | null>(null);

  useEffect(() => {
    const token = { cancelled: false };
    cancelRef.current = token;

    const run = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (token.cancelled) return;
        setStates((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: "running" } : s,
          ),
        );
        await new Promise<void>((resolve) =>
          setTimeout(
            resolve,
            seededGamma(seed + i * 1009, STEPS[i].durationMs),
          ),
        );
        if (token.cancelled) return;
        setStates((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: "done" } : s)),
        );
      }
      if (!token.cancelled) setPhase("done");
    };
    run();

    return () => {
      token.cancelled = true;
    };
  }, [seed]);

  return (
    <div className="space-y-3">
      <ol className="space-y-1.5">
        {states.map((s) => (
          <li
            key={s.step.id}
            className={cn(
              "rounded-md border bg-background px-3 py-2 text-sm transition-colors",
              s.status === "running"
                ? "border-primary"
                : s.status === "done"
                  ? "border-border"
                  : "border-border opacity-60",
            )}
          >
            <div className="flex items-center gap-2">
              <StatusIcon status={s.status} />
              <span className="font-medium">{s.step.label}</span>
            </div>
            {s.status === "done" ? (
              <p className="mt-1 pl-6 text-xs text-muted-foreground">
                {s.step.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      {phase === "done" ? (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="size-4" aria-hidden />
          <span className="font-medium">Done.</span>
        </div>
      ) : null}
    </div>
  );
}

function StatusIcon({ status }: { status: StepState["status"] }) {
  if (status === "done") return <Check aria-hidden className="size-4 text-primary" />;
  if (status === "running")
    return (
      <Loader2
        aria-hidden
        className="size-4 animate-spin text-primary motion-reduce:animate-none"
      />
    );
  return <span aria-hidden className="size-4 rounded-full border border-border" />;
}
