import { NodeDefinition } from "../Types/NodeDefinition";
import { GenerateGradient } from "./Color/GenerateGradient";
import { GradientNode } from "./Color/GradientNode";
import { HSL } from "./Color/HSL";
import { HSV } from "./Color/HSV";
import { Palette } from "./Color/Palette";
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
import { Scale } from "./Vector/Scale";
import { SquareMagnitude } from "./Vector/SquareMagnitude";
import { Subtract } from "./Vector/Subtract";
import { VectorFromAngle } from "./Vector/VectorFromAngle";

import { AndNode } from "./Logic/AndNode";
import { Compare } from "./Logic/Compare";
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
import { DrawGradientRect } from "./Draw/DrawGradientRect";
import { DrawLine } from "./Draw/DrawLine";
import { DrawPolygon } from "./Draw/DrawPolygonArray";
import { DrawQuad } from "./Draw/DrawQuad";
import { DrawRect } from "./Draw/DrawRect";
import { DrawRegularPolygon } from "./Draw/DrawRegularPolygon";
import { DrawText } from "./Draw/DrawText";
import { DrawTriangle } from "./Draw/DrawTriangle";
import { FillBackground } from "./Draw/FillBackground";

import { Nodes3D } from "./3D/3DNodes";
import { ArrayAgreggate } from "./Array/ArrayAggregate";
import { ArrayMap } from "./Array/ArrayMap";
import { Count } from "./Array/Count";
import { Filter } from "./Array/Filter";
import { GenerateArray } from "./Array/GenerateArray";
import { RandomFromArray } from "./Array/RandomFromArray";
import { SelectFromArray } from "./Array/SelectFromArray";
import { Slice } from "./Array/Slice";
import { StaticArray } from "./Array/StaticArray";
import { Sum } from "./Array/Sum";
import { GradientFromArray } from "./Color/GradientFromArray";
import { createConstant } from "./createConstant";
import { ComposeStruct } from "./CustomFunction/ComposeStruct";
import { CustomFunction } from "./CustomFunction/CustomFunction";
import { CustomFunctionEnd } from "./CustomFunction/CustomFunctionEnd";
import { CustomFunctionStart } from "./CustomFunction/CustomFunctionStart";
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
import { KeyPressed } from "./Inputs/KeyPressed";
import { MouseButton } from "./Inputs/MouseButton";
import { MousePosition } from "./Inputs/MousePosition";
import { RandomInt } from "./Inputs/RandomInt";
import { RandomOnSphere } from "./Inputs/RandomOnSphere";
import { RecordBezierPath } from "./Inputs/RecordBezierPath";
import { RecordPath } from "./Inputs/RecordPath";
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
import { ExponantialImpulse } from "./Math/ExponantialImpulse";
import { Floor } from "./Math/Floor";
import { IntegrateVelocity } from "./Math/IntegrateVelocity";
import { LogNode } from "./Math/LogNode";
import { LoopingNoise } from "./Math/LoopingNoise";
import { Max } from "./Math/Max";
import { Min } from "./Math/Min";
import { Modulo, Remainder } from "./Math/Modulo";
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
import { SquareWave } from "./Math/SquareWave";
import { Step } from "./Math/Step";
import { TrapezoidWave } from "./Math/TrapezoidWave";
import { TriangleWave } from "./Math/TriangleWave";
import { Blackboard } from "./Misc/Blackboard";
import { CacheNode } from "./Misc/Cache";
import { Combine } from "./Misc/Combine";
import { CombineArray } from "./Misc/CombineArray";
import { CombineGridLoop } from "./Misc/CombineGridLoop";
import { CombineLoop } from "./Misc/CombineLoop";
import { Comment } from "./Misc/Comment";
import { RenderWithBlending } from "./Misc/RenderWithBlending";
import { RenderWithMask } from "./Misc/RenderWithMask";
import { RenderWithRotation } from "./Misc/RenderWithRotation";
import { RenderWithScale } from "./Misc/RenderWithScale";
import { RenderWithShadow } from "./Misc/RenderWithShadow";
import { RenderWithTranslation } from "./Misc/RenderWithTranslation";
import { StartNode } from "./Misc/StartNode";
import { AlignRotation } from "./Quaternion/AlignRotation";
import { AxisAngle } from "./Quaternion/AxisAngle";
import { EulerAngle } from "./Quaternion/EulerAngle";
import { LookAtRotation } from "./Quaternion/LookAt";
import { ShaderMaterial } from "./Shaders/ShaderMaterial";
import { ChangeNode } from "./State/ChangeNode";
import { Counter } from "./State/CounterNode";
import { DetectChangeNode } from "./State/DetectChangeNode";
import { DetectThreshold } from "./State/DetectThresholdNode";
import { EdgeNode } from "./State/EdgeNode";
import { PreviousNode } from "./State/PreviousNode";
import { SaveNode } from "./State/SaveNode";
import { ToggleFlipFlopNode, ToggleSwitchNode } from "./State/ToggleSwitch";
import { InterpolateText } from "./Text/InterpolateText";
import { CrossProduct } from "./Vector/CrossProduct";
import { FocalLength } from "./Vector/FocalLength";
import { HexGrid } from "./Vector/HexGrid";
import { RotateVector } from "./Vector/RotateVector";
import { ScaleAdd } from "./Vector/ScaleAdd";
import { SeededRandom } from "./Vector/SeededRandom";
import { Swizzle } from "./Vector/Swizzle";
import { Value } from "./Vector/Value";
import { Distance } from "./Vector/VectorDistance";

export const Nodes: Array<NodeDefinition> = [
  StartNode,
  Comment,
  //Control flow
  Combine,
  CombineLoop,
  CombineArray,
  CombineGridLoop,
  CacheNode,

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
  Swizzle,

  //2D specific
  VectorFromAngle,
  RotateVector,
  HexGrid,

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
  MouseButton,
  KeyPressed,

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
  // UsePatternImage,
  //UseParticleImage,

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
  InterpolateText,

  //Draw
  DrawCircle,
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
  RenderWithRotation,
  RenderWithTranslation,
  RenderWithScale,
  RenderWithShadow,
  RenderWithMask,
  RenderWithBlending,

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
  Remainder,
  PowNode,
  Max,
  Min,
  Cos,
  Sin,
  SawToothWave,
  TriangleWave,
  SquareWave,
  SineWave,
  TrapezoidWave,
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
  Clamp,
  PingPong,
  Remap,
  Noise,
  LoopingNoise,
  EasingNode,
  EvaluateBezier,
  Step,
  Envelope,
  RecordPath,
  RecordBezierPath,
  OneMinus,
  SmoothStep,
  IntegrateVelocity,
  ExponantialImpulse,

  // Constant
  createConstant("Pi", Math.PI),
  createConstant("Tau", Math.PI * 2),
  createConstant("E", Math.E),
  createConstant("Sqrt2", Math.SQRT2),

  //Quaternion
  EulerAngle,
  AxisAngle,
  AlignRotation,
  LookAtRotation,

  //3D
  ...Nodes3D,

  //Array
  SelectFromArray,
  RandomFromArray,
  StaticArray,
  Count,
  Sum,
  ArrayAgreggate,
  Filter,
  Slice,
  GenerateArray,
  ArrayMap,

  //Misc
  AnimationCurve,
  CustomImperativeFunction,

  //Effect
  BlurEffect,
  BloomEffect,

  //Statefull
  EdgeNode,
  Counter,
  DetectChangeNode,
  ChangeNode,
  PreviousNode,
  SaveNode,
  ToggleSwitchNode,
  ToggleFlipFlopNode,
  DetectThreshold,
];

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
