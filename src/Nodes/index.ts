import { GenerateGradient } from "./Color/GenerateGradient";
import { SampleGradient } from "./Color/SampleGradient";
import { GradientNode } from "./Color/GradientNode";
import { PickFromPalette } from "./Color/PickFromPalette";
import { SetAlpha } from "./Color/SetAlpha";
import { HSV } from "./Color/HSV";
import { HSL } from "./Color/HSL";
import { NodeDefinition } from "../Data/NodeDefinition";

import { ComposeNode } from "./Vector/ComposeNode";
import { DecomposeNode } from "./Vector/DecomposeNode";
import { Lerp } from "./Vector/Lerp";
import { DotProduct } from "./Vector/DotProduct";
import { Divide } from "./Vector/Divide";
import { Multiply } from "./Vector/Multiply";
import { Rotate2D } from "./Vector/Rotate2D";
import { Normalize } from "./Vector/Normalize";
import { Scale } from "./Vector/Scale";
import { Subtract } from "./Vector/Subtract";
import { Add } from "./Vector/Add";
import { SquareMagnitude } from "./Vector/SquareMagnitude";
import { Magnitude } from "./Vector/Magnitude";
import { VectorFromAngle } from "./Vector/VectorFromAngle";

import { Compare } from "./Logic/Compare";
import { IfNode } from "./Logic/IfNode";
import { SwitchNode } from "./Logic/SwitchNode";
import { AndNode } from "./Logic/AndNode";
import { OrNode } from "./Logic/OrNode";
import { XOrNode } from "./Logic/XOrNode";
import { NotNode } from "./Logic/NotNode";

import { RenderShaderStart } from "./Shaders/RenderShaderStart";
import { RenderShaderEnd } from "./Shaders/RenderShaderEnd";
import { RenderShader } from "./Shaders/RenderShader";

import { Dimension } from "./Inputs/Dimension";
import { DeltatTime } from "./Inputs/DeltatTime";
import { MouseMouvement } from "./Inputs/MouseMouvement";
import { Random } from "./Inputs/Random";
import { DeviceRotation } from "./Inputs/DeviceRotation";
import { MousePosition } from "./Inputs/MousePosition";
import { Progress } from "./Inputs/Progress";
import { Frame } from "./Inputs/Frame";
import { Calendar } from "./Inputs/Calendar";
import { Clock } from "./Inputs/Clock";
import { Time } from "./Inputs/Time";

import { PrecomputeImage } from "./Images/PrecomputeImage";
import { DrawImageWithTint } from "./Images/DrawImageWithTint";
import { DrawImage } from "./Images/DrawImage";
import { UploadImage } from "./Images/UploadImage";

import { SampleTexture } from "./Shaders/SampleTexture";
import { CheckerBoardPattern } from "./Shaders/CheckerBoardPattern";
import { Twirl } from "./Shaders/Twirl";
import { GradientNoise } from "./Shaders/GradientNoise";
import { WorleyNoise } from "./Shaders/WorleyNoise";

import { TextConcat } from "./Text/TextConcat";
import { TextLength } from "./Text/TextLength";
import { SliceText } from "./Text/SliceText";

import { DrawBezier } from "./Draw/DrawBezier";
import { DrawText } from "./Draw/DrawText";
import { DrawPolygon } from "./Draw/DrawPolygon";
import { DrawQuad } from "./Draw/DrawQuad";
import { DrawTriangle } from "./Draw/DrawTriangle";
import { DrawGradientRect } from "./Draw/DrawGradientRect";
import { DrawRect } from "./Draw/DrawRect";
import { FillBackground } from "./Draw/FillBackground";
import { Clear } from "./Draw/Clear";
import { DrawCircle } from "./Draw/DrawCircle";
import { DrawCircleStroke } from "./Draw/DrawCircleStroke";
import { DrawArc } from "./Draw/DrawArc";
import { DrawRegularPolygon } from "./Draw/DrawRegularPolygon";
import { DrawLine } from "./Draw/DrawLine";

import { CustomFunctionEnd } from "./System/CustomFunctionEnd";
import { StartNode } from "./System/StartNode";
import { ThenNode } from "./System/ThenNode";
import { ForNode } from "./System/ForNode";
import { ForGrid } from "./System/ForGrid";
import { ExecuteInOrder } from "./System/ExecuteInOrder";
import { Precompute } from "./System/Precompute";
import { ExecuteWithRotation } from "./Rendering/ExecuteWithRotation";
import { ExecuteWithShadow } from "./Rendering/ExecuteWithShadow";
import { ExecuteWithTranslation } from "./Rendering/ExecuteWithTranslation";
import { ExecuteWithScale } from "./Rendering/ExecuteWithScale";
import { ExecuteWithMask } from "./Rendering/ExecuteWithMask";
import { ExecuteWithBlending } from "./Rendering/ExecuteWithBlending";
import { ExecuteWithMotionBlur } from "./Rendering/ExecuteWithMotionBlur";
import { CustomFunction } from "./System/CustomFunction";
import { CustomFunctionStart } from "./System/CustomFunctionStart";
import { createConstant } from "./createConstant";

import { Clamp } from "./Math/Clamp";
import { SineWave } from "./Math/SineWave";
import { Atan2 } from "./Math/Atan2";
import { PingPong } from "./Math/PingPong";
import { Remap } from "./Math/Remap";
import { Noise } from "./Math/Noise";
import { LoopingNoise } from "./Math/LoopingNoise";
import { EasingNode } from "./Math/EasingNode";
import { EvaluateBezier } from "./Math/EvaluateBezier";
import { Clamp01 } from "./Math/Clamp01";
import { DegreeToRadian } from "./Math/DegreeToRadian";
import { RadianToDegree } from "./Math/RadianToDegree";
import { SignNode } from "./Math/SignNode";
import { LogNode } from "./Math/LogNode";
import { ExpNode } from "./Math/ExpNode";
import { Round } from "./Math/Round";
import { Ceil } from "./Math/Ceil";
import { Floor } from "./Math/Floor";
import { Asin } from "./Math/Asin";
import { Acos } from "./Math/Acos";
import { Abs } from "./Math/Abs";
import { Sqrt } from "./Math/Sqrt";
import { SawToothWave } from "./Math/SawToothWave";
import { Max } from "./Math/Max";
import { Min } from "./Math/Min";
import { Sin } from "./Math/Sin";
import { Cos } from "./Math/Cos";
import { Atan } from "./Math/Atan";
import { PowNode } from "./Math/PowNode";
import { Modulo } from "./Math/Modulo";
import { FocalLength } from "./Vector/FocalLength";
import { SeededRandom } from "./Vector/SeededRandom";

export const Nodes: Array<NodeDefinition> = [
  StartNode,
  //Control flow
  ThenNode,
  ForNode,
  ForGrid,
  ExecuteInOrder,
  Precompute,

  // Vector Compositions
  ComposeNode,
  DecomposeNode,

  // Vector Operation
  Add,
  Subtract,
  Multiply,
  Divide,
  Scale,

  //2D specific
  VectorFromAngle,
  Rotate2D,

  // Magnitude
  Magnitude,
  SquareMagnitude,
  Normalize,

  // Misc
  DotProduct,
  Lerp,
  FocalLength,

  // Color
  HSL,
  HSV,
  SetAlpha,

  // Color Gradients
  PickFromPalette,
  GradientNode,
  SampleGradient,
  GenerateGradient,

  // Logic Operator
  AndNode,
  OrNode,
  XOrNode,
  NotNode,

  // Logic
  Compare,
  IfNode,
  SwitchNode,

  // Time
  Time,
  Clock,
  Calendar,
  Frame,
  Progress,
  DeltatTime,

  // Device
  MousePosition,
  DeviceRotation,
  MouseMouvement,

  // Random
  Random,
  SeededRandom,

  //Input Misc
  Dimension,

  //Image
  UploadImage,
  DrawImage,
  DrawImageWithTint,
  PrecomputeImage,

  //Shader
  RenderShaderStart,
  RenderShaderEnd,
  RenderShader,

  //Shader specific
  Twirl,
  GradientNoise,
  WorleyNoise,
  CheckerBoardPattern,
  SampleTexture,

  //Text
  SliceText,
  TextLength,
  TextConcat,

  //Draw
  DrawCircle,
  DrawCircleStroke,
  DrawArc,
  DrawRegularPolygon,
  DrawLine,
  DrawRect,
  DrawGradientRect,
  DrawTriangle,
  DrawQuad,
  DrawPolygon,
  DrawText,
  DrawBezier,

  //Background
  FillBackground,
  Clear,

  //Transform
  ExecuteWithRotation,
  ExecuteWithTranslation,
  ExecuteWithScale,
  ExecuteWithShadow,
  ExecuteWithMask,
  ExecuteWithBlending,
  ExecuteWithMotionBlur,

  //Custom function
  CustomFunction,
  CustomFunctionStart,
  CustomFunctionEnd,

  Modulo,
  PowNode,
  Max,
  Min,
  Cos,
  Sin,
  SawToothWave,
  Sqrt,
  Abs,
  Acos,
  Asin,
  Atan,
  Floor,
  Ceil,
  Round,
  ExpNode,
  LogNode,
  SignNode,
  RadianToDegree,
  DegreeToRadian,
  Clamp01,
  Atan2,
  SineWave,
  Clamp,
  PingPong,
  Remap,
  Noise,
  LoopingNoise,
  EasingNode,
  EvaluateBezier,

  // Constant
  createConstant("PI", Math.PI),
  createConstant("TAU", Math.PI * 2),
  createConstant("E", Math.E),
  createConstant("SQRT2", Math.SQRT2),
];

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
