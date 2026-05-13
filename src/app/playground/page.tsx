import type { Metadata } from "next";
import { PlaygroundContent } from "./PlaygroundContent";

export const metadata: Metadata = {
  title: "Playground — 32 Loading State Demos",
  description:
    "Interactive demos of skeleton screens, progress bars, shimmer loaders, typing indicators, streaming UI, optimistic flips — every loading pattern toggleable side-by-side.",
  alternates: { canonical: "/playground" },
  keywords: [
    "skeleton screen",
    "skeleton loader",
    "loading spinner",
    "progress bar",
    "loading animation",
    "shimmer loading",
    "typing indicator",
    "streaming response ui",
    "loading state examples",
    "loading screen design",
  ],
  openGraph: {
    title: "Playground — 32 Loading State Demos",
    description:
      "Interactive demos of skeleton screens, progress bars, shimmer loaders, typing indicators, streaming UI — every loading pattern toggleable side-by-side.",
    type: "website",
    url: "/playground",
    images: ["/opengraph-image"],
  },
};

export default function PlaygroundPage() {
  return <PlaygroundContent />;
}
