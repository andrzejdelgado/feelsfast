"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DemoRunner, type DemoConfig } from "@/components/DemoRunner";
import { cn } from "@/lib/utils";
import { demoContext } from "@/lib/relations";

import { config as listFetchConfig } from "@/demos/list-fetch/config";
import { NaiveListFetch } from "@/demos/list-fetch/naive";
import { TunedListFetch } from "@/demos/list-fetch/tuned";

import { config as aiStreamingConfig } from "@/demos/ai-streaming/config";
import { NaiveAIStreaming } from "@/demos/ai-streaming/naive";
import { TunedAIStreaming } from "@/demos/ai-streaming/tuned";

import { config as fileUploadConfig } from "@/demos/file-upload/config";
import { NaiveFileUpload } from "@/demos/file-upload/naive";
import { TunedFileUpload } from "@/demos/file-upload/tuned";

import { config as optimisticActionsConfig } from "@/demos/optimistic-actions/config";
import { NaiveOptimisticActions } from "@/demos/optimistic-actions/naive";
import { TunedOptimisticActions } from "@/demos/optimistic-actions/tuned";

import { config as imageGalleryConfig } from "@/demos/image-gallery/config";
import { NaiveImageGallery } from "@/demos/image-gallery/naive";
import { TunedImageGallery } from "@/demos/image-gallery/tuned";

import { config as dataExportConfig } from "@/demos/data-export/config";
import { NaiveDataExport } from "@/demos/data-export/naive";
import { TunedDataExport } from "@/demos/data-export/tuned";

import { config as realTimeUpdatesConfig } from "@/demos/real-time-updates/config";
import { NaiveRealTimeUpdates } from "@/demos/real-time-updates/naive";
import { TunedRealTimeUpdates } from "@/demos/real-time-updates/tuned";

import { MapInteractionsCard } from "@/components/MapInteractionsCard";

import { config as toolExecutionConfig } from "@/demos/ai-tool-execution/config";
import { NaiveAiToolExecution } from "@/demos/ai-tool-execution/naive";
import { TunedAiToolExecution } from "@/demos/ai-tool-execution/tuned";

import { config as agenticConfig } from "@/demos/ai-agentic-workflow/config";
import { NaiveAiAgenticWorkflow } from "@/demos/ai-agentic-workflow/naive";
import { TunedAiAgenticWorkflow } from "@/demos/ai-agentic-workflow/tuned";

import { config as topBarConfig } from "@/demos/technique-top-bar/config";
import { NaiveTopBar } from "@/demos/technique-top-bar/naive";
import { TunedTopBar } from "@/demos/technique-top-bar/tuned";

import { config as shimmerSkeletonConfig } from "@/demos/technique-shimmer-skeleton/config";
import { NaiveShimmerSkeleton } from "@/demos/technique-shimmer-skeleton/naive";
import { TunedShimmerSkeleton } from "@/demos/technique-shimmer-skeleton/tuned";

import { config as imageColorConfig } from "@/demos/technique-image-color/config";
import { NaiveImageColor } from "@/demos/technique-image-color/naive";
import { TunedImageColor } from "@/demos/technique-image-color/tuned";

import { config as thinkingGradientConfig } from "@/demos/technique-thinking-gradient/config";
import { NaiveThinkingGradient } from "@/demos/technique-thinking-gradient/naive";
import { TunedThinkingGradient } from "@/demos/technique-thinking-gradient/tuned";

import { config as mousedownConfig } from "@/demos/technique-mousedown/config";
import { NaiveMousedown } from "@/demos/technique-mousedown/naive";
import { TunedMousedown } from "@/demos/technique-mousedown/tuned";

import { config as iconFlipConfig } from "@/demos/technique-icon-flip/config";
import { NaiveIconFlip } from "@/demos/technique-icon-flip/naive";
import { TunedIconFlip } from "@/demos/technique-icon-flip/tuned";

import { config as trickleBarConfig } from "@/demos/technique-trickle-bar/config";
import { NaiveTrickleBar } from "@/demos/technique-trickle-bar/naive";
import { TunedTrickleBar } from "@/demos/technique-trickle-bar/tuned";

import { config as marqueeBarConfig } from "@/demos/technique-marquee-bar/config";
import { NaiveMarqueeBar } from "@/demos/technique-marquee-bar/naive";
import { TunedMarqueeBar } from "@/demos/technique-marquee-bar/tuned";

import { config as threeDotConfig } from "@/demos/technique-three-dot-bounce/config";
import { NaiveThreeDotBounce } from "@/demos/technique-three-dot-bounce/naive";
import { TunedThreeDotBounce } from "@/demos/technique-three-dot-bounce/tuned";

import { config as pulsingOrbConfig } from "@/demos/technique-pulsing-orb/config";
import { NaivePulsingOrb } from "@/demos/technique-pulsing-orb/naive";
import { TunedPulsingOrb } from "@/demos/technique-pulsing-orb/tuned";

import { config as rotatingTipsConfig } from "@/demos/technique-rotating-tips/config";
import { NaiveRotatingTips } from "@/demos/technique-rotating-tips/naive";
import { TunedRotatingTips } from "@/demos/technique-rotating-tips/tuned";

import { config as brandedStoryConfig } from "@/demos/technique-branded-story/config";
import { NaiveBrandedStory } from "@/demos/technique-branded-story/naive";
import { TunedBrandedStory } from "@/demos/technique-branded-story/tuned";

import { config as miniGameConfig } from "@/demos/technique-mini-game/config";
import { NaiveMiniGame } from "@/demos/technique-mini-game/naive";
import { TunedMiniGame } from "@/demos/technique-mini-game/tuned";

import { config as notifyCompleteConfig } from "@/demos/technique-notify-complete/config";
import { NaiveNotifyComplete } from "@/demos/technique-notify-complete/naive";
import { TunedNotifyComplete } from "@/demos/technique-notify-complete/tuned";

import { config as skeletonSimpleConfig } from "@/demos/technique-skeleton-simple/config";
import { NaiveSkeletonSimple } from "@/demos/technique-skeleton-simple/naive";
import { TunedSkeletonSimple } from "@/demos/technique-skeleton-simple/tuned";

import { config as skeletonTrueConfig } from "@/demos/technique-skeleton-true/config";
import { NaiveSkeletonTrue } from "@/demos/technique-skeleton-true/naive";
import { TunedSkeletonTrue } from "@/demos/technique-skeleton-true/tuned";

import { config as skeletonPulseConfig } from "@/demos/technique-skeleton-pulse/config";
import { NaiveSkeletonPulse } from "@/demos/technique-skeleton-pulse/naive";
import { TunedSkeletonPulse } from "@/demos/technique-skeleton-pulse/tuned";

import { config as imageBrandConfig } from "@/demos/technique-image-brand/config";
import { NaiveImageBrand } from "@/demos/technique-image-brand/naive";
import { TunedImageBrand } from "@/demos/technique-image-brand/tuned";

import { config as spinnerConfig } from "@/demos/technique-spinner/config";
import { NaiveSpinner } from "@/demos/technique-spinner/naive";
import { TunedSpinner } from "@/demos/technique-spinner/tuned";

import { config as decelBarConfig } from "@/demos/technique-decel-bar/config";
import { NaiveDecelBar } from "@/demos/technique-decel-bar/naive";
import { TunedDecelBar } from "@/demos/technique-decel-bar/tuned";

import { config as counterConfig } from "@/demos/technique-counter/config";
import { NaiveCounter } from "@/demos/technique-counter/naive";
import { TunedCounter } from "@/demos/technique-counter/tuned";

import { config as skeletonRevealConfig } from "@/demos/technique-skeleton-reveal/config";
import { NaiveSkeletonReveal } from "@/demos/technique-skeleton-reveal/naive";
import { TunedSkeletonReveal } from "@/demos/technique-skeleton-reveal/tuned";

type BandId = "instant" | "responsive" | "engaged" | "long";
type FilterValue = "all" | BandId;

type DemoEntry =
  | {
      /** Folder name under src/demos/ — drives the cross-link lookup. */
      demoKey: string;
      config: DemoConfig;
      Naive: React.ComponentType<{ seed?: number }>;
      Tuned: React.ComponentType<{ seed?: number }>;
    }
  | {
      /** Used as the React `key` and as the demoKey for cross-link lookup. */
      key: string;
      Custom: React.ComponentType;
    };

type Band = {
  id: BandId;
  label: string;
  description: string;
  demos: DemoEntry[];
};

const bands: Band[] = [
  {
    id: "instant",
    label: "0–100 MS",
    description:
      "Instant input. The user has not started waiting yet. Patterns here give a head-start, not a status — pre-action feedback, optimistic flips, direct-manipulation latency budgets. Anything that announces a wait at this scale damages the experience.",
    demos: [
      { demoKey: "optimistic-actions", config: optimisticActionsConfig, Naive: NaiveOptimisticActions, Tuned: TunedOptimisticActions },
      { key: "map-interactions", Custom: MapInteractionsCard },
      { demoKey: "real-time-updates", config: realTimeUpdatesConfig, Naive: NaiveRealTimeUpdates, Tuned: TunedRealTimeUpdates },
      { demoKey: "technique-mousedown", config: mousedownConfig, Naive: NaiveMousedown, Tuned: TunedMousedown },
      { demoKey: "technique-icon-flip", config: iconFlipConfig, Naive: NaiveIconFlip, Tuned: TunedIconFlip },
    ],
  },
  {
    id: "responsive",
    label: "100 MS – 1 S",
    description:
      "Perceptible, but no determinate progress yet. Cues say \"active, working\" without claiming an end-point — indeterminate spinners, top-edge trickle bars, a brief pulse on the affected element.",
    demos: [
      { demoKey: "technique-spinner", config: spinnerConfig, Naive: NaiveSpinner, Tuned: TunedSpinner },
      { demoKey: "technique-trickle-bar", config: trickleBarConfig, Naive: NaiveTrickleBar, Tuned: TunedTrickleBar },
      { demoKey: "technique-marquee-bar", config: marqueeBarConfig, Naive: NaiveMarqueeBar, Tuned: TunedMarqueeBar },
      { demoKey: "technique-three-dot-bounce", config: threeDotConfig, Naive: NaiveThreeDotBounce, Tuned: TunedThreeDotBounce },
      { demoKey: "technique-pulsing-orb", config: pulsingOrbConfig, Naive: NaivePulsingOrb, Tuned: TunedPulsingOrb },
      { demoKey: "technique-counter", config: counterConfig, Naive: NaiveCounter, Tuned: TunedCounter },
    ],
  },
  {
    id: "engaged",
    label: "1 – 10 S",
    description:
      "The engaged wait. The user is consciously waiting on the result and most perception techniques live here — skeletons, progress bars, LQIPs, AI thinking cues, the Instagram-style top-edge gradient bar.",
    demos: [
      { demoKey: "list-fetch", config: listFetchConfig, Naive: NaiveListFetch, Tuned: TunedListFetch },
      { demoKey: "ai-streaming", config: aiStreamingConfig, Naive: NaiveAIStreaming, Tuned: TunedAIStreaming },
      { demoKey: "file-upload", config: fileUploadConfig, Naive: NaiveFileUpload, Tuned: TunedFileUpload },
      { demoKey: "image-gallery", config: imageGalleryConfig, Naive: NaiveImageGallery, Tuned: TunedImageGallery },
      { demoKey: "ai-tool-execution", config: toolExecutionConfig, Naive: NaiveAiToolExecution, Tuned: TunedAiToolExecution },
      { demoKey: "technique-top-bar", config: topBarConfig, Naive: NaiveTopBar, Tuned: TunedTopBar },
      { demoKey: "technique-skeleton-simple", config: skeletonSimpleConfig, Naive: NaiveSkeletonSimple, Tuned: TunedSkeletonSimple },
      { demoKey: "technique-skeleton-true", config: skeletonTrueConfig, Naive: NaiveSkeletonTrue, Tuned: TunedSkeletonTrue },
      { demoKey: "technique-shimmer-skeleton", config: shimmerSkeletonConfig, Naive: NaiveShimmerSkeleton, Tuned: TunedShimmerSkeleton },
      { demoKey: "technique-skeleton-pulse", config: skeletonPulseConfig, Naive: NaiveSkeletonPulse, Tuned: TunedSkeletonPulse },
      { demoKey: "technique-skeleton-reveal", config: skeletonRevealConfig, Naive: NaiveSkeletonReveal, Tuned: TunedSkeletonReveal },
      { demoKey: "technique-decel-bar", config: decelBarConfig, Naive: NaiveDecelBar, Tuned: TunedDecelBar },
      { demoKey: "technique-image-color", config: imageColorConfig, Naive: NaiveImageColor, Tuned: TunedImageColor },
      { demoKey: "technique-image-brand", config: imageBrandConfig, Naive: NaiveImageBrand, Tuned: TunedImageBrand },
      { demoKey: "technique-thinking-gradient", config: thinkingGradientConfig, Naive: NaiveThinkingGradient, Tuned: TunedThinkingGradient },
    ],
  },
  {
    id: "long",
    label: "10 S+",
    description:
      "Past the wall. The user's attention drifts; patterns here are about giving them something to do or freeing them entirely — engagement copy, branded sequences, foreground-to-background hand-offs.",
    demos: [
      { demoKey: "data-export", config: dataExportConfig, Naive: NaiveDataExport, Tuned: TunedDataExport },
      { demoKey: "ai-agentic-workflow", config: agenticConfig, Naive: NaiveAiAgenticWorkflow, Tuned: TunedAiAgenticWorkflow },
      { demoKey: "technique-rotating-tips", config: rotatingTipsConfig, Naive: NaiveRotatingTips, Tuned: TunedRotatingTips },
      { demoKey: "technique-branded-story", config: brandedStoryConfig, Naive: NaiveBrandedStory, Tuned: TunedBrandedStory },
      { demoKey: "technique-mini-game", config: miniGameConfig, Naive: NaiveMiniGame, Tuned: TunedMiniGame },
      { demoKey: "technique-notify-complete", config: notifyCompleteConfig, Naive: NaiveNotifyComplete, Tuned: TunedNotifyComplete },
    ],
  },
];

const totalDemos = bands.reduce((sum, b) => sum + b.demos.length, 0);

export function PlaygroundContent() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const visibleBands = useMemo(
    () => (filter === "all" ? bands : bands.filter((b) => b.id === filter)),
    [filter],
  );

  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {totalDemos} demos · 4 time bands
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>

      <div
        className="mt-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter demos by time band"
      >
        <FilterPill
          label="All"
          count={totalDemos}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        {bands.map((band) => (
          <FilterPill
            key={band.id}
            label={band.label}
            count={band.demos.length}
            active={filter === band.id}
            onClick={() => setFilter(band.id)}
          />
        ))}
      </div>

      <div className="mt-10">
        {visibleBands.map((band, i) => (
          <section
            key={band.id}
            aria-labelledby={`band-${band.id}`}
            className={i > 0 ? "mt-16" : ""}
          >
            <h2
              id={`band-${band.id}`}
              className="font-mono text-xs font-medium uppercase tracking-wider text-primary"
            >
              {band.label} · {band.demos.length}{" "}
              {band.demos.length === 1 ? "demo" : "demos"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {band.description}
            </p>

            <div className="mt-6 space-y-6">
              {band.demos.map((demo) => {
                const demoKey = "Custom" in demo ? demo.key : demo.demoKey;
                return (
                  <div key={demoKey}>
                    {"Custom" in demo ? (
                      <demo.Custom />
                    ) : (
                      <DemoRunner
                        config={demo.config}
                        Naive={demo.Naive}
                        Tuned={demo.Tuned}
                      />
                    )}
                    <AppearsInStrip demoKey={demoKey} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      <span>{label}</span>
      <span
        className={cn("tabular-nums", active ? "opacity-80" : "opacity-60")}
      >
        {count}
      </span>
    </button>
  );
}

/**
 * Cross-link strip that fixes the Playground-feels-orphaned problem.
 * Each demo card now declares which Scenario it lives inside and which
 * Pattern(s) it demonstrates, both as clickable chips.
 */
function AppearsInStrip({ demoKey }: { demoKey: string }) {
  const ctx = demoContext(demoKey);
  if (ctx.scenarios.length === 0 && ctx.patterns.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 px-1 text-xs">
      <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Appears in
      </span>
      {ctx.scenarios.map((s) => (
        <Link
          key={`s-${s.slug}`}
          href={`/scenarios/${s.slug}`}
          className="inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-wider opacity-70">
            Scenario
          </span>
          <span>{s.title}</span>
        </Link>
      ))}
      {ctx.patterns.map((p) => (
        <Link
          key={`p-${p.slug}`}
          href={`/patterns/${p.slug}`}
          className="inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <span className="mr-1 font-mono text-[0.6875rem] uppercase tracking-wider opacity-70">
            Pattern
          </span>
          <span>{p.title}</span>
        </Link>
      ))}
    </div>
  );
}
