"use client";

import { Check, Download, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import {
  ENGAGEMENT_MESSAGES,
  ENGAGEMENT_THRESHOLD_MS,
  TOTAL_DURATION_P50_MS,
  TOTAL_ROWS,
} from "./config";

type Phase = "idle" | "generating" | "ready";

const STAGE_BOUNDARIES = ENGAGEMENT_MESSAGES.map(
  (_, i) => (i + 1) / ENGAGEMENT_MESSAGES.length,
);

export function TunedDataExport() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalRef = useRef(TOTAL_DURATION_P50_MS);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const generate = () => {
    totalRef.current = gammaJitter(TOTAL_DURATION_P50_MS);
    setPhase("generating");
    setProgress(0);
    setElapsed(0);
    const start = performance.now();
    intervalRef.current = setInterval(() => {
      const now = performance.now() - start;
      const ratio = Math.min(1, now / totalRef.current);
      setElapsed(now);
      setProgress(ratio);
      if (ratio >= 1 && intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPhase("ready");
      }
    }, 100);
  };

  const stageIdx = Math.min(
    ENGAGEMENT_MESSAGES.length - 1,
    STAGE_BOUNDARIES.findIndex((b) => progress < b) === -1
      ? ENGAGEMENT_MESSAGES.length - 1
      : STAGE_BOUNDARIES.findIndex((b) => progress < b),
  );
  const message = ENGAGEMENT_MESSAGES[stageIdx];
  const rowsDone = Math.round(progress * TOTAL_ROWS);
  const percent = Math.round(progress * 100);
  const showEmailHandoff =
    phase === "generating" && elapsed > ENGAGEMENT_THRESHOLD_MS;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={generate}
        disabled={phase === "generating"}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download className="size-4" aria-hidden />
        {phase === "ready" ? "Download ready" : "Generate CSV"}
      </button>

      {phase === "generating" ? (
        <div className="space-y-2">
          <div
            role="progressbar"
            aria-label={`Generating CSV, ${rowsDone} of ${TOTAL_ROWS} rows`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full bg-primary transition-[width] duration-100 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{message}</span>
            <span className="font-mono tabular-nums">
              {rowsDone.toLocaleString()} / {TOTAL_ROWS.toLocaleString()} rows
            </span>
          </div>
          {showEmailHandoff ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-primary underline-offset-2 hover:underline"
            >
              <Mail aria-hidden className="size-3" />
              Email me when it&apos;s ready
            </button>
          ) : null}
        </div>
      ) : null}

      {phase === "ready" ? (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Check className="size-4" aria-hidden />
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="underline-offset-2 hover:underline"
          >
            export.csv
          </a>
          <span className="text-muted-foreground">
            · {TOTAL_ROWS.toLocaleString()} rows
          </span>
        </div>
      ) : null}
    </div>
  );
}
