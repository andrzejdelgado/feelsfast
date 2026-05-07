import type { Metadata } from "next";
import { DemoRunner } from "@/components/DemoRunner";

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

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Every demo on the platform, in one place. Toggle the perception layer on each card and see what changes — list fetch, search-as-you-type, AI streaming, file upload, optimistic actions, image gallery, data export, inline completion, real-time updates, drag-and-drop, map pan, agent tool execution, agentic workflow.",
};

const demos = [
  { config: listFetchConfig, Naive: NaiveListFetch, Tuned: TunedListFetch },
  {
    config: searchConfig,
    Naive: NaiveSearchAsYouType,
    Tuned: TunedSearchAsYouType,
  },
  {
    config: aiStreamingConfig,
    Naive: NaiveAIStreaming,
    Tuned: TunedAIStreaming,
  },
  { config: fileUploadConfig, Naive: NaiveFileUpload, Tuned: TunedFileUpload },
  {
    config: optimisticActionsConfig,
    Naive: NaiveOptimisticActions,
    Tuned: TunedOptimisticActions,
  },
  {
    config: imageGalleryConfig,
    Naive: NaiveImageGallery,
    Tuned: TunedImageGallery,
  },
  { config: dataExportConfig, Naive: NaiveDataExport, Tuned: TunedDataExport },
  {
    config: inlineCompletionConfig,
    Naive: NaiveInlineCompletion,
    Tuned: TunedInlineCompletion,
  },
  {
    config: realTimeUpdatesConfig,
    Naive: NaiveRealTimeUpdates,
    Tuned: TunedRealTimeUpdates,
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
    config: toolExecutionConfig,
    Naive: NaiveAiToolExecution,
    Tuned: TunedAiToolExecution,
  },
  {
    config: agenticConfig,
    Naive: NaiveAiAgenticWorkflow,
    Tuned: TunedAiAgenticWorkflow,
  },
];

export default function PlaygroundPage() {
  return (
    <article className="mx-auto max-w-4xl px-8 py-12 lg:px-12 xl:px-16">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {demos.length} demos · sandbox
      </p>
      <h1 className="mt-2 text-4xl font-medium leading-tight tracking-tight">
        Playground
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Every demo on the platform, in one scrollable page. Toggle the perception
        layer on each card and watch what changes — same gamma-distributed latency on
        both sides, replay re-runs both at once.
      </p>

      <div className="mt-10 space-y-6">
        {demos.map(({ config, Naive, Tuned }) => (
          <DemoRunner key={config.title} config={config} Naive={Naive} Tuned={Tuned} />
        ))}
      </div>
    </article>
  );
}
