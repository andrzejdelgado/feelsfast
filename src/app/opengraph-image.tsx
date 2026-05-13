import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "feelsfast — perceived performance demos and loading patterns";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Runtime Open Graph image for the homepage. Generated at the edge via
 * Next 16's `ImageResponse`. Solid Anthropic ivory background, brand
 * type sample, primary-coloured wordmark — readable at thumbnail size
 * for X / LinkedIn / Slack previews and at full size when expanded.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #faf9f5 0%, #f0eee6 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#141413",
          padding: "80px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.02em" }}>
            feelsfast
          </span>
          <span style={{ fontSize: 22, color: "#5e5d59", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            .fyi
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 28,
              color: "#d97757",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Perceived Performance
          </span>
          <span
            style={{
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
            }}
          >
            Make loading states feel fast.
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#5e5d59",
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Interactive demos of skeleton screens, progress bars, streaming
            responses, and the patterns that bend how time feels.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: "#5e5d59", fontSize: 20 }}>
          <span>32 demos · 10 essays · 1 installable AI skill</span>
          <span style={{ color: "#d97757" }}>feelsfast.fyi</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
