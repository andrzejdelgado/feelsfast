"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gammaJitter } from "@/lib/jitter";
import { FRAMES, TOTAL_DURATION_P50_MS } from "./config";

type Frame = (typeof FRAMES)[number]["render"];

/**
 * Tuned — a four-frame branded story paced over the wait. Each frame
 * cross-fades into the next at the timestamps declared in `FRAMES`,
 * so the wait reads as the app composing itself: wordmark → tagline
 * → skeleton → near-ready → real content.
 *
 * The mechanism is the same as Slack's cold-boot: replace dead time
 * with brand presence + structure. The app is not actually doing
 * anything different; the user experiences the wait differently.
 */
export function TunedBrandedStory() {
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [frame, setFrame] = useState<Frame>(FRAMES[0].render);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setPhase("done"),
      gammaJitter(TOTAL_DURATION_P50_MS),
    );
    frameTimers.current = FRAMES.slice(1).map((f) =>
      setTimeout(() => setFrame(f.render), f.at),
    );
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      frameTimers.current.forEach(clearTimeout);
    };
  }, []);

  if (phase === "done") {
    return (
      <div className="grid min-h-[10rem] place-items-center">
        <p className="text-sm text-foreground">Ready.</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-[10rem] place-items-center overflow-hidden rounded-md border border-border bg-background p-4">
      <FrameView frame={frame} />
    </div>
  );
}

function FrameView({ frame }: { frame: Frame }) {
  return (
    <div
      key={frame}
      className="flex w-full flex-col items-center gap-3 text-center motion-safe:animate-[story-fade_400ms_ease-out]"
    >
      <style>{`
        @keyframes story-fade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {frame === "wordmark" ? (
        <>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-medium tracking-tight text-foreground">
              feelsfast
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              .fyi
            </span>
          </div>
        </>
      ) : null}

      {frame === "tagline" ? (
        <>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-medium tracking-tight text-foreground">
              feelsfast
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              .fyi
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Engineer experiences that feel fast.
          </p>
        </>
      ) : null}

      {frame === "skeleton" ? (
        <div className="w-full max-w-[12rem] space-y-2">
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-2.5 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
          <div className="h-2.5 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
        </div>
      ) : null}

      {frame === "ready" ? (
        <div className="w-full max-w-[12rem] space-y-2">
          <p className="text-xs font-medium text-foreground">Almost there…</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full w-[92%] rounded-full bg-primary",
                "motion-reduce:animate-none",
              )}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
