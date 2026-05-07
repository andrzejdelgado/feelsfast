import type { Metadata } from "next";
import { PlaygroundContent } from "./PlaygroundContent";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Every demo on the platform, organised by time band and filterable by Scenarios / Techniques / AI. The right perception cue depends on how long the wait is — instant feedback for sub-100 ms, indeterminate spinners for sub-second, skeletons and progress bars and shimmer for the engaged 1–10 s range, engagement and hand-off for past the 10-second wall.",
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
