import type { DemoConfig } from "@/components/DemoRunner";

export const config: DemoConfig = {
  title: "Content-true skeleton",
  description:
    "Skeleton matches the *exact* dimensions of the final layout — same avatar size, same text-line widths, same spacing. Naive: simple block skeleton (generic boxes). Tuned: content-true blocks. The page already feels like itself before the data lands; the resolution is just resolution, not arrival. Static, no animation — the content-true shape is doing the work.",
  timeBand: "1 – 10 S",
  runMode: "manual",
};

export const TOTAL_DURATION_P50_MS = 2400;
