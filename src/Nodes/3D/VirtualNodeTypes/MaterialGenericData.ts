export type MaterialGenericData = {
  blendingMode: "NoBlending" | "NormalBlending" | "AdditiveBlending" | "SubtractiveBlending" | "MultiplyBlending";
  transparent: boolean;
  side: "FrontSide" | "BackSide" | "DoubleSide";
  alphaTest: 0;
  flatShading: boolean;
  wireframe: boolean;
};
