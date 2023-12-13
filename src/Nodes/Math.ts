import { Icon, IconAngle, IconCalculator, IconEaseInOut, IconGridDots, IconMath, IconMathFunction, IconMathMax, IconMathMin, IconMathSymbols, IconMathXDivideY, IconMathXMinusY, IconMathXPlusY, IconPercentage, IconSquareRoot2, IconVectorBezier2, IconWaveSawTool, IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { IconMathXy } from "@tabler/icons-react";
import { Vector, createVector } from "./Vector";
import { easing } from "ts-easing";
import { createPortConnection } from "../Data/createPortConnection";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const MathNodes: Array<NodeDefinition> = [
  createOperation("AddNumber", (a, b) => a + b, "Add two number together.", IconMathXPlusY, true),
  createOperation("SubtractNumber", (a, b) => a - b, "Subtract two number.", IconMathXMinusY, true),
  createOperation("MultiplyNumber", (a, b) => a * b, "Multiply two number together.", IconMathXy, true),
  createOperation("DivideNumber", (a, b) => a / b, "Divide two number.", IconMathXDivideY, true),
  createOperation("Modulo", (a, b) => a % b, "Give the remainder of the division of A by B.", IconPercentage),
  createOperation("Pow", (a, b) => a % b, "Raise A to the power of B.", IconMathXPlusY),
  createOperation("Max", Math.max, "Returne the biggest of two number.", IconMathMax, true),
  createOperation("Min", Math.min, "Returne the smallest of two number.", IconMathMin, true),
  createFunc("Cos", Math.cos, "Return the cosine of a number (in radian).", IconAngle),
  createFunc("Sin", Math.sin, "Return the sine of a number (in radian).", IconAngle),

  createFunc("SawtoothWaver", (a) => a % 1, "Return the number modulo 0", IconWaveSawTool),
  createFunc("Sqrt", Math.sqrt, "Return the square root of a number.", IconMath),
  createFunc("Abs", Math.abs, "Return the absolute root of a number.", IconMathFunction),
  createFunc("Acos", Math.acos, "Return the inverse cosine (in radian) of a number.", IconAngle),
  createFunc("Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle),
  createFunc("Atan", Math.atan, "Return the inverse tangent (in radian) of a number.", IconAngle),
  createFunc("Floor", Math.floor, "Round down a number to the largest interger smaller or equal to itself.", IconMathFunction),
  createFunc("Ceil", Math.ceil, "Round up a number to the smallest interger larger or equal to itself.", IconMathFunction),
  createFunc("Round", Math.round, "Round a number to the closest integer.", IconMathFunction),
  createFunc("Exp", Math.exp, "Return e to the power of a number.", IconMathFunction),
  createFunc("Log", Math.log, "Return the natural logarithm of a number (base e).", IconMathFunction),
  createFunc("Sign", Math.sign, "Return -1, 0 or 1 depending of the sign of a number.", IconMathFunction),
  createFunc("RadianToDegree", (a) => (a / 180) * Math.PI, "Convert an angle in radian into degree.", IconAngle),
  createFunc("DegreeToRadian", (a) => (a * 180) / Math.PI, "Convert an angle in degree into radian.", IconAngle),
  createFunc("Clamp01", (a) => Math.max(Math.min(a, 1), 0), "Constrict a number between 0 and 1.", IconMathFunction),
  createConstant("PI", Math.PI),
  createConstant("TAU", Math.PI * 2),
  createConstant("E", Math.E),
  createConstant("SQRT2", Math.SQRT2),
  {
    id: "Atan2",
    tags: ["Math"],
    icon: IconAngle,
    description: "Return the angle formed by the given coordinate and the horizontal axis.",
    dataInputs: [
      {
        id: "y",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "x",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var a = context.getInputValue(nodeData, "y");
        var b = context.getInputValue(nodeData, "x");
        return Math.atan2(a, b);
      }
    },
    execute: null,
  },
  {
    id: "SineWave",
    tags: ["Math"],
    icon: IconWaveSine,
    description: "Return the value of the sine wave with a phase, frequency and amplitude. Easier than using Cos",
    dataInputs: [
      {
        id: "time",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "phase",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "frequency",
        type: "number",
        defaultValue: 1,
      },
      {
        id: "amplitude",
        type: "number",
        defaultValue: 1,
      },
      {
        id: "positive",
        type: "bool",
        defaultValue: true,
      },
    ],
    dataOutputs: [
      {
        id: "output",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var time = context.getInputValue(nodeData, "time");
      var phase = context.getInputValue(nodeData, "phase");
      var frequency = context.getInputValue(nodeData, "frequency");
      var amplitude = context.getInputValue(nodeData, "amplitude");
      var positive = context.getInputValue(nodeData, "positive");
      var t = Math.cos(time * 2 * Math.PI * frequency + phase);
      return positive ? (t * 0.5 + 0.5) * amplitude : t * amplitude;
    },
    execute: null,
  },
  {
    id: "Clamp",
    tags: ["Math"],
    icon: IconMathFunction,
    description: "Constrain a number to be between two other number",
    dataInputs: [
      {
        id: "value",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "min",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "max",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var value = context.getInputValue(nodeData, "value");
        var min = context.getInputValue(nodeData, "min");
        var max = context.getInputValue(nodeData, "max");
        return Math.max(Math.min(value, max), min);
      }
    },
    execute: null,
  },
  {
    id: "Lerp",
    tags: ["Math"],
    icon: IconMathFunction,
    description: "Interpolate between two number according to another one",
    dataInputs: [
      {
        id: "t",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "min",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "max",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var t = context.getInputValue(nodeData, "t");
        var min = context.getInputValue(nodeData, "min");
        var max = context.getInputValue(nodeData, "max");
        return t * max + (1 - t) * min;
      }
    },
    execute: null,
  },
  {
    id: "PingPong",
    tags: ["Math"],
    icon: IconMathFunction,
    description: "Return a number alternating betwen min and max",
    dataInputs: [
      {
        id: "t",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "min",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "max",
        type: "number",
        defaultValue: 1,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var t = context.getInputValue(nodeData, "t");
        var min = context.getInputValue(nodeData, "min");
        var max = context.getInputValue(nodeData, "max");
        var alignedT = t - min;
        var range = max - min;
        var tt = alignedT % (2 * range);
        return tt >= range ? 2 * range - tt : tt;
      }
    },
    execute: null,
  },
  {
    id: "Remap",
    tags: ["Math"],
    icon: IconMathFunction,
    description: "Remap a number from one interval to the other",
    dataInputs: [
      {
        id: "t",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "in-min",
        type: "number",
        defaultValue: -1,
      },
      {
        id: "in-max",
        type: "number",
        defaultValue: 1,
      },
      {
        id: "out-min",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "out-max",
        type: "number",
        defaultValue: 1,
      },
      {
        id: "clamp",
        type: "bool",
        defaultValue: true,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var t = context.getInputValue(nodeData, "t");
      var inmin = context.getInputValue(nodeData, "in-min");
      var inmax = context.getInputValue(nodeData, "in-max");
      var outmin = context.getInputValue(nodeData, "out-min");
      var outmax = context.getInputValue(nodeData, "out-max");
      var clamp = context.getInputValue(nodeData, "clamp");
      var dt = (t - inmin) / (inmax - inmin);
      var r = dt * outmax + (1 - dt) * outmin;
      return clamp ? Math.min(outmax, Math.max(outmin, r)) : r;
    },
    execute: null,
  },
  {
    id: "Noise",
    tags: ["Math"],
    icon: IconGridDots,
    description: "return a semi random continous value between 0 and 1 for points in 2d. ",
    dataInputs: [
      { id: "pos", type: "vector2", defaultValue: createVector() },
      { id: "scale", type: "vector2", defaultValue: createVector(1, 1) },
      { id: "time", type: "number", defaultValue: 0 },
    ],
    dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var pos = context.getInputValue(nodeData, "pos");
        var scale = context.getInputValue(nodeData, "scale");
        var time = context.getInputValue(nodeData, "time");
        return context.p5.noise(pos.x * scale.x, pos.y * scale.y, time);
      }
    },
    execute: null,
  },
  {
    id: "LoopingNoise",
    tags: ["Math"],
    icon: IconGridDots,
    description: "return a semi random continous value between 0 and 1, looping around when in the interval [0,1] .",
    dataInputs: [
      { id: "pos", type: "number", defaultValue: 0 },
      { id: "scale", type: "number", defaultValue: 1 },
      { id: "seed", type: "vector2", defaultValue: createVector(0, 0) },
    ],
    dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var pos = context.getInputValue(nodeData, "pos");
      var scale = context.getInputValue(nodeData, "scale");
      var seed = context.getInputValue(nodeData, "seed");
      return context.p5.noise(seed.x + Math.cos(pos * Math.PI * 2) * scale, seed.y + Math.cos(pos * Math.PI * 2) * scale);
    },
    execute: null,
  },
  {
    id: "Easing",
    tags: ["Math"],
    icon: IconEaseInOut,
    description: "Apply one of the standard easing function to a number .",
    dataInputs: [{ id: "input", type: "number", defaultValue: 0 }],
    dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [
      {
        id: "easing",
        type: "dropdown",
        defaultValue: "quadratic",
        options: ["linear", "quadratic", "cubic", "elastic", "inQuad", "outQuad", "inOutQuad", "inCubic", "outCubic", "inOutCubic", "inQuart", "outQuart", "inOutQuart", "inQuint", "outQuint", "inOutQuint", "inSine", "outSine", "inOutSine", "inExpo", "outExpo", "inOutExpo", "inCirc", "outCirc", "inOutCirc"],
      },
    ],

    getData: (portId, nodeData, context) => {
      var input = context.getInputValue(nodeData, "input");
      var funcName = nodeData.settings.easing as string;
      var func = (easing as any)[funcName];
      if (func !== undefined) {
        return func(input) as number;
      } else {
        return input;
      }
    },
    execute: null,
  },
  {
    id: "EvaluateBezier",
    description: "Draw a bezier curve, from start to end, with control point cp1 and cp2",
    icon: IconVectorBezier2,
    tags: ["Draw"],
    dataInputs: [
      {
        id: "t",
        type: "number",
        defaultValue: 10,
      },
      {
        id: "start",
        type: "vector2",
        defaultValue: createVector(100, 200),
      },
      {
        id: "cp1",
        type: "vector2",
        defaultValue: createVector(200, 100),
      },
      {
        id: "cp2",
        type: "vector2",
        defaultValue: createVector(200, 300),
      },
      {
        id: "end",
        type: "vector2",
        defaultValue: createVector(300, 200),
      },
    ],
    dataOutputs: [
      { id: "point", type: "vector2", defaultValue: createVector() },
      { id: "tangent", type: "vector2", defaultValue: createVector() },
    ],
    executeOutputs: [],
    settings: [],
    canBeExecuted: true,
    getData: (portId, data, context) => {
      var t = context.getInputValue(data, "t") as number;
      var start = context.getInputValue(data, "start") as Vector;
      var p1 = context.getInputValue(data, "cp1") as Vector;
      var p2 = context.getInputValue(data, "cp2") as Vector;
      var end = context.getInputValue(data, "end") as Vector;
      if (portId === "point") {
        return createVector(context.p5.bezierPoint(start.x, p1.x, p2.x, end.x, t), context.p5.bezierPoint(start.y, p1.y, p2.y, end.y, t));
      }
      if (portId === "tangent") {
        return createVector(context.p5.bezierTangent(start.x, p1.x, p2.x, end.x, t), context.p5.bezierTangent(start.y, p1.y, p2.y, end.y, t));
      }
    },
    execute: null,
  },
];

function createOperation(id: string, evalOperation: (a: any, b: any) => any, description?: string, icon?: Icon, allowMoreInput?: boolean): NodeDefinition {
  var result: NodeDefinition = {
    id: id,
    tags: ["Math"],
    icon: icon || IconMathSymbols,
    description: description,
    dataInputs: [
      {
        id: "a",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "b",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (allowMoreInput) {
        const key = Object.keys(nodeData.dataInputs);
        let start = context.getInputValue(nodeData, key[0]);
        for (let i = 1; i < key.length; i++) {
          start = evalOperation(start, context.getInputValue(nodeData, key[i]));
        }
        return start;
      } else {
        const a = context.getInputValue(nodeData, "a");
        const b = context.getInputValue(nodeData, "b");
        return evalOperation(a, b);
      }
    },
    execute: null,
  };
  if (allowMoreInput) {
    result.contextMenu = {
      "Add more input": (node) => {
        var count = Object.keys(node.dataInputs).length;
        if (count >= ALPHABET.length) {
          return;
        }
        var key = ALPHABET[count];
        node.dataInputs[key] = createPortConnection({
          id: key,
          type: "number",
          defaultValue: 0,
        });
      },
      "Remove last input": (node) => {
        var count = Object.keys(node.dataInputs).length;
        if (count <= 2) {
          return;
        }
        var key = ALPHABET[count - 1];
        delete node.dataInputs[key];
      },
    };
  }
  return result;
}

function createFunc(id: string, evalOperation: (input: any) => any, description?: string, icon?: Icon): NodeDefinition {
  return {
    id: id,
    tags: ["Math"],
    icon: icon || IconSquareRoot2,
    description: description,
    dataInputs: [
      {
        id: "input",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var a = context.getInputValue(nodeData, "input");
        return evalOperation(a);
      }
    },
    execute: null,
  };
}

function createConstant(id: string, value: number): NodeDefinition {
  return {
    id: id,
    icon: IconCalculator,
    description: `Mathematical constant. Approximately ${value.toPrecision(4)}.`,
    tags: ["Math", "constant"],
    dataInputs: [],
    dataOutputs: [
      {
        id: "value",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "value") {
        return value;
      }
    },
    execute: null,
  };
}
