import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

const EASE_OUT = Easing.out(Easing.cubic);

/**
 * Gentle upward reveal: fade in while translating up.
 * Travel 20-30px, ease-out, ~600-900ms (18-27 frames at 30fps).
 */
export const Reveal: React.FC<{
  delay?: number;
  duration?: number;
  y?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay = 0, duration = 24, y = 24, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

/**
 * Scene shell: paints the navy background and applies a slow fade
 * in at the start and out at the end of the scene's local timeline.
 */
export const Scene: React.FC<{
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
  background?: string;
  children: React.ReactNode;
}> = ({
  durationInFrames,
  fadeIn = 20,
  fadeOut = 24,
  background = COLORS.navy,
  children,
}) => {
  const frame = useCurrentFrame();
  // Build keyframes, omitting the fade-out leg when fadeOut is 0 so the
  // interpolate input stays strictly monotonic.
  const inputs = [0, fadeIn];
  const outputs = [0, 1];
  if (fadeOut > 0) {
    inputs.push(durationInFrames - fadeOut, durationInFrames);
    outputs.push(1, 0);
  } else {
    inputs.push(durationInFrames);
    outputs.push(1);
  }
  const opacity = interpolate(frame, inputs, outputs, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/**
 * Draws an SVG path/line stroke on progressively (0 -> 1) using
 * stroke-dashoffset. No bounce, ease-out.
 */
export const useDraw = (delay: number, duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
};
