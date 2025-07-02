import { SketchTemplate } from "../../../Types/SketchTemplate";

type UpgradeFunction = (sketch: SketchTemplate) => SketchTemplate;

const UPGRADES: UpgradeFunction[] = [
  (sketch) => {
    return redefineNodes(
      {
        //
        ArrayFirst: "Array/First",
        ArrayConcat: "Array/Concat",
        Count: "Array/Count",
        Shuffle: "Array/Shuffle",
        ArrayReplace: "Array/Replace",
        ArrayRemoveAt: "Array/RemoveAt",
        ["Array Map"]: "Array/Map",
        ArrayLast: "Array/Last",
        ArrayInvert: "Array/Invert",
        ArrayAppend: "Array/Append",
        ArrayAgreggate: "Array/Agreggate",
        Filter: "Array/Filter",
        SelectFromArray: "Array/Select",
        Slice: "Array/Slice",
        Sum: "Array/Sum",
        RandomFromArray: "Array/Random",
        GenerateArray: "Array/Generate",
        StaticArray: "Array/Static",
        Abs: "Math/Abs",
        Asin: "Math/Asin",
        Atan: "Math/Atan",
        Atan2: "Math/Atan2",
        Ceil: "Math/Ceil",
        Clamp: "Math/Clamp",
        Clamp01: "Math/Clamp01",
        Cos: "Math/Cos",
        DegreeToRadian: "Math/DegreeToRadian",
        Easing: "Math/Easing",
        Envelope: "Math/Envelope",
        EvaluateBezier: "Math/EvaluateBezier",
        Exp: "Math/Exp",
        ExponantialImpulse: "Math/ExponantialImpulse",
        Floor: "Math/Floor",
        IntegrateVelocity: "Math/IntegrateVelocity",
        Log: "Math/Log",
        LoopingNoise: "Math/LoopingNoise",
        MathExpression: "Math/Expression",
        Max: "Math/Max",
        Min: "Math/Min",
        Modulo: "Math/Modulo",
        Remainder: "Math/Remainder",
        Noise: "Math/Noise",
        OneMinus: "Math/OneMinus",
        PingPong: "Math/PingPong",
        PoissonDisk: "Math/PoissonDisk",
        Pow: "Math/Pow",
        RadianToDegree: "Math/RadianToDegree",
        Remap: "Math/Remap",
        Round: "Math/Round",
        SawToothWave: "Math/SawToothWave",
        Sign: "Math/Sign",
        Sin: "Math/Sin",
        SineWave: "Math/SineWave",
        SmoothStep: "Math/SmoothStep",
        Sqrt: "Math/Sqrt",
        SquareWave: "Math/SquareWave",
        Step: "Math/Step",
        TrapezoidWave: "Math/TrapezoidWave",
        TriangleWave: "Math/TriangleWave",
        And: "Logic/And",
        Compare: "Logic/Compare",
        Not: "Logic/Not",
        Or: "Logic/Or",
        xOr: "Logic/xOr",
        Calendar: "Input/Calendar",
        Clock: "Input/Clock",
        DeltaTime: "Input/DeltaTime",
        DeviceRotation: "Input/DeviceRotation",
        Dimension: "Input/Dimension",
        Frame: "Input/Frame",
        KeyPressed: "Input/KeyPressed",
        MouseButton: "Input/MouseButton",
        MousePosition: "Input/MousePosition",
        Progress: "Input/Progress",
        Random: "Input/Random/Random",
        RandomInt: "Input/Random/RandomInt",
        RandomOnSphere: "Input/Random/RandomOnSphere",
        RecordBezierPath: "Input/RecordBezierPath",
        RecordPath: "Input/RecordPath",
        Time: "Input/Time",
        AlignRotation: "Math/Quaternion/AlignRotation",
        AxisAngle: "Math/Quaternion/AxisAngle",
        EulerAngle: "Math/Quaternion/EulerAngle",
        LookAtRotation: "Math/Quaternion/LookAtRotation",
        QuaternionInverse: "Math/Quaternion/Inverse",
        UsePatternImage: "Image/UsePatternImage",
        UseParticleImage: "Image/UseParticleImage",
        UploadImage: "Image/UploadImage",
        PrecomputeImage: "Image/PrecomputeImage",
        PaintImage: "Image/PaintImage",
        ImageDimension: "Image/Dimension",
        DrawImageWithTint: "Image/DrawImageWithTint",
        DrawImagePart: "Image/DrawImagePart",
        DrawImage: "Image/DrawImage",
        BlurEffect: "Effect/BlurEffect",
        FlatColorEffect: "Effect/FlatColorEffect",
        BloomEffect: "Effect/BloomEffect",
        TextLength: "Text/Length",
        TextConcat: "Text/Concat",
        TextSlice: "Text/Slice",
        InterpolateText: "Text/InterpolateText",
        ToggleSwitch: "State/ToggleSwitch",
        Save: "State/Save",
        Previous: "State/Previous",
        EdgeNode: "State/EdgeNode",
        DetectThreshold: "State/DetectThreshold",
        DetectChange: "State/DetectChange",
        Counter: "State/Counter",
        Change: "State/Change",
        Clear: "Draw/Clear",
        DrawArc: "Draw/Arc",
        DrawBezier: "Draw/Bezier",
        DrawCircle: "Draw/Circle",
        DrawGradientRect: "Draw/GradientRect",
        DrawLine: "Draw/Line",
        DrawPolygon: "Draw/Polygon",
        DrawPolyline: "Draw/Polyline",
        DrawQuad: "Draw/Quad",
        DrawRect: "Draw/Rect",
        DrawRegularPolygon: "Draw/RegularPolygon",
        DrawText: "DrawText",
        DrawTriangle: "Draw/Triangle",
        FillBackground: "Draw/FillBackground",
        GenerateGradient: "Color/Gradient/Dynamic",
        GradientFromArray: "Color/Gradient/FromArray",
        Gradient: "Color/Gradient/Gradient",
        SampleGradient: "Color/Gradient/Sample",
        HSL: "Color/HSL",
        HSV: "Color/HSV",
        Palette: "Color/Palette",
        SetAlpha: "Color/SetAlpha",
        AreaComment: "Misc/AreaComment",
        Blackboard: "Misc/Blackboard",
        Cache: "Misc/Cache",
        Comment: "Misc/Comment",
        RenderWithBlending: "Misc/Render/Blending",
        RenderWithMask: "Misc/Render/Mask",
        RenderWithRotation: "Misc/Render/Rotation",
        RenderWithScale: "Misc/Render/Scale",
        RenderWithShadow: "Misc/Render/Shadow",
        RenderWithTranslation: "Misc/Render/Translation",
        Combine: "Misc/Combine/Static",
        CombineArray: "Misc/Combine/Array",
        CombineGridLoop: "Misc/Combine/GridLoop",
        CombineLoop: "Misc/Combine/CombineLoop",
      },
      sketch
    );
  },
];

export const SAVE_VERSION = UPGRADES.length;

export function upgradeTemplate(sketch: SketchTemplate) {
  var templateVersion = sketch.version || 0;
  if (templateVersion === SAVE_VERSION) {
    return sketch;
  }
  if (templateVersion > SAVE_VERSION) {
    throw new Error("Sketch is incompatible with this version of node painter. Please upgrade node Painter");
  }
  for (var i = templateVersion; i < UPGRADES.length; i++) {
    sketch = UPGRADES[i](sketch);
  }
  return sketch;
}

function redefineNodes(newIds: { [key: string]: string }, sketch: SketchTemplate): SketchTemplate {
  Object.values(sketch.nodes).forEach((node) => {
    if (newIds[node.type]) {
      node.type = newIds[node.type];
    }
  });
  return sketch;
}
