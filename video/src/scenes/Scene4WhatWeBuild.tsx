import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FRAUNCES, INTER } from "../theme";
import { Reveal, Scene } from "../components/motion";
import { ThreeLayer } from "../components/ThreeLayer";

// 0:32 - 0:48 (480 frames). WHAT WE BUILD.
const SUPPORT = [
  "Systems that remember what matters.",
  "That preserve the reasoning behind important decisions.",
  "That bring the right information forward when the decision is yours.",
];

export const Scene4WhatWeBuild: React.FC = () => {
  return (
    <Scene durationInFrames={480}>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Left: copy */}
        <div
          style={{
            flex: "0 0 58%",
            paddingLeft: 200,
            paddingRight: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Reveal delay={16} duration={26} y={18}>
            <div
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                color: COLORS.copper,
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 30,
              }}
            >
              Avant Garde International Group
            </div>
          </Reveal>

          <Reveal delay={54} duration={30} y={24}>
            <div
              style={{
                fontFamily: FRAUNCES,
                fontWeight: 400,
                color: COLORS.white,
                fontSize: 46,
                lineHeight: 1.34,
                letterSpacing: 0.4,
                maxWidth: 780,
                marginBottom: 46,
              }}
            >
              We build private decision systems around the person responsible
              for the call.
            </div>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {SUPPORT.map((line, i) => (
              <Reveal key={i} delay={150 + i * 60} duration={26} y={20}>
                <div
                  style={{
                    fontFamily: INTER,
                    fontWeight: 300,
                    color: COLORS.body,
                    fontSize: 32,
                    lineHeight: 1.32,
                    letterSpacing: 0.2,
                    maxWidth: 760,
                  }}
                >
                  {line}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: three-layer diagram */}
        <div
          style={{
            flex: "0 0 42%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeLayer delay={60} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
