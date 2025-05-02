import { NodeDefinition } from "../Types/NodeDefinition";
import { GenerateGradient } from "./Color/GenerateGradient";
import { GradientNode } from "./Color/GradientNode";
import { HSL } from "./Color/HSL";
import { HSV } from "./Color/HSV";
import { Palette } from "./Color/PickFromPalette";
import { SampleGradient } from "./Color/SampleGradient";
import { SetAlpha } from "./Color/SetAlpha";

import { Add } from "./Vector/Add";
import { ComposeNode } from "./Vector/ComposeNode";
import { DecomposeNode } from "./Vector/DecomposeNode";
import { Divide } from "./Vector/Divide";
import { DotProduct } from "./Vector/DotProduct";
import { Lerp } from "./Vector/Lerp";
import { Magnitude } from "./Vector/Magnitude";
import { Multiply } from "./Vector/Multiply";
import { Normalize } from "./Vector/Normalize";
import { RotateVector } from "./Vector/Rotate2D";
import { Scale } from "./Vector/Scale";
import { SquareMagnitude } from "./Vector/SquareMagnitude";
import { Subtract } from "./Vector/Subtract";
import { VectorFromAngle } from "./Vector/VectorFromAngle";

import { AndNode } from "./Logic/AndNode";
import { Compare } from "./Logic/Compare";
import { IfNode } from "./Logic/IfNode";
import { NotNode } from "./Logic/NotNode";
import { OrNode } from "./Logic/OrNode";
import { SwitchNode } from "./Logic/SwitchNode";
import { XOrNode } from "./Logic/XOrNode";

import { RenderShader } from "./Shaders/RenderShader";
import { RenderShaderEnd } from "./Shaders/RenderShaderEnd";
import { RenderShaderStart } from "./Shaders/RenderShaderStart";

import { Calendar } from "./Inputs/Calendar";
import { Clock } from "./Inputs/Clock";
import { DeltatTime } from "./Inputs/DeltatTime";
import { DeviceRotation } from "./Inputs/DeviceRotation";
import { Dimension } from "./Inputs/Dimension";
import { Frame } from "./Inputs/Frame";
import { MouseMouvement } from "./Inputs/MouseMouvement";
import { MousePosition } from "./Inputs/MousePosition";
import { Progress } from "./Inputs/Progress";
import { Random } from "./Inputs/Random";
import { Time } from "./Inputs/Time";

import { DrawImage } from "./Images/DrawImage";
import { DrawImageWithTint } from "./Images/DrawImageWithTint";
import { PrecomputeImage } from "./Images/PrecomputeImage";
import { UploadImage } from "./Images/UploadImage";

import { CheckerBoardPattern } from "./Shaders/CheckerBoardPattern";
import { SampleTexture } from "./Shaders/SampleTexture";
import { Twirl } from "./Shaders/Twirl";
import { WorleyNoise } from "./Shaders/WorleyNoise";

import { SliceText } from "./Text/SliceText";
import { TextConcat } from "./Text/TextConcat";
import { TextLength } from "./Text/TextLength";

import { Clear } from "./Draw/Clear";
import { DrawArc } from "./Draw/DrawArc";
import { DrawBezier } from "./Draw/DrawBezier";
import { DrawCircle } from "./Draw/DrawCircle";
import { DrawCircleStroke } from "./Draw/DrawCircleStroke";
import { DrawGradientRect } from "./Draw/DrawGradientRect";
import { DrawLine } from "./Draw/DrawLine";
import { DrawPolygon } from "./Draw/DrawPolygon";
import { DrawPolygonArray } from "./Draw/DrawPolygonArray";
import { DrawQuad } from "./Draw/DrawQuad";
import { DrawRect } from "./Draw/DrawRect";
import { DrawRegularPolygon } from "./Draw/DrawRegularPolygon";
import { DrawText } from "./Draw/DrawText";
import { DrawTriangle } from "./Draw/DrawTriangle";
import { FillBackground } from "./Draw/FillBackground";

import { CustomFunction } from "./CustomFunction/CustomFunction";
import { CustomFunctionEnd } from "./CustomFunction/CustomFunctionEnd";
import { CustomFunctionStart } from "./CustomFunction/CustomFunctionStart";
import { ExecuteWithBlending } from "./Rendering/ExecuteWithBlending";
import { ExecuteWithMask } from "./Rendering/ExecuteWithMask";
import { ExecuteWithMotionBlur } from "./Rendering/ExecuteWithMotionBlur";
import { ExecuteWithRotation } from "./Rendering/ExecuteWithRotation";
import { ExecuteWithScale } from "./Rendering/ExecuteWithScale";
import { ExecuteWithShadow } from "./Rendering/ExecuteWithShadow";
import { ExecuteWithTranslation } from "./Rendering/ExecuteWithTranslation";
import { ExecuteInOrder } from "./System/ExecuteInOrder";
import { ForGrid } from "./System/ForGrid";
import { ForNode } from "./System/ForNode";
import { Precompute } from "./System/Precompute";
import { StartNode } from "./System/StartNode";
import { ThenNode } from "./System/ThenNode";
import { createConstant } from "./createConstant";

import { DefaultMaterial } from "./3D/DefaultMaterial";
import { DrawBox } from "./3D/DrawBox";
import { DrawCilinder } from "./3D/DrawCilinder";
import { DrawCone } from "./3D/DrawCone";
import { DrawModel } from "./3D/DrawModel";
import { DrawPlane } from "./3D/DrawPlane";
import { DrawSphere } from "./3D/DrawSphere";
import { DrawTorus } from "./3D/DrawTorus";
import { EmissiveMaterial } from "./3D/EmissiveMaterial";
import { ExecuteWithLight } from "./3D/ExecuteWithLights";
import { RegularMaterial } from "./3D/RegularMaterial";
import { Render3D } from "./3D/Render3D";
import { TextureMaterial } from "./3D/TextureMaterial";
import { WireframeMaterial } from "./3D/WireframeMaterial";
import { Count } from "./Array/Count";
import { Filter } from "./Array/Filter";
import { FindBest } from "./Array/FindBest";
import { GenerateArray } from "./Array/GenerateArray";
import { GenerateUVModel } from "./Array/GenerateUVModel";
import { SelectFromArray } from "./Array/SelectFromArray";
import { Slice } from "./Array/Slice";
import { StaticArray } from "./Array/StaticArray";
import { Sum } from "./Array/Sum";
import { GradientFromArray } from "./Color/GradientFromArray";
import { ComposeStruct } from "./CustomFunction/ComposeStruct";
import { CustomImperativeFunction } from "./CustomFunction/CustomImperativeFunction";
import { CustomSimulation } from "./CustomFunction/CustomSimulation";
import { CustomSimulationEnd } from "./CustomFunction/CustomSimulationEnd";
import { CustomSimulationStart } from "./CustomFunction/CustomSimulationStart";
import { DecomposeStruct } from "./CustomFunction/DecomposeStruct";
import { BloomEffect } from "./Effects/BloomEffect";
import { BlurEffect } from "./Effects/BlurEffect";
import { DrawImagePart } from "./Images/DrawImagePart";
import { ImageDimension } from "./Images/ImageDimension";
import { PaintImage } from "./Images/PaintImage";
import { UploadModel } from "./Images/UploadModel";
import { RandomInt } from "./Inputs/RandomInt";
import { RandomOnSphere } from "./Inputs/RandomOnSphere";
import { Select } from "./Logic/SelectNode";
import { Abs } from "./Math/Abs";
import { Acos } from "./Math/Acos";
import { AnimationCurve } from "./Math/AnimationCurve";
import { Asin } from "./Math/Asin";
import { Atan } from "./Math/Atan";
import { Atan2 } from "./Math/Atan2";
import { Ceil } from "./Math/Ceil";
import { Clamp } from "./Math/Clamp";
import { Clamp01 } from "./Math/Clamp01";
import { Cos } from "./Math/Cos";
import { DegreeToRadian } from "./Math/DegreeToRadian";
import { EasingNode } from "./Math/EasingNode";
import { Envelope } from "./Math/Envelope";
import { EvaluateBezier } from "./Math/EvaluateBezier";
import { ExpNode } from "./Math/ExpNode";
import { Floor } from "./Math/Floor";
import { IntegrateVelocity } from "./Math/IntegrateVelocity";
import { LogNode } from "./Math/LogNode";
import { LoopingNoise } from "./Math/LoopingNoise";
import { Max } from "./Math/Max";
import { Min } from "./Math/Min";
import { Modulo } from "./Math/Modulo";
import { Noise } from "./Math/Noise";
import { OneMinus } from "./Math/OneMinus";
import { PingPong } from "./Math/PingPong";
import { PowNode } from "./Math/PowNode";
import { RadianToDegree } from "./Math/RadianToDegree";
import { Remap } from "./Math/Remap";
import { Round } from "./Math/Round";
import { SawToothWave } from "./Math/SawToothWave";
import { SignNode } from "./Math/SignNode";
import { Sin } from "./Math/Sin";
import { SineWave } from "./Math/SineWave";
import { SmoothStep } from "./Math/SmoothStep";
import { Sqrt } from "./Math/Sqrt";
import { Step } from "./Math/Step";
import { ShaderMaterial } from "./Shaders/ShaderMaterial";
import { Blackboard } from "./System/Blackboard";
import { ForEachNode } from "./System/ForEach";
import { CrossProduct } from "./Vector/CrossProduct";
import { FocalLength } from "./Vector/FocalLength";
import { ScaleAdd } from "./Vector/ScaleAdd";
import { SeededRandom } from "./Vector/SeededRandom";
import { Value } from "./Vector/Value";
import { Distance } from "./Vector/VectorDistance";

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
  Distance,
  ScaleAdd,

  //2D specific
  VectorFromAngle,
  RotateVector,

  // Magnitude
  Magnitude,
  SquareMagnitude,
  Normalize,

  // Misc
  DotProduct,
  Lerp,
  FocalLength,
  CrossProduct,
  Value,
  Blackboard,

  // Color
  HSL,
  HSV,
  SetAlpha,

  // Color Gradients
  Palette,
  GradientNode,
  SampleGradient,
  GenerateGradient,
  GradientFromArray,

  // Logic Operator
  AndNode,
  OrNode,
  XOrNode,
  NotNode,

  // Logic
  Compare,
  IfNode,
  SwitchNode,
  Select,

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
  RandomOnSphere,
  RandomInt,

  //Input Misc
  Dimension,

  //Image
  UploadImage,
  DrawImage,
  DrawImagePart,
  DrawImageWithTint,
  PrecomputeImage,
  ImageDimension,
  PaintImage,

  //Shader
  RenderShaderStart,
  RenderShaderEnd,
  RenderShader,
  ShaderMaterial,

  //Shader specific
  Twirl,
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
  DrawPolygonArray,
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
  CustomSimulation,
  CustomSimulationEnd,
  CustomSimulationStart,
  ComposeStruct,
  DecomposeStruct,

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
  Step,
  Envelope,
  OneMinus,
  SmoothStep,
  IntegrateVelocity,

  // Constant
  createConstant("PI", Math.PI),
  createConstant("TAU", Math.PI * 2),
  createConstant("E", Math.E),
  createConstant("SQRT2", Math.SQRT2),

  //3D
  Render3D,
  DrawBox,
  DrawPlane,
  DrawSphere,
  DrawTorus,
  DrawCone,
  DrawCilinder,
  UploadModel,
  DrawModel,
  GenerateUVModel,
  //Materials
  ExecuteWithLight,
  RegularMaterial,
  EmissiveMaterial,
  TextureMaterial,
  WireframeMaterial,
  DefaultMaterial,

  //Array
  SelectFromArray,
  StaticArray,
  Count,
  Sum,
  FindBest,
  Filter,
  Slice,
  GenerateArray,
  ForEachNode,

  //Misc
  AnimationCurve,
  CustomImperativeFunction,

  //Effect
  BlurEffect,
  BloomEffect,
];

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
