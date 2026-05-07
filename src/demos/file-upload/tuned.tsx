"use client";

import { Check, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gammaJitter } from "@/lib/jitter";
import { FILE, TOTAL_DURATION_P50_MS } from "./config";

type Phase = "idle" | "uploading" | "done";

export function TunedFileUpload() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const upload = () => {
    const total = gammaJitter(TOTAL_DURATION_P50_MS);
    setPhase("uploading");
    setProgress(0);
    const start = performance.now();
    intervalRef.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const ratio = Math.min(1, elapsed / total);
      setProgress(ratio);
      if (ratio >= 1 && intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setPhase("done");
      }
    }, 50);
  };

  const showFile = phase !== "idle";
  const percent = Math.round(progress * 100);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={upload}
        disabled={phase === "uploading"}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload className="size-4" aria-hidden />
        {phase === "idle"
          ? "Upload file"
          : phase === "uploading"
            ? "Uploading…"
            : "Uploaded"}
      </button>

      {showFile ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{FILE.name}</span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              {(FILE.size / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>

          {phase === "uploading" ? (
            <div
              role="progressbar"
              aria-label={`Uploading ${FILE.name}`}
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
          ) : (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Check className="size-4" aria-hidden />
              <span>Upload complete</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
