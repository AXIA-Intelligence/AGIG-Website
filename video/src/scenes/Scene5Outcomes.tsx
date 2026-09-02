import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FRAUNCES, INTER, HAIRLINE_COLOR } from "../theme";
import { Reveal, Scene } from "../components/motion";

// 0:48 - 1:04 (480 frames). CLIENT OUTCOMES.
// The three outcome statements are final and locked. Render verbatim.
const OUTCOMES = [
  "A patient walked into a surgical consult with sharper questions and a clear view of an irreversible risk.",
  "A founder aligned his family around a giving strategy others can now carry forward.",
  "A father replaced reactive cycles with pattern recognition and calmer support for his son.",
];

const Hairline: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        height: "0.5px",
        width: `${w}%`,
        backgroundColor: HAIRLINE_COLOR,
        margin: "34px 0",
      }}
    />
  );
};

export const Scene5Outcomes: React.FC = () => {
  return (
    <Scene durationInFrames={480}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 260px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1280 }}>
          <Reveal delay={16} duration={24} y={16}>
            <div
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                color: COLORS.copper,
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                marginBottom: 44,
              }}
            >
              What Changes
            </div>
          </Reveal>

          {OUTCOMES.map((text, i) => {
            const delay = 40 + i * 150;
            return (
              <React.Fragment key={i}>
                {i > 0 && <Hairline delay={delay - 10} />}
                <Reveal delay={delay} duration={30} y={22}>
                  <div
                    style={{
                      fontFamily: FRAUNCES,
                      fontWeight: 400,
                      color: COLORS.white,
                      fontSize: 40,
                      lineHeight: 1.36,
                      letterSpacing: 0.3,
                    }}
                  >
                    {text}
                  </div>
                </Reveal>
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
