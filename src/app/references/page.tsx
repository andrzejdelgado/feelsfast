import type { Metadata } from "next";
import { ReferencesContent } from "@/components/ReferencesContent";

export const metadata: Metadata = {
  title: "References — Loading State UX Research",
  description:
    "Peer-reviewed and industry sources behind every claim on feelsfast — response-time thresholds, progress-bar perception, time-perception research, and AI loading-state UX.",
  alternates: { canonical: "/references" },
  keywords: [
    "loading state research",
    "ux performance research",
    "perceived performance research",
    "response time thresholds",
    "progress bar perception",
  ],
  openGraph: {
    title: "References — Loading State UX Research",
    description:
      "Peer-reviewed and industry sources behind every claim on feelsfast: response-time thresholds, progress-bar perception, time perception, AI UX.",
    type: "website",
    url: "/references",
    images: ["/opengraph-image"],
  },
};

export default function ReferencesPage() {
  return <ReferencesContent />;
}
