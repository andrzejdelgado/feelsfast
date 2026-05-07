"use client";

import { Check, Loader2, Play, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
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
 * The user can read the agent's trajectory in real time: "the model is
 * reading my package.json now, then it searched for useState, now it is
 * editing the file." Cancellation is always available — the visible
 * tool-call list is what makes the cancellation actionable, because the
 * user can see *what is currently happening* and decide whether to stop.
 */
export function TunedAiToolExecution() {
  const [phase, setPhase] = useState<"idle" | "running" | "done" | "cancelled">(
    "idle",
  );
  const [states, setStates] = useState<StepState[]>(
    STEPS.map((s) => ({ step: s, status: "pending" })),
  );
  const cancelRef = useRef<{ cancelled: boolean } | null>(null);

  useEffect(() => {
    return () => {
      if (cancelRef.current) cancelRef.current.cancelled = true;
    };
  }, []);

  const run = async () => {
    if (phase === "running") return;
    setPhase("running");
    setStates(STEPS.map((s) => ({ step: s, status: "pending" })));
    const token = { cancelled: false };
    cancelRef.current = token;

    for (let i = 0; i < STEPS.length; i++) {
      if (token.cancelled) return;
      setStates((prev) =>
        prev.map((s, idx) =>
          idx === i ? { ...s, status: "running" } : s,
        ),
      );
      await new Promise<void>((resolve) =>
        setTimeout(resolve, gammaJitter(STEPS[i].durationMs)),
      );
      if (token.cancelled) return;
      setStates((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "done" } : s)),
      );
    }
    if (!token.cancelled) setPhase("done");
  };

  const cancel = () => {
    if (cancelRef.current) cancelRef.current.cancelled = true;
    setPhase("cancelled");
  };

  const showSteps = phase !== "idle";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={run}
          disabled={phase === "running"}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play className="size-4" aria-hidden />
          Run agent
        </button>
        {phase === "running" ? (
          <button
            type="button"
            onClick={cancel}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X aria-hidden className="size-3" />
            Cancel
          </button>
        ) : null}
      </div>

      {showSteps ? (
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
      ) : null}

      {phase === "done" ? (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="size-4" aria-hidden />
          <span className="font-medium">Done.</span>
        </div>
      ) : null}
      {phase === "cancelled" ? (
        <p className="text-sm text-muted-foreground">Cancelled.</p>
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
