import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FRAUNCES, INTER } from "../theme";
import { Reveal, Scene } from "../components/motion";
import { Fragments } from "../components/Fragments";

// 0:08 - 0:20 (360 frames). THE BURDEN.
const LINES = [
  "They are blocked by scattered reasoning.",
  "Buried history.",
  "Forgotten commitments.",
  "Unresolved questions.",
];

export const Scene2Burden: React.FC = () => {
  return (
    <Scene durationInFrames={360}>
      <AbsoluteFill style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Left: text block */}
        <div
          style={{
            flex: "0 0 52%",
            paddingLeft: 200,
            paddingRight: 60,
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          {LINES.map((line, i) => (
            <Reveal key={i} delay={20 + i * 40} duration={24} y={22}>
              <div
                style={{
                  fontFamily: INTER,
                  fontWeight: 300,
                  color: COLORS.body,
                  fontSize: 40,
                  lineHeight: 1.3,
                  letterSpacing: 0.2,
                }}
              >
                {line}
              </div>
            </Reveal>
          ))}

          <Reveal delay={210} duration={30} y={24}>
            <div
              style={{
                fontFamily: FRAUNCES,
                fontWeight: 400,
                color: COLORS.white,
                fontSize: 44,
                lineHeight: 1.34,
                letterSpacing: 0.4,
                marginTop: 30,
                maxWidth: 720,
              }}
            >
              And the pressure lands on the person who has to make the call.
            </div>
          </Reveal>
        </div>

        {/* Right: single copper node with loose, unconnected fragments */}
        <div
          style={{
            flex: "0 0 48%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Reveal delay={10} duration={40} y={0}>
            <Fragments t={0} width={620} />
          </Reveal>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
