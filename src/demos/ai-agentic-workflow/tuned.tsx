"use client";

import { Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { PHASES } from "./config";

type PhaseState = {
  status: "pending" | "running" | "done";
  /** 0–1 within the phase; only used when phase has units. */
  ratio: number;
};

/**
 * Tuned agentic workflow — every phase surfaces as its own row, all
 * rendered at the same row height so the panel never shifts.
 *
 *   - Pending: dim circle outline + label.
 *   - Running: a radial progress ring (for phases with declared units)
 *     or a spinning loader (for phases without). Unit count appears on
 *     the right (`n / 12`).
 *   - Done: a check mark replaces the indicator + final unit count.
 *
 * The radial ring replaces the linear bar used in earlier revisions
 * so the row content never gains an extra line.
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
                <div className="flex min-w-0 items-center gap-2">
                  <StatusIcon
                    status={s.status}
                    ratio={s.ratio}
                    hasUnits={Boolean(p.units)}
                  />
                  <span className="truncate font-medium">{p.label}</span>
                </div>
                {p.units && s.status !== "pending" ? (
                  <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-wider tabular-nums text-muted-foreground">
                    {s.status === "done"
                      ? `${p.units.total} / ${p.units.total}`
                      : `${unitsDone} / ${p.units.total}`}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className={cn(
          "flex items-center gap-2 text-sm text-primary",
          phase === "done" ? undefined : "invisible",
        )}
        aria-hidden={phase !== "done"}
      >
        <Sparkles className="size-4" aria-hidden />
        <span className="font-medium">Report ready.</span>
      </div>
    </div>
  );
}

/**
 * Per-row indicator. Done = check. Running with units = radial ring
 * filling with `ratio`. Running without units = spinning loader.
 * Pending = dim outlined circle. All variants render at `size-4` so
 * the row height is identical across every state.
 */
function StatusIcon({
  status,
  ratio,
  hasUnits,
}: {
  status: PhaseState["status"];
  ratio: number;
  hasUnits: boolean;
}) {
  if (status === "done") {
    return <Check aria-hidden className="size-4 text-primary" />;
  }
  if (status === "running") {
    if (hasUnits) return <RadialProgress ratio={ratio} />;
    return (
      <Loader2
        aria-hidden
        className="size-4 animate-spin text-primary motion-reduce:animate-none"
      />
    );
  }
  return (
    <span
      aria-hidden
      className="size-4 rounded-full border border-border"
    />
  );
}

function RadialProgress({ ratio }: { ratio: number }) {
  const r = 6;
  const circumference = 2 * Math.PI * r;
  const dash = Math.max(0.001, ratio) * circumference;
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-4 -rotate-90"
    >
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        stroke="var(--muted)"
        strokeWidth="2"
      />
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        style={{ transition: "stroke-dasharray 100ms linear" }}
      />
    </svg>
  );
}
