"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DemoRunner, type DemoConfig } from "@/components/DemoRunner";
import { SwipeableRow } from "@/components/SwipeableRow";
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
      Custom: React.ComponentType<{ footer?: React.ReactNode }>;
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
      "Instant input. The user has not started waiting yet. Anything that announces a wait at this scale damages the experience.",
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
      "Cues say \"active, working\" without claiming an end-point, like indeterminate spinners, progress bars, a brief pulse or bounce.",
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
      { demoKey: "ai-tool-execution", config: toolExecutionConfig, Naive: NaiveAiToolExecution, Tuned: TunedAiToolExecution },
      { demoKey: "technique-top-bar", config: topBarConfig, Naive: NaiveTopBar, Tuned: TunedTopBar },
      { demoKey: "technique-skeleton-simple", config: skeletonSimpleConfig, Naive: NaiveSkeletonSimple, Tuned: TunedSkeletonSimple },
      { demoKey: "technique-skeleton-true", config: skeletonTrueConfig, Naive: NaiveSkeletonTrue, Tuned: TunedSkeletonTrue },
      { demoKey: "technique-shimmer-skeleton", config: shimmerSkeletonConfig, Naive: NaiveShimmerSkeleton, Tuned: TunedShimmerSkeleton },
      { demoKey: "technique-skeleton-pulse", config: skeletonPulseConfig, Naive: NaiveSkeletonPulse, Tuned: TunedSkeletonPulse },
      { demoKey: "technique-skeleton-reveal", config: skeletonRevealConfig, Naive: NaiveSkeletonReveal, Tuned: TunedSkeletonReveal },
      { demoKey: "technique-decel-bar", config: decelBarConfig, Naive: NaiveDecelBar, Tuned: TunedDecelBar },
      { demoKey: "image-gallery", config: imageGalleryConfig, Naive: NaiveImageGallery, Tuned: TunedImageGallery },
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
    <article className="py-12">
      <header className="mx-auto max-w-4xl px-8 lg:px-12 xl:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {totalDemos} demos
        </p>
        <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
          Playground
        </h1>
      </header>

      <div className="sticky top-14 z-10 mt-6 border-b border-border bg-background/95 backdrop-blur md:top-0">
        <SwipeableRow
          wrapAt="md"
          role="group"
          ariaLabel="Filter demos by time band"
          className="mx-auto max-w-4xl px-8 py-4 lg:px-12 xl:px-16"
        >
          <FilterPill
            label="All"
            active={filter === "all"}
            onClick={() => {
              setFilter("all");
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: "smooth" }),
                0,
              );
            }}
          />
          {bands.map((band) => (
            <FilterPill
              key={band.id}
              label={band.label}
              active={filter === band.id}
              onClick={() => {
                setFilter(band.id);
                setTimeout(() => {
                  document
                    .getElementById(`band-${band.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 0);
              }}
            />
          ))}
        </SwipeableRow>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-12 px-8 lg:px-12 xl:px-16">
        {visibleBands.map((band) => (
          <section key={band.id} aria-labelledby={`band-${band.id}`}>
            <h2
              id={`band-${band.id}`}
              className="scroll-mt-24 font-mono text-xs font-medium uppercase tracking-wider text-primary"
            >
              {band.label} · {band.demos.length}{" "}
              {band.demos.length === 1 ? "demo" : "demos"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {band.description}
            </p>

            <div className="mt-8 space-y-14">
              {band.demos.map((demo) => {
                const demoKey = "Custom" in demo ? demo.key : demo.demoKey;
                const ctx = demoContext(demoKey);
                const footer =
                  ctx.scenarios.length > 0 ? (
                    <AppearsInStrip demoKey={demoKey} />
                  ) : null;
                return (
                  <div key={demoKey}>
                    {"Custom" in demo ? (
                      <demo.Custom footer={footer} />
                    ) : (
                      <DemoRunner
                        config={demo.config}
                        Naive={demo.Naive}
                        Tuned={demo.Tuned}
                        footer={footer}
                      />
                    )}
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
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

/**
 * Cross-link strip that points each demo back into the scenarios it
 * appears in. Pattern chips removed when the Patterns section was
 * dismantled; the scenario chip is sufficient to back-pointer into the
 * prose.
 */
function AppearsInStrip({ demoKey }: { demoKey: string }) {
  const ctx = demoContext(demoKey);
  if (ctx.scenarios.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-muted-foreground">
        Appears in
      </span>
      {ctx.scenarios.map((s) => (
        <Link
          key={`s-${s.slug}`}
          href={`/scenarios/${s.slug}`}
          className="inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {s.title}
        </Link>
      ))}
    </div>
  );
}
