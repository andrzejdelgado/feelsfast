"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { PHASES } from "./config";

type PhaseState = {
  status: "pending" | "running" | "done";
  /** 0–1 within the phase; only used when phase has units. */
  ratio: number;
};

/**
 * Tuned agentic workflow — every phase surfaces as its own row. The
 * currently-running phase shows a progress bar based on its declared
 * unit count (Research sources: 7 / 12, Verify citations: 4 / 8) where
 * applicable, and a soft pulse where it does not. Phases already done
 * collapse to a check + final unit count. Auto-starts on mount.
 */
export function TunedAiAgenticWorkflow({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"running" | "done">("running");
  const [states, setStates] = useState<PhaseState[]>(() =>
    PHASES.map(() => ({ status: "pending", ratio: 0 })),
  );

  useEffect(() => {
    const token = { cancelled: false };

    const run = async () => {
      for (let i = 0; i < PHASES.length; i++) {
        if (token.cancelled) return;
        setStates((prev) =>
          prev.map((s, idx) =>
            idx === i ? { status: "running", ratio: 0 } : s,
          ),
        );
        const total = seededGamma(seed + i * 1009, PHASES[i].durationMs);
        const start = performance.now();
        await new Promise<void>((resolve) => {
          const id = setInterval(() => {
            const elapsed = performance.now() - start;
            const ratio = Math.min(1, elapsed / total);
            setStates((prev) =>
              prev.map((s, idx) =>
                idx === i ? { status: "running", ratio } : s,
              ),
            );
            if (token.cancelled || ratio >= 1) {
              clearInterval(id);
              resolve();
            }
          }, 100);
        });
        if (token.cancelled) return;
        setStates((prev) =>
          prev.map((s, idx) => (idx === i ? { status: "done", ratio: 1 } : s)),
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
        {PHASES.map((p, i) => {
          const s = states[i];
          const showBar = s.status === "running" && p.units;
          const unitsDone = p.units
            ? Math.round(s.ratio * p.units.total)
            : 0;
          return (
            <li
              key={p.id}
              className={cn(
                "rounded-md border bg-background px-3 py-2 text-sm transition-colors",
                s.status === "running"
                  ? "border-primary"
                  : s.status === "done"
                    ? "border-border"
                    : "border-border opacity-60",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StatusIcon status={s.status} />
                  <span className="font-medium">{p.label}</span>
                </div>
                {p.units && s.status !== "pending" ? (
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                    {s.status === "done"
                      ? `${p.units.total} / ${p.units.total} ${p.units.label}`
                      : `${unitsDone} / ${p.units.total} ${p.units.label}`}
                  </span>
                ) : null}
              </div>
              {showBar ? (
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-[width] duration-100 ease-out"
                    style={{ width: `${Math.round(s.ratio * 100)}%` }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {phase === "done" ? (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="size-4" aria-hidden />
          <span className="font-medium">Report ready.</span>
        </div>
      ) : null}
    </div>
  );
}

function StatusIcon({ status }: { status: PhaseState["status"] }) {
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
