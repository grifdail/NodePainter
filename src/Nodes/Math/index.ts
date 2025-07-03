import { MathAdvancedNodes } from "./Advanced";
import { MathBasicNodes } from "./Basic";
import { MathInterpolationNodes } from "./Interpolations";
import { MathQuaternionNodes } from "./Quaternion";
import { MathTransformNodes } from "./Transformation";
import { MathTrigonometryNodes } from "./Trigonometry";
import { MathVectorNodes } from "./Vector";
import { MathWaveNodes } from "./Wave";

export const MathNodes = [
  //
  ...MathAdvancedNodes,
  ...MathBasicNodes,
  ...MathInterpolationNodes,
  ...MathQuaternionNodes,
  ...MathTransformNodes,
  ...MathTrigonometryNodes,
  ...MathVectorNodes,
  ...MathWaveNodes,
];
