import { ImageResponse } from "next/og";

/**
 * 180×180 PNG for iOS home-screen icons (Safari does not honour the
 * sibling `icon.svg` for `apple-touch-icon`, and Apple's icon shaders
 * round-mask the image, so we render onto an opaque background tile
 * rather than the transparent dot used in the browser favicon.
 *
 * Same brand register: Anthropic ivory tile, Claude-orange dot. The
 * inner dot scales with the 180 px tile so the proportions match the
 * 32 px favicon exactly.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f5",
        }}
      >
        <div
          style={{
            width: 135,
            height: 135,
            borderRadius: "50%",
            background: "#d97757",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
