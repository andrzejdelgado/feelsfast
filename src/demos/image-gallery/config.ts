import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Image gallery",
  description:
    "Six images load at varying rates. Naive: blank tiles until each finishes. Tuned: blurred LQIP placeholders resolve into the full image as it streams in.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TILE_COUNT = 6;
/** Each tile loads independently with gamma-jittered latency around this median. */
export const TILE_P50_MS = 2200;

/**
 * Six "photographs" rendered as CSS gradients. They are the same on both
 * sides — the only difference is how the *placeholder* is presented while
 * the high-res version is loading. This is enough to see the LQIP /
 * blur-up effect without shipping real binary assets.
 */
export const TILES = [
  {
    id: "1",
    label: "Sunset",
    gradient:
      "radial-gradient(ellipse at 30% 40%, #ffd07b 0%, #ff8a5c 40%, #c64657 80%)",
  },
  {
    id: "2",
    label: "Forest",
    gradient:
      "linear-gradient(135deg, #1f4d2c 0%, #3a7a47 45%, #b3c97a 100%)",
  },
  {
    id: "3",
    label: "Ocean",
    gradient:
      "linear-gradient(180deg, #6fb3d2 0%, #2a6f97 60%, #013a63 100%)",
  },
  {
    id: "4",
    label: "Desert",
    gradient:
      "radial-gradient(ellipse at 60% 70%, #f6c989 0%, #d99c5a 50%, #8a4f1e 100%)",
  },
  {
    id: "5",
    label: "Snow",
    gradient:
      "linear-gradient(160deg, #e0eaf1 0%, #b6c5d6 55%, #6c8aa8 100%)",
  },
  {
    id: "6",
    label: "Bloom",
    gradient:
      "radial-gradient(circle at 40% 60%, #f7c1c4 0%, #d96c8a 55%, #6e2945 100%)",
  },
] as const;
