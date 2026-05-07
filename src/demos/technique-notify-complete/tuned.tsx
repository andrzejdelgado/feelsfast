"use client";

import { Bell, Check, Loader2, Minimize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { seededGamma } from "@/lib/jitter";
import { TOTAL_DURATION_P50_MS } from "./config";

type Phase = "foreground" | "background" | "done";

/**
 * Tuned — a "Run in background" affordance moves the wait off the
 * foreground. The panel collapses to a small corner indicator and a
 * note inviting the user to switch tabs. When the work completes, a
 * primary-coloured toast slides in at the bottom of the panel and
 * persists until dismissed.
 *
 * The pattern is the foreground-to-background hand-off PRD §4
 * specifies for waits past the 10-second wall: the user reclaims
 * their attention; the result still arrives loudly enough that
 * coming back to it is not an act of remembering.
 */
export function TunedNotifyComplete({ seed = 1 }: { seed?: number }) {
  const [phase, setPhase] = useState<Phase>("foreground");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      seededGamma(seed, TOTAL_DURATION_P50_MS),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const sendToBackground = () => {
    if (phase === "foreground") setPhase("background");
  };

  return (
    <div className="relative">
      {/* Foreground state — large spinner panel + a "Run in background" CTA. */}
      {phase === "foreground" ? (
        <div className="grid min-h-[10rem] place-items-center rounded-md border border-border bg-background p-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2
                aria-hidden
                className="size-4 animate-spin motion-reduce:animate-none"
              />
              <span>Generating report…</span>
            </div>
            <button
              type="button"
              onClick={sendToBackground}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Minimize2 aria-hidden className="size-3" />
              Run in background
            </button>
          </div>
        </div>
      ) : null}

      {/* Background state — collapsed panel + small corner pill. The
          surrounding layout could go on living its life. */}
      {phase === "background" ? (
        <div className="relative grid min-h-[10rem] place-items-center rounded-md border border-dashed border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">
            Switch tabs if you want — we&apos;ll notify you when the report
            lands.
          </p>
          <div className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
            <Loader2
              aria-hidden
              className="size-3 animate-spin motion-reduce:animate-none"
            />
            Running
          </div>
        </div>
      ) : null}

      {/* Done state — empty panel + primary toast at the bottom. */}
      {phase === "done" ? (
        <div className="relative">
          <div className="grid min-h-[10rem] place-items-center rounded-md border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">
              Report ready — see toast.
            </p>
          </div>
          <Toast />
        </div>
      ) : null}
    </div>
  );
}

function Toast() {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-xs text-primary shadow-sm",
        "motion-safe:animate-[toast-rise_280ms_ease-out]",
      )}
    >
      <Check aria-hidden className="size-3.5" />
      <span className="font-medium">Report ready</span>
      <Bell aria-hidden className="size-3 opacity-60" />
      <style>{`
        @keyframes toast-rise {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
