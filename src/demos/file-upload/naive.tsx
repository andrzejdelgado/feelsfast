"use client";

import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { seededGamma } from "@/lib/jitter";
import { FILE, TOTAL_DURATION_P50_MS } from "./config";

export function NaiveFileUpload({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<"idle" | "uploading" | "done">("idle");

  const upload = async () => {
    setPhase("uploading");
    await new Promise((resolve) =>
      setTimeout(resolve, seededGamma(seed, TOTAL_DURATION_P50_MS)),
    );
    setPhase("done");
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={upload}
        disabled={phase === "uploading"}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Upload className="size-4" aria-hidden />
        {phase === "idle"
          ? "Upload file"
          : phase === "uploading"
            ? "Uploading…"
            : "Uploaded"}
      </button>

      {phase === "uploading" ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2
            aria-hidden
            className="size-4 animate-spin motion-reduce:animate-none"
          />
          <span>Uploading…</span>
        </div>
      ) : null}

      {phase === "done" ? (
        <p className="text-sm">{FILE.name} uploaded.</p>
      ) : null}
    </div>
  );
}
