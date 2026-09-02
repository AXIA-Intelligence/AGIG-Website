import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FRAUNCES, INTER } from "../theme";
import { Reveal, Scene } from "../components/motion";

// 1:04 - 1:12 (240 frames). WHO IT IS FOR.
export const Scene6WhoFor: React.FC = () => {
  return (
    <Scene durationInFrames={240}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 240px",
          textAlign: "center",
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
            Built for accountable decision-makers.
          </div>
        </Reveal>
        <Reveal delay={64} duration={28} y={20}>
          <div
            style={{
              fontFamily: INTER,
              fontWeight: 300,
              color: COLORS.body,
              fontSize: 32,
              lineHeight: 1.4,
              letterSpacing: 0.2,
              maxWidth: 1040,
            }}
          >
            Founders, owner-operators, executives, and professionals who own
            consequential decisions.
          </div>
        </Reveal>
      </AbsoluteFill>
    </Scene>
  );
};
