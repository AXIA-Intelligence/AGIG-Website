import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FRAUNCES } from "../theme";
import { Reveal } from "../components/motion";

// 0:00 - 0:08 (240 frames). THE HOOK.
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  // Black-to-navy fade in over the first second.
  const navy = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Hold, then fade the whole scene out at the end.
  const out = interpolate(frame, [210, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <AbsoluteFill style={{ backgroundColor: COLORS.navy, opacity: navy }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 260px",
          opacity: out,
        }}
      >
        <Reveal delay={36} duration={30} y={26}>
          <div
            style={{
              fontFamily: FRAUNCES,
              fontWeight: 400,
              color: COLORS.white,
              fontSize: 62,
              lineHeight: 1.32,
              letterSpacing: 0.5,
              textAlign: "center",
              maxWidth: 1280,
            }}
          >
            The most important decisions are rarely blocked by a lack of data.
          </div>
        </Reveal>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
