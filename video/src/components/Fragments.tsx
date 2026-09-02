import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COPPER_STROKE, COPPER_FAINT, COLORS } from "../theme";

// Deterministic scattered offsets (relative to the central node) for 11
// document fragments. Hand-placed so they read as loose and unconnected.
const NODE = { x: 300, y: 300 };

type Frag = { sx: number; sy: number; ox: number; oy: number; r: number };

// sx/sy = scattered position, ox/oy = ordered (grid) position.
const ORDER_COLS = [96, 200, 304];
const ORDER_ROWS = [126, 216, 306, 396];
const ordered = ORDER_ROWS.flatMap((y) =>
  ORDER_COLS.map((x) => ({ x, y }))
).slice(0, 11);

const scattered = [
  { x: 150, y: 110 },
  { x: 470, y: 150 },
  { x: 90, y: 250 },
  { x: 520, y: 300 },
  { x: 130, y: 430 },
  { x: 250, y: 90 },
  { x: 460, y: 470 },
  { x: 200, y: 520 },
  { x: 380, y: 120 },
  { x: 500, y: 420 },
  { x: 110, y: 360 },
];

const FRAGS: Frag[] = scattered.map((s, i) => ({
  sx: s.x,
  sy: s.y,
  ox: ordered[i].x,
  oy: ordered[i].y,
  r: (i % 3) * 6, // slight rotation variety when scattered
}));

/**
 * Central copper node with document fragments.
 * `t` = 0 -> scattered/drifting, 1 -> ordered rows linked to the node.
 * When scattered, fragments drift gently; connecting lines fade in with t.
 */
export const Fragments: React.FC<{
  t: number;
  driftSeed?: number;
  width?: number;
}> = ({ t, driftSeed = 0, width = 600 }) => {
  const frame = useCurrentFrame();
  const ease = Easing.inOut(Easing.cubic);
  const tt = interpolate(t, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <svg
      viewBox="0 0 600 600"
      width={width}
      height={width}
      style={{ overflow: "visible" }}
    >
      {/* connecting lines (visible as the structure orders) */}
      {FRAGS.map((f, i) => {
        const drift = tt < 0.02 ? Math.sin((frame + driftSeed + i * 40) / 55) * 5 : 0;
        const x = f.sx + (f.ox - f.sx) * tt;
        const y = f.sy + (f.oy - f.sy) * tt + drift;
        return (
          <line
            key={`l-${i}`}
            x1={x}
            y1={y}
            x2={NODE.x}
            y2={NODE.y}
            stroke={COPPER_STROKE}
            strokeWidth={0.75}
            opacity={interpolate(tt, [0.35, 1], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        );
      })}

      {/* fragments */}
      {FRAGS.map((f, i) => {
        const drift = tt < 0.02 ? Math.sin((frame + driftSeed + i * 40) / 55) * 5 : 0;
        const driftX = tt < 0.02 ? Math.cos((frame + driftSeed + i * 33) / 60) * 4 : 0;
        const x = f.sx + (f.ox - f.sx) * tt + driftX;
        const y = f.sy + (f.oy - f.sy) * tt + drift;
        const rot = f.r * (1 - tt);
        return (
          <g key={`f-${i}`} transform={`translate(${x} ${y}) rotate(${rot})`}>
            <rect
              x={-22}
              y={-15}
              width={44}
              height={30}
              rx={2}
              fill={COLORS.navyPanel}
              stroke={COPPER_STROKE}
              strokeWidth={0.75}
            />
            {/* text lines inside the fragment */}
            <line x1={-14} y1={-6} x2={14} y2={-6} stroke={COPPER_FAINT} strokeWidth={0.6} />
            <line x1={-14} y1={1} x2={10} y2={1} stroke={COPPER_FAINT} strokeWidth={0.6} />
            <line x1={-14} y1={8} x2={6} y2={8} stroke={COPPER_FAINT} strokeWidth={0.6} />
          </g>
        );
      })}

      {/* central node */}
      <circle
        cx={NODE.x}
        cy={NODE.y}
        r={16}
        fill={COLORS.navy}
        stroke={COPPER_STROKE}
        strokeWidth={1.1}
      />
      <circle cx={NODE.x} cy={NODE.y} r={5} fill={COPPER_STROKE} />
    </svg>
  );
};
