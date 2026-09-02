import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Burden } from "./scenes/Scene2Burden";
import { Scene3Reframe } from "./scenes/Scene3Reframe";
import { Scene4WhatWeBuild } from "./scenes/Scene4WhatWeBuild";
import { Scene5Outcomes } from "./scenes/Scene5Outcomes";
import { Scene6WhoFor } from "./scenes/Scene6WhoFor";
import { Scene7Invitation } from "./scenes/Scene7Invitation";

export const AvantGardeBrand: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      <Sequence from={0} durationInFrames={240}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={240} durationInFrames={360}>
        <Scene2Burden />
      </Sequence>
      <Sequence from={600} durationInFrames={360}>
        <Scene3Reframe />
      </Sequence>
      <Sequence from={960} durationInFrames={480}>
        <Scene4WhatWeBuild />
      </Sequence>
      <Sequence from={1440} durationInFrames={480}>
        <Scene5Outcomes />
      </Sequence>
      <Sequence from={1920} durationInFrames={240}>
        <Scene6WhoFor />
      </Sequence>
      <Sequence from={2160} durationInFrames={240}>
        <Scene7Invitation />
      </Sequence>
    </AbsoluteFill>
  );
};
