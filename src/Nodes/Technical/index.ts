import { TechnicalCustomFunctionNodes } from "./CustomFunction";
import { TechnicalImageEffectShaderNodes } from "./ImageEffectShader";
import { TechnicalMaterialShaderNodes } from "./MaterialShader";
import { TechnicalSimulationNodes } from "./Simulation";
import { TechnicalStructNodes } from "./Struct";

export const TechnicalNodes = [
  //
  ...TechnicalCustomFunctionNodes,
  ...TechnicalImageEffectShaderNodes,
  ...TechnicalMaterialShaderNodes,
  ...TechnicalSimulationNodes,
  ...TechnicalStructNodes,
];
