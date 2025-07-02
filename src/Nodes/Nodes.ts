import { NodeDefinition } from "../Types/NodeDefinition";
import { GenerateGradient } from "./Color/Gradient/GenerateGradient";
import { GradientNode } from "./Color/Gradient/GradientNode";
import { SampleGradient } from "./Color/Gradient/SampleGradient";
import { HSL } from "./Color/HSL";
import { HSV } from "./Color/HSV";
import { Palette } from "./Color/Palette";
import { SetAlpha } from "./Color/SetAlpha";

import { Add } from "./Math/Basic/Add";
import { Divide } from "./Math/Basic/Divide";
import { Multiply } from "./Math/Basic/Multiply";
import { Scale } from "./Math/Basic/Scale";
import { Subtract } from "./Math/Basic/Subtract";
import { ComposeNode } from "./Math/Vector/ComposeNode";
import { DecomposeNode } from "./Math/Vector/DecomposeNode";
import { DotProduct } from "./Math/Vector/DotProduct";
import { SquareMagnitude } from "./Math/Vector/SquareMagnitude";

import { AndNode } from "./Logic/AndNode";
import { Compare } from "./Logic/Compare";
import { NotNode } from "./Logic/NotNode";
import { OrNode } from "./Logic/OrNode";
import { SwitchNode } from "./Logic/SwitchNode";
import { XOrNode } from "./Logic/XOrNode";

import { RenderShader } from "./Technical/ImageEffectShader/RenderShader";
import { RenderShaderEnd } from "./Technical/ImageEffectShader/RenderShaderEnd";
import { RenderShaderStart } from "./Technical/ImageEffectShader/RenderShaderStart";

import { Calendar } from "./Inputs/Calendar";
import { Clock } from "./Inputs/Clock";
import { DeltatTime } from "./Inputs/DeltatTime";
import { DeviceRotation } from "./Inputs/DeviceRotation";
import { Dimension } from "./Inputs/Dimension";
import { Frame } from "./Inputs/Frame";
import { Progress } from "./Inputs/Progress";
import { Time } from "./Inputs/Time";

import { DrawImage } from "./Images/DrawImage";
import { DrawImageWithTint } from "./Images/DrawImageWithTint";
import { PrecomputeImage } from "./Images/PrecomputeImage";
import { UploadImage } from "./Images/UploadImage";

import { CheckerBoardPattern } from "./Procedural/CheckerBoardPattern";
import { Twirl } from "./Procedural/Twirl";
import { WorleyNoise } from "./Procedural/WorleyNoise";
import { SampleTexture } from "./Shaders/SampleTexture";

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
import { ArrayAppend } from "./Array/ArrayAppend";
import { ArrayConcat } from "./Array/ArrayConcat";
import { ArrayFirst } from "./Array/ArrayFirst";
import { ArrayInvert } from "./Array/ArrayInvert";
import { ArrayLast } from "./Array/ArrayLast";
import { ArrayMap } from "./Array/ArrayMap";
import { ArrayRemoveAt } from "./Array/ArrayRemoveAt";
import { ArrayReplace } from "./Array/ArrayReplace";
import { Shuffle } from "./Array/ArrayShuffle";
import { Count } from "./Array/Count";
import { Filter } from "./Array/Filter";
import { GenerateArray } from "./Array/GenerateArray";
import { RandomFromArray } from "./Array/RandomFromArray";
import { SelectFromArray } from "./Array/SelectFromArray";
import { Slice } from "./Array/Slice";
import { StaticArray } from "./Array/StaticArray";
import { Sum } from "./Array/Sum";
import { GradientFromArray } from "./Color/Gradient/GradientFromArray";
import { createConstant } from "./createConstant";
import { DrawPolyline } from "./Draw/DrawPolyline";
import { BloomEffect } from "./Effects/BloomEffect";
import { BlurEffect } from "./Effects/BlurEffect";
import { FlatColorEffect } from "./Effects/FlatColorEffect";
import { DrawImagePart } from "./Images/DrawImagePart";
import { ImageDimension } from "./Images/ImageDimension";
import { PaintImage } from "./Images/PaintImage";
import { UseParticleImage } from "./Images/UseParticleImage";
import { UsePatternImage } from "./Images/UsePatternImage";
import { KeyPressed } from "./Inputs/KeyPressed";
import { MouseButton } from "./Inputs/MouseButton";
import { MousePosition } from "./Inputs/MousePosition";
import { RecordBezierPath } from "./Inputs/RecordBezierPath";
import { RecordPath } from "./Inputs/RecordPath";
import { Abs } from "./Math/Advanced/Abs";
import { Ceil } from "./Math/Advanced/Ceil";
import { Clamp } from "./Math/Advanced/Clamp";
import { Clamp01 } from "./Math/Advanced/Clamp01";
import { ExpNode } from "./Math/Advanced/ExpNode";
import { Floor } from "./Math/Advanced/Floor";
import { LogNode } from "./Math/Advanced/LogNode";
import { MathExpression } from "./Math/Advanced/MathExpression";
import { Max } from "./Math/Advanced/Max";
import { Min } from "./Math/Advanced/Min";
import { OneMinus } from "./Math/Advanced/OneMinus";
import { PingPong } from "./Math/Advanced/PingPong";
import { PowNode } from "./Math/Advanced/PowNode";
import { Round } from "./Math/Advanced/Round";
import { SignNode } from "./Math/Advanced/SignNode";
import { Sqrt } from "./Math/Advanced/Sqrt";
import { Step } from "./Math/Advanced/Step";
import { Modulo } from "./Math/Basic/Modulo";
import { Remainder } from "./Math/Basic/Remainder";
import { ScaleAdd } from "./Math/Basic/ScaleAdd";
import { AnimationCurve } from "./Math/Interpolations/AnimationCurve";
import { EasingNode } from "./Math/Interpolations/EasingNode";
import { Envelope } from "./Math/Interpolations/Envelope";
import { EvaluateBezier } from "./Math/Interpolations/EvaluateBezier";
import { ExponantialImpulse } from "./Math/Interpolations/ExponantialImpulse";
import { IntegrateVelocity } from "./Math/Interpolations/IntegrateVelocity";
import { Lerp } from "./Math/Interpolations/Lerp";
import { Remap } from "./Math/Interpolations/Remap";
import { SmoothStep } from "./Math/Interpolations/SmoothStep";
import { AlignRotation } from "./Math/Quaternion/AlignRotation";
import { AxisAngle } from "./Math/Quaternion/AxisAngle";
import { EulerAngle } from "./Math/Quaternion/EulerAngle";
import { LookAtRotation } from "./Math/Quaternion/LookAt";
import { QuaternionInverse } from "./Math/Quaternion/QuaternionInverse";
import { FocalLength } from "./Math/Transformation/FocalLength";
import { HexGrid } from "./Math/Transformation/HexGrid";
import { Acos } from "./Math/Trigonometry/Acos";
import { Asin } from "./Math/Trigonometry/Asin";
import { Atan } from "./Math/Trigonometry/Atan";
import { Atan2 } from "./Math/Trigonometry/Atan2";
import { Cos } from "./Math/Trigonometry/Cos";
import { DegreeToRadian } from "./Math/Trigonometry/DegreeToRadian";
import { RadianToDegree } from "./Math/Trigonometry/RadianToDegree";
import { Sin } from "./Math/Trigonometry/Sin";
import { Tan } from "./Math/Trigonometry/Tan";
import { CrossProduct } from "./Math/Vector/CrossProduct";
import { Magnitude } from "./Math/Vector/Magnitude";
import { Normalize } from "./Math/Vector/Normalize";
import { RotateVector } from "./Math/Vector/RotateVector";
import { Swizzle } from "./Math/Vector/Swizzle";
import { Distance } from "./Math/Vector/VectorDistance";
import { VectorFromAngle } from "./Math/Vector/VectorFromAngle";
import { SawToothWave } from "./Math/Wave/SawToothWave";
import { SineWave } from "./Math/Wave/SineWave";
import { SquareWave } from "./Math/Wave/SquareWave";
import { TrapezoidWave } from "./Math/Wave/TrapezoidWave";
import { TriangleWave } from "./Math/Wave/TriangleWave";
import { AreaComment } from "./Misc/AreaComment";
import { Blackboard } from "./Misc/Blackboard";
import { CacheNode } from "./Misc/Cache";
import { Combine } from "./Misc/Combine/Combine";
import { CombineArray } from "./Misc/Combine/CombineArray";
import { CombineGridLoop } from "./Misc/Combine/CombineGridLoop";
import { CombineLoop } from "./Misc/Combine/CombineLoop";
import { Comment } from "./Misc/Comment";
import { CustomImperativeFunction } from "./Misc/CustomImperativeFunction";
import { RenderWithBlending } from "./Misc/Render/RenderWithBlending";
import { RenderWithMask } from "./Misc/Render/RenderWithMask";
import { RenderWithRotation } from "./Misc/Render/RenderWithRotation";
import { RenderWithScale } from "./Misc/Render/RenderWithScale";
import { RenderWithShadow } from "./Misc/Render/RenderWithShadow";
import { RenderWithTranslation } from "./Misc/Render/RenderWithTranslation";
import { Value } from "./Misc/Value";
import { LoopingNoise } from "./Random/LoopingNoise";
import { Noise } from "./Random/Noise";
import { PoissonDisk } from "./Random/PoissonDisk";
import { Random } from "./Random/Random";
import { RandomInt } from "./Random/RandomInt";
import { RandomOnSphere } from "./Random/RandomOnSphere";
import { SeededRandom } from "./Random/SeededRandom";
import { ShaderVaryingNodes } from "./Shaders/Varying";
import { StartNode } from "./StartNode";
import { ChangeNode } from "./State/ChangeNode";
import { Counter } from "./State/CounterNode";
import { DetectChangeNode } from "./State/DetectChangeNode";
import { DetectThreshold } from "./State/DetectThresholdNode";
import { EdgeNode } from "./State/EdgeNode";
import { PreviousNode } from "./State/PreviousNode";
import { SaveNode } from "./State/SaveNode";
import { ToggleFlipFlopNode, ToggleSwitchNode } from "./State/ToggleSwitch";
import { CustomFunction } from "./Technical/CustomFunction/CustomFunction";
import { CustomFunctionEnd } from "./Technical/CustomFunction/CustomFunctionEnd";
import { CustomFunctionStart } from "./Technical/CustomFunction/CustomFunctionStart";
import { ShaderMaterial } from "./Technical/MaterialShader/ShaderMaterial";
import { ShaderMaterialEnd } from "./Technical/MaterialShader/ShaderMaterialEnd";
import { ShaderMaterialStart } from "./Technical/MaterialShader/ShaderMaterialStart";
import { CustomSimulation } from "./Technical/Simulation/CustomSimulation";
import { CustomSimulationEnd } from "./Technical/Simulation/CustomSimulationEnd";
import { CustomSimulationStart } from "./Technical/Simulation/CustomSimulationStart";
import { ComposeStruct } from "./Technical/Struct/ComposeStruct";
import { DecomposeStruct } from "./Technical/Struct/DecomposeStruct";
import { InterpolateText } from "./Text/InterpolateText";

export const Nodes: Array<NodeDefinition> = [
  StartNode,
  Comment,
  AreaComment,
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
  UsePatternImage,
  UseParticleImage,

  //Shader
  RenderShaderStart,
  RenderShaderEnd,
  RenderShader,
  ShaderMaterial,
  ShaderMaterialStart,
  ShaderMaterialEnd,

  ...ShaderVaryingNodes,

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
  DrawPolyline,
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
  Tan,
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
  MathExpression,
  PoissonDisk,

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
  QuaternionInverse,

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
  Shuffle,
  ArrayAppend,
  ArrayConcat,
  ArrayFirst,
  ArrayLast,
  ArrayRemoveAt,
  ArrayReplace,
  ArrayInvert,

  //Misc
  AnimationCurve,
  CustomImperativeFunction,

  //Effect
  BlurEffect,
  BloomEffect,
  FlatColorEffect,

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

console.log(Nodes.length);

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
