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
