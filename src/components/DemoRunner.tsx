"use client";

import { Play, RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type DemoConfig = {
  /** Title shown above the demo. */
  title: string;
  /** Short framing line under the title. Optional. */
  description?: string;
  /** Time-band tag rendered top-right (mono uppercase). e.g. `"1 – 10 S"`. */
  timeBand?: string;
};

type DemoRunnerProps = {
  config: DemoConfig;
  /** The naive ("Off") component — no skeleton, no prefetch, no smoothing. */
  Naive: React.ComponentType;
  /** The tuned ("On") component — applies the relevant perception patterns. */
  Tuned: React.ComponentType;
};

/**
 * DemoRunner — the canonical wrapper for every Scenario demo (PRD §8).
 *
 * Layout: side-by-side desktop, stacked mobile. Both panels are always
 * present, but the demo components themselves only mount when the user
 * clicks **Play**. Each Play press increments a `runId` so the
 * components remount and re-trigger their initial-load effects in
 * sync.
 *
 * Why no auto-play: if every visible demo started its timers on mount,
 * a single page (Scenario index → Pattern page → Playground with 17
 * demos) would have dozens of intervals running for waits the user is
 * not actually watching. Explicit Play makes the comparison
 * deliberate, makes the perception gap visible, and keeps the page
 * quiet until the user wants to look.
 */
export function DemoRunner({ config, Naive, Tuned }: DemoRunnerProps) {
  const [runId, setRunId] = useState(0);
  const headingId = useId();

  const hasPlayed = runId > 0;
  const play = () => setRunId((id) => id + 1);

  return (
    <section
      aria-labelledby={headingId}
      className="my-8 rounded-lg border border-border bg-card p-6"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={headingId} className="text-lg font-medium leading-tight">
            {config.title}
          </h3>
          {config.description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {config.description}
            </p>
          ) : null}
        </div>
        {config.timeBand ? (
          <span
            className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-primary"
            aria-label={`Time band: ${config.timeBand}`}
          >
            {config.timeBand}
          </span>
        ) : null}
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 rounded-md border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
        >
          {hasPlayed ? (
            <RotateCcw aria-hidden className="size-3.5" />
          ) : (
            <Play aria-hidden className="size-3.5" />
          )}
          <span>{hasPlayed ? "Replay" : "Play"}</span>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DemoSide label="Off">
          {hasPlayed ? <Naive key={`naive-${runId}`} /> : <PressPlay />}
        </DemoSide>
        <DemoSide label="On" highlighted>
          {hasPlayed ? <Tuned key={`tuned-${runId}`} /> : <PressPlay />}
        </DemoSide>
      </div>
    </section>
  );
}

function PressPlay() {
  return (
    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground/70">
      Press Play to run
    </p>
  );
}

function DemoSide({
  label,
  highlighted = false,
  children,
}: {
  label: "Off" | "On";
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-background p-4 transition-colors",
        highlighted ? "border-primary" : "border-border",
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.6875rem] font-medium uppercase tracking-wider",
          highlighted ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <div className="mt-3 min-h-[8rem]" aria-live="polite" aria-busy="false">
        {children}
      </div>
    </div>
  );
}
