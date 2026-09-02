import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FRAUNCES, INTER } from "../theme";
import { Reveal, Scene } from "../components/motion";

// 1:12 - 1:20 (240 frames). INVITATION.
export const Scene7Invitation: React.FC = () => {
  const frame = useCurrentFrame();

  // Invitation holds ~3s, then fades to navy.
  const inviteOut = interpolate(frame, [92, 122], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Final tagline appears on the cleared navy frame and holds to the end.
  const finalIn = interpolate(frame, [124, 154], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Scene durationInFrames={240} fadeOut={0}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 240px",
          textAlign: "center",
          opacity: inviteOut,
        }}
      >
        <Reveal delay={24} duration={30} y={24}>
          <div
            style={{
              fontFamily: FRAUNCES,
              fontWeight: 400,
              color: COLORS.white,
              fontSize: 56,
              lineHeight: 1.3,
              letterSpacing: 0.4,
              marginBottom: 34,
            }}
          >
            Start with a private discovery conversation.
          </div>
        </Reveal>
        <Reveal delay={58} duration={28} y={20}>
          <div
            style={{
              fontFamily: INTER,
              fontWeight: 400,
              color: COLORS.copper,
              fontSize: 30,
              letterSpacing: 1.5,
            }}
          >
            avantgarde-internationalgroup.com
          </div>
        </Reveal>
      </AbsoluteFill>

      {/* Final frame tagline */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 240px",
          textAlign: "center",
          opacity: finalIn,
        }}
      >
        <div
          style={{
            fontFamily: INTER,
            fontWeight: 300,
            color: COLORS.body,
            fontSize: 26,
            letterSpacing: 1,
            lineHeight: 1.5,
          }}
        >
          You own the data. You own the decisions. The AI is the leverage.
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
