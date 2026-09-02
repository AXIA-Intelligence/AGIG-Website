import React from "react";
import { interpolate } from "remotion";
import { COPPER_STROKE, COPPER_FAINT, COLORS } from "../theme";
import { useDraw } from "./motion";

// Three stacked layers with a subtle vertical depth offset, thin copper
// strokes, connected by hairline verticals to a person-node at the center.
export const ThreeLayer: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const p = useDraw(delay, 60);
  const layerY = [70, 175, 280];
  const w = 360;
  const x = 40;

  const drawn = (i: number) =>
    interpolate(p, [i * 0.22, i * 0.22 + 0.5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <svg viewBox="0 0 440 400" width={560} height={509} style={{ overflow: "visible" }}>
      {/* vertical connectors */}
      {[120, 220, 320].map((cx, i) => (
        <line
          key={`v-${i}`}
          x1={cx}
          y1={layerY[0] + 30}
          x2={cx}
          y2={layerY[2] + 30}
          stroke={COPPER_FAINT}
          strokeWidth={0.6}
          opacity={interpolate(p, [0.6, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      ))}

      {layerY.map((y, i) => {
        const d = drawn(i);
        const perimeter = 2 * (w + 60);
        return (
          <g key={`layer-${i}`}>
            <rect
              x={x}
              y={y}
              width={w}
              height={60}
              rx={2}
              fill={COLORS.navyPanel}
              opacity={d * 0.9}
            />
            <rect
              x={x}
              y={y}
              width={w}
              height={60}
              rx={2}
              fill="none"
              stroke={COPPER_STROKE}
              strokeWidth={1}
              strokeDasharray={perimeter}
              strokeDashoffset={perimeter * (1 - d)}
            />
            {/* nodes on each layer */}
            {[120, 220, 320].map((cx) => (
              <circle
                key={`n-${i}-${cx}`}
                cx={cx}
                cy={y + 30}
                r={4}
                fill={COLORS.navy}
                stroke={COPPER_STROKE}
                strokeWidth={0.9}
                opacity={interpolate(d, [0.7, 1], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};
