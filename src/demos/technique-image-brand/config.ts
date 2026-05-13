import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Branded image skeleton",
  description:
    "Same 6-image gallery, no dominant-color data available. Naive: blank tiles until each file lands. Tuned: each tile ships with the brand monogram centred on a neutral surface from frame zero. When the image arrives, it crossfades over the monogram. The slot reads as \"image is on its way from this brand\" rather than \"image is missing\". Useful when no per-image LQIP exists — cold cache, new content, third-party images.",
  timeBand: "1 – 10 S",
  runMode: "manual",
  // Match the other two image-grid demos so the band reads as one
  // coherent set of variants on the same underlying gallery.
  panelMinHeight: "min-h-[149px] md:min-h-[214px] lg:min-h-[219px]",
};

/** Per-tile median load time (gamma-jittered, seeded). */
export const TILE_P50_MS = 2200;

/**
 * Six "photographs" rendered as CSS gradients — identical to the
 * Predominant-color and Blurred-image variants so the three demos sit
 * side-by-side as variations on the same gallery. Here the
 * placeholder strategy is the brand monogram, not a per-image colour.
 */
export const TILES = [
  {
    id: "1",
    label: "Sunset",
    gradient:
      "radial-gradient(ellipse at 30% 35%, #ffd07b 0%, #ff8a5c 38%, #c64657 78%)",
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
