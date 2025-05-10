import { MaterialGenericData } from "./MaterialGenericData";

export function createDefaultMaterialGenericData(): MaterialGenericData {
  return {
    blendingMode: "NormalBlending",
    transparent: false,
    side: "FrontSide",
    alphaTest: 0,
    flatShading: false,
    wireframe: false,
  };
}
