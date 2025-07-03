import { AnimationCurve } from "./AnimationCurve";
import { EasingNode } from "./EasingNode";
import { Envelope } from "./Envelope";
import { EvaluateBezier } from "./EvaluateBezier";
import { ExponantialImpulse } from "./ExponantialImpulse";
import { IntegrateVelocity } from "./IntegrateVelocity";
import { Lerp } from "./Lerp";
import { Remap } from "./Remap";
import { SmoothStep } from "./SmoothStep";

export const MathInterpolationNodes = [
  //
  AnimationCurve,
  EasingNode,
  Envelope,
  EvaluateBezier,
  ExponantialImpulse,
  IntegrateVelocity,
  Lerp,
  Remap,
  SmoothStep,
];
