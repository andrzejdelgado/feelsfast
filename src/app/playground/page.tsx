import type { Metadata } from "next";
import { DemoRunner, type DemoConfig } from "@/components/DemoRunner";

import { config as listFetchConfig } from "@/demos/list-fetch/config";
import { NaiveListFetch } from "@/demos/list-fetch/naive";
import { TunedListFetch } from "@/demos/list-fetch/tuned";

import { config as searchConfig } from "@/demos/search-as-you-type/config";
import { NaiveSearchAsYouType } from "@/demos/search-as-you-type/naive";
import { TunedSearchAsYouType } from "@/demos/search-as-you-type/tuned";

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

import { config as inlineCompletionConfig } from "@/demos/ai-inline-completion/config";
import { NaiveInlineCompletion } from "@/demos/ai-inline-completion/naive";
import { TunedInlineCompletion } from "@/demos/ai-inline-completion/tuned";

import { config as realTimeUpdatesConfig } from "@/demos/real-time-updates/config";
import { NaiveRealTimeUpdates } from "@/demos/real-time-updates/naive";
import { TunedRealTimeUpdates } from "@/demos/real-time-updates/tuned";

import { config as dragAndDropConfig } from "@/demos/drag-and-drop/config";
import { NaiveDragAndDrop } from "@/demos/drag-and-drop/naive";
import { TunedDragAndDrop } from "@/demos/drag-and-drop/tuned";

import { config as mapInteractionsConfig } from "@/demos/map-interactions/config";
import { NaiveMapInteractions } from "@/demos/map-interactions/naive";
import { TunedMapInteractions } from "@/demos/map-interactions/tuned";

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

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Every demo on the platform, organised by time band. The right perception cue depends on how long the wait is — instant feedback for sub-100 ms, indeterminate spinners for sub-second, skeletons and progress bars and shimmer for the engaged 1–10 s range, engagement and hand-off for past the 10-second wall. Toggle the perception layer on each card.",
};

type DemoEntry = {
  config: DemoConfig;
  Naive: React.ComponentType;
  Tuned: React.ComponentType;
};

type Band = {
  id: string;
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
      {
        config: searchConfig,
        Naive: NaiveSearchAsYouType,
        Tuned: TunedSearchAsYouType,
      },
      {
        config: optimisticActionsConfig,
        Naive: NaiveOptimisticActions,
        Tuned: TunedOptimisticActions,
      },
      {
        config: dragAndDropConfig,
        Naive: NaiveDragAndDrop,
        Tuned: TunedDragAndDrop,
      },
      {
        config: mapInteractionsConfig,
        Naive: NaiveMapInteractions,
        Tuned: TunedMapInteractions,
      },
      {
        config: realTimeUpdatesConfig,
        Naive: NaiveRealTimeUpdates,
        Tuned: TunedRealTimeUpdates,
      },
    ],
  },
  {
    id: "responsive",
    label: "100 MS – 1 S",
    description:
      "Perceptible, but no determinate progress yet. Cues say \"active, working\" without claiming an end-point — indeterminate spinners, top-edge trickle bars, a brief pulse on the affected element.",
    demos: [
      {
        config: inlineCompletionConfig,
        Naive: NaiveInlineCompletion,
        Tuned: TunedInlineCompletion,
      },
    ],
  },
  {
    id: "engaged",
    label: "1 – 10 S",
    description:
      "The engaged wait. The user is consciously waiting on the result and most perception techniques live here — skeletons, progress bars, LQIPs, AI thinking cues, the Instagram-style top-edge gradient bar.",
    demos: [
      { config: listFetchConfig, Naive: NaiveListFetch, Tuned: TunedListFetch },
      {
        config: aiStreamingConfig,
        Naive: NaiveAIStreaming,
        Tuned: TunedAIStreaming,
      },
      {
        config: fileUploadConfig,
        Naive: NaiveFileUpload,
        Tuned: TunedFileUpload,
      },
      {
        config: imageGalleryConfig,
        Naive: NaiveImageGallery,
        Tuned: TunedImageGallery,
      },
      {
        config: toolExecutionConfig,
        Naive: NaiveAiToolExecution,
        Tuned: TunedAiToolExecution,
      },
      { config: topBarConfig, Naive: NaiveTopBar, Tuned: TunedTopBar },
      {
        config: shimmerSkeletonConfig,
        Naive: NaiveShimmerSkeleton,
        Tuned: TunedShimmerSkeleton,
      },
      {
        config: imageColorConfig,
        Naive: NaiveImageColor,
        Tuned: TunedImageColor,
      },
      {
        config: thinkingGradientConfig,
        Naive: NaiveThinkingGradient,
        Tuned: TunedThinkingGradient,
      },
    ],
  },
  {
    id: "long",
    label: "10 S+",
    description:
      "Past the wall. The user's attention drifts; patterns here are about giving them something to do or freeing them entirely — engagement copy, branded sequences, foreground-to-background hand-offs.",
    demos: [
      {
        config: dataExportConfig,
        Naive: NaiveDataExport,
        Tuned: TunedDataExport,
      },
      {
        config: agenticConfig,
        Naive: NaiveAiAgenticWorkflow,
        Tuned: TunedAiAgenticWorkflow,
      },
    ],
  },
];

const totalDemos = bands.reduce((sum, b) => sum + b.demos.length, 0);

export default function PlaygroundPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {totalDemos} demos · 4 time bands
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Every demo on the platform, organised by the time band of the wait it
        addresses. The right perception cue depends on how long the user is
        actually waiting — toggle each card to see what changes.
      </p>

      <div className="mt-12">
        {bands.map((band, i) => (
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
              {band.demos.map(({ config, Naive, Tuned }) => (
                <DemoRunner
                  key={config.title}
                  config={config}
                  Naive={Naive}
                  Tuned={Tuned}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
