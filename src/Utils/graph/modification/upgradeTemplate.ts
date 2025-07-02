import { SketchTemplate } from "../../../Types/SketchTemplate";

type UpgradeFunction = (sketch: SketchTemplate) => SketchTemplate;

const UPGRADES: UpgradeFunction[] = [
  (sketch) => {
    return redefineNodes(
      {
        // Array
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
        // Color Gradient
        GenerateGradient: "Color/Gradient/Dynamic",
        GradientFromArray: "Color/Gradient/FromArray",
        Gradient: "Color/Gradient/Gradient",
        SampleGradient: "Color/Gradient/Sample",
        //Color
        HSL: "Color/HSL",
        HSV: "Color/HSV",
        Palette: "Color/Palette",
        SetAlpha: "Color/SetAlpha",
        //Draw
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
        //Effect
        BlurEffect: "Effect/BlurEffect",
        FlatColorEffect: "Effect/FlatColorEffect",
        BloomEffect: "Effect/BloomEffect",
        //Image
        UsePatternImage: "Image/UsePatternImage",
        UseParticleImage: "Image/UseParticleImage",
        UploadImage: "Image/UploadImage",
        PrecomputeImage: "Image/PrecomputeImage",
        PaintImage: "Image/PaintImage",
        ImageDimension: "Image/Dimension",
        DrawImageWithTint: "Image/DrawImageWithTint",
        DrawImagePart: "Image/DrawImagePart",
        DrawImage: "Image/DrawImage",
        //Input
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
        RecordBezierPath: "Input/RecordBezierPath",
        RecordPath: "Input/RecordPath",
        Time: "Input/Time",
        //Logic
        And: "Logic/And",
        Compare: "Logic/Compare",
        Not: "Logic/Not",
        Or: "Logic/Or",
        xOr: "Logic/xOr",
        //Math Advance Operation
        Abs: "Math/Abs",
        Ceil: "Math/Ceil",
        Clamp: "Math/Clamp",
        Clamp01: "Math/Clamp01",
        Exp: "Math/Exp",
        Floor: "Math/Floor",
        Log: "Math/Log",
        MathExpression: "Math/Expression",
        Max: "Math/Max",
        Min: "Math/Min",
        OneMinus: "Math/OneMinus",
        PingPong: "Math/PingPong",
        Sqrt: "Math/Sqrt",
        Step: "Math/Step",
        Pow: "Math/Pow",
        Round: "Math/Round",
        Sign: "Math/Sign",
        //Math Basic Operation
        Add: "Math/Basic/Addition",
        Divide: "Math/Basic/Division",
        Subtract: "Math/Basic/Subtraction",
        Multiply: "Math/Basic/Multiplication",
        Scale: "Math/Basic/Scale",
        ScaleAdd: "Math/Basic/ScaleAdd",
        Modulo: "Math/Modulo",
        Remainder: "Math/Remainder",
        //Math Interpolation
        Easing: "Math/Easing",
        Envelope: "Math/Envelope",
        EvaluateBezier: "Math/EvaluateBezier",
        ExponantialImpulse: "Math/ExponantialImpulse",
        IntegrateVelocity: "Math/IntegrateVelocity",
        Remap: "Math/Remap",
        SmoothStep: "Math/SmoothStep",
        //Math Quaternion
        AlignRotation: "Math/Quaternion/AlignRotation",
        AxisAngle: "Math/Quaternion/AxisAngle",
        EulerAngle: "Math/Quaternion/EulerAngle",
        LookAtRotation: "Math/Quaternion/LookAtRotation",
        QuaternionInverse: "Math/Quaternion/Inverse",
        //Math Trigonmetry
        Asin: "Math/Trigonometry/Asin",
        Atan: "Math/Trigonometry/ATan",
        Atan2: "Math/Trigonometry/ATan2",
        Cos: "Math/Trigonometry/Cos",
        DegreeToRadian: "Math/Trigonometry/DegreeToRadian",
        RadianToDegree: "Math/Trigonometry/RadianToDegree",
        Sin: "Math/Trigonometry/Sin",
        //Math Vector
        //Math Wave
        SawToothWave: "Math/Wave/SawToothWave",
        SineWave: "Math/Wave/SineWave",
        SquareWave: "Math/Wave/SquareWave",
        TrapezoidWave: "Math/Wave/TrapezoidWave",
        TriangleWave: "Math/Wave/TriangleWave",
        //Misc Render
        RenderWithBlending: "Misc/Render/Blending",
        RenderWithMask: "Misc/Render/Mask",
        RenderWithRotation: "Misc/Render/Rotation",
        RenderWithScale: "Misc/Render/Scale",
        RenderWithShadow: "Misc/Render/Shadow",
        RenderWithTranslation: "Misc/Render/Translation",
        // Misc Combine
        Combine: "Misc/Combine/Static",
        CombineArray: "Misc/Combine/Array",
        CombineGridLoop: "Misc/Combine/GridLoop",
        CombineLoop: "Misc/Combine/CombineLoop",
        // Misc
        AreaComment: "Misc/AreaComment",
        Blackboard: "Misc/Blackboard",
        Cache: "Misc/Cache",
        Comment: "Misc/Comment",
        Value: "Misc/Value",
        //Procedural
        Checkerboard: "Procedural/Checkerboard",
        Twirl: "Procedural/Twirl",
        WorleyNoise: "Procedural/WorleyNoise",
        // Random
        Random: "Random/Value",
        RandomInt: "Random/RandomInt",
        RandomOnSphere: "Random/RandomOnSphere",
        SeededRandom: "Random/Seeded",
        LoopingNoise: "Random/LoopingNoise",
        Noise: "Random/Noise",
        PoissonDisk: "Math/PoissonDisk",
        //Shader Varying
        ["Shader/CameraDirection"]: "Shader/Varying/SampleTexture",
        ["Shader/CameraPosition"]: "Shader/Varying/CameraPosition",
        ["Shader/LocalNormal"]: "Shader/Varying/LocalNormal",
        ["Shader/LocalPosition"]: "Shader/Varying/LocalPosition",
        ["Shader/UV"]: "Shader/Varying/UV",
        ["Shader/ViewDirection"]: "Shader/Varying/ViewDirection",
        ["Shader/ViewNormal"]: "Shader/Varying/ViewNormal",
        ["Shader/ViewPosition"]: "Shader/Varying/ViewPosition",
        ["Shader/WorldNormal"]: "Shader/Varying/WorldNormal",
        ["Shader/WorldPosition"]: "Shader/Varying/WorldPosition",
        //Shader
        ["Sample Texture"]: "Shader/Varying/SampleTexture",
        //state
        Save: "State/Save",
        Previous: "State/Previous",
        EdgeNode: "State/EdgeNode",
        DetectThreshold: "State/DetectThreshold",
        DetectChange: "State/DetectChange",
        Counter: "State/Counter",
        Change: "State/Change",
        //Technical Struct
        ComposeStruct: "Technical/Struct/Compose",
        DecomposeStruct: "Technical/Struct/Decompose",
        // Technical Simulation
        CustomSimulation: "Technical/Simulation/Base",
        ["CustomSimulation-end"]: "Technical/Simulation/End",
        ["CustomSimulation-start"]: "Technical/Simulation/Start",
        // Technical Material Shader
        ShaderMaterial: "Technical/MaterialShader/Base",
        ["ShaderMaterial-end"]: "Technical/MaterialShader/End",
        ["ShaderMaterial-start"]: "Technical/MaterialShader/Start",
        // Technical Image Effect Shader
        RenderShader: "Technical/ImageEffectShader/Base",
        ["RenderShader-end"]: "Technical/ImageEffectShader/End",
        ["RenderShader-start"]: "Technical/ImageEffectShader/Start",
        // Technical Material Shader
        CustomFunction: "Technical/CustomFunction/Base",
        ["CustomFunction-end"]: "Technical/CustomFunction/End",
        ["CustomFunction-start"]: "Technical/CustomFunction/Start",
        //Text
        TextLength: "Text/Length",
        TextConcat: "Text/Concat",
        TextSlice: "Text/Slice",
        InterpolateText: "Text/InterpolateText",
        ToggleSwitch: "State/ToggleSwitch",
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
