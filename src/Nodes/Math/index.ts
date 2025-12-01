import { MathAdvancedNodes } from "./Advanced";
import { MathBasicNodes } from "./Basic";
import { MathGeometryNodes } from "./Geometry";
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
  ...MathGeometryNodes,
  ...MathInterpolationNodes,
  ...MathQuaternionNodes,
  ...MathTransformNodes,
  ...MathTrigonometryNodes,
  ...MathVectorNodes,
  ...MathWaveNodes,
];
