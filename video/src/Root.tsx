import React from "react";
import { Composition } from "remotion";
import { AvantGardeBrand } from "./AvantGardeBrand";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AvantGardeBrand"
      component={AvantGardeBrand}
      durationInFrames={2400}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
