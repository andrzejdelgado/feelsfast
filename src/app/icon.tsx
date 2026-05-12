import { ImageResponse } from "next/og";

/**
 * 32×32 PNG fallback favicon for browsers that don't render SVG icons
 * (Safari < 16.4, very old Firefox). Modern browsers pick the
 * sibling `icon.svg` and ignore this. Same orange-dot design — single
 * Claude-orange circle on transparent background.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#d97757",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
