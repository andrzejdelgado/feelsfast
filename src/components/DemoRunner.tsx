"use client";

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

/**
 * Both Off and On sides of every demo receive the same `seed` on each
 * Replay. Pair this with `seededGamma(seed, p50)` from `lib/jitter`
 * inside the demo so both sides finish at the same wall-clock moment
 * — the difference between Off and On should be in *how* the wait
 * fills, not in *how long* the wait is.
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
 * Layout: side-by-side desktop, stacked mobile. Both panels are always
 * visible; the Replay button re-runs both simultaneously by:
 *   1. Rolling a fresh seed.
 *   2. Bumping `runId` to force a remount of both children.
 *   3. Passing the same seed to both Naive and Tuned via prop.
 *
 * Demos that opt in to seeded timing (`seededGamma(seed, p50)`) get
 * identical wall-clock durations on both sides — same Replay, same
 * total wait, different visual fill.
 *
 * Accessibility: ARIA live regions on each side, keyboard-operable
 * Replay, motion-reduce honoured by child demos.
 */
export function DemoRunner({ config, Naive, Tuned }: DemoRunnerProps) {
  const [runId, setRunId] = useState(0);
  const [seed, setSeed] = useState(newSeed);
  const headingId = useId();

  const replay = () => {
    setSeed(newSeed());
    setRunId((id) => id + 1);
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

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={replay}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
        >
          Replay
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DemoSide label="Off">
          <Naive key={`naive-${runId}`} seed={seed} />
        </DemoSide>
        <DemoSide label="On" highlighted>
          <Tuned key={`tuned-${runId}`} seed={seed} />
        </DemoSide>
      </div>
    </section>
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
