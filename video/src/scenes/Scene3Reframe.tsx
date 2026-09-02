import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FRAUNCES } from "../theme";
import { Reveal, Scene } from "../components/motion";
import { Fragments } from "../components/Fragments";

// 0:20 - 0:32 (360 frames). THE REFRAME.
export const Scene3Reframe: React.FC = () => {
  const frame = useCurrentFrame();
  // Fragments animate from scattered (0) into ordered structure (1).
  const t = interpolate(frame, [40, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <Scene durationInFrames={360}>
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {/* diagram sits behind, upper area */}
        <div
          style={{
            position: "absolute",
            top: 90,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            opacity: 0.95,
          }}
        >
          <Fragments t={t} width={440} />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 120,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "0 220px",
          }}
        >
          <Reveal delay={150} duration={30} y={24}>
            <div
              style={{
                fontFamily: FRAUNCES,
                fontWeight: 400,
                color: COLORS.white,
                fontSize: 50,
                lineHeight: 1.34,
                letterSpacing: 0.4,
                textAlign: "center",
                maxWidth: 1180,
              }}
            >
              This is not a lack of intelligence. It is a missing{" "}
              <span style={{ color: COLORS.copper }}>infrastructure</span> layer.
            </div>
          </Reveal>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
