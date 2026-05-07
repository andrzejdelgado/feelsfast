"use client";

import { Play, RefreshCw } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type DemoConfig = {
  /** Title shown above the demo. */
  title: string;
  /** Short framing line under the title. Optional. */
  description?: string;
  /** Time-band tag rendered top-right (mono uppercase). e.g. `"1 – 10 S"`. */
  timeBand?: string;
  /**
   * "auto"   — demos render and run as soon as the card mounts (default).
   * "manual" — demos sit idle until the visitor presses Run; both Off and
   *             On then mount in lock-step, share one seed, and finish
   *             together. Reset returns the card to idle.
   */
  runMode?: "auto" | "manual";
};

/**
 * Both Off and On sides of every demo receive the same `seed` on each
 * run. Pair this with `seededGamma(seed, p50)` from `lib/jitter` inside
 * the demo so both sides finish at the same wall-clock moment — the
 * difference between Off and On should be in *how* the wait fills, not
 * in *how long* the wait is.
 *
 * Demos that intentionally show a timing difference (mousedown vs
 * click, optimistic flips, top-edge progress bar's 100 % overshoot)
 * can ignore the seed and roll their own randomness as before.
 */
export type DemoSideProps = { seed?: number };

type DemoRunnerProps = {
  config: DemoConfig;
  /** The naive ("Off") component — no skeleton, no prefetch, no smoothing. */
  Naive: React.ComponentType<DemoSideProps>;
  /** The tuned ("On") component — applies the relevant perception patterns. */
  Tuned: React.ComponentType<DemoSideProps>;
};

const newSeed = () => Math.floor(Math.random() * 0xffffffff);

/**
 * DemoRunner — the canonical wrapper for every Scenario demo (PRD §8).
 *
 * Two run modes:
 *
 *   "auto" (default)
 *     Both panels mount as soon as the card lands and run their
 *     animations through. Reset re-rolls the seed and remounts both
 *     sides; the demo plays again.
 *
 *   "manual"
 *     Both panels start in an idle state. A primary "Run" button on
 *     the far left mounts both sides simultaneously with a fresh
 *     seed — the same seed for both, so they finish together. Reset
 *     unmounts and returns to idle. Use this for demos where the
 *     animation is short or where the visitor benefits from
 *     deciding when to watch.
 *
 * Buttons:
 *   - Run   (left, primary)  — manual mode only, before/after a run
 *   - Reset (right)          — always shown; restarts (auto) or
 *                               un-runs (manual)
 *
 * Accessibility: ARIA live regions on each side, keyboard-operable
 * controls, motion-reduce honoured by child demos.
 */
export function DemoRunner({ config, Naive, Tuned }: DemoRunnerProps) {
  const isManual = config.runMode === "manual";
  const [runId, setRunId] = useState(isManual ? 0 : 1);
  const [seed, setSeed] = useState(newSeed);
  const headingId = useId();

  const isRunning = runId > 0;

  const start = () => {
    setSeed(newSeed());
    setRunId((id) => id + 1);
  };

  const reset = () => {
    if (isManual) {
      setRunId(0);
    } else {
      setSeed(newSeed());
      setRunId((id) => id + 1);
    }
  };

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
        {isManual ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
          >
            <Play aria-hidden className="size-3.5" />
            Run
          </button>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
        >
          <RefreshCw aria-hidden className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DemoSide label="Off">
          {isRunning ? (
            <Naive key={`naive-${runId}`} seed={seed} />
          ) : (
            <IdlePlaceholder />
          )}
        </DemoSide>
        <DemoSide label="On" highlighted>
          {isRunning ? (
            <Tuned key={`tuned-${runId}`} seed={seed} />
          ) : (
            <IdlePlaceholder />
          )}
        </DemoSide>
      </div>
    </section>
  );
}

function IdlePlaceholder() {
  return (
    <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground/70">
      Press Run to start
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
