import { Icon, IconAngle, IconCalculator, IconEaseInOut, IconGridDots, IconMath, IconMathFunction, IconMathMax, IconMathMin, IconMathSymbols, IconMathXDivideY, IconMathXMinusY, IconMathXPlusY, IconPercentage, IconSquareRoot2, IconVectorBezier2, IconWaveSawTool, IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { IconMathXy } from "@tabler/icons-react";
import { Vector, createVector } from "./Vector";
import * as Easing from "../libs/easing";
import { createPortConnection } from "../Data/createPortConnection";
import { convertToShaderValue } from "../Data/convertToShaderValue";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const MathNodes: Array<NodeDefinition> = [
  createOperation(
    "AddNumber",
    (a, b) => a + b,
    "Add two number together.",
    IconMathXPlusY,
    true,
    (a, b) => `${a} + ${b}`
  ),
  createOperation(
    "SubtractNumber",
    (a, b) => a - b,
    "Subtract two number.",
    IconMathXMinusY,
    true,
    (a, b) => `${a} - ${b}`
  ),
  createOperation(
    "MultiplyNumber",
    (a, b) => a * b,
    "Multiply two number together.",
    IconMathXy,
    true,
    (a, b) => `${a} * ${b}`
  ),
  createOperation(
    "DivideNumber",
    (a, b) => a / b,
    "Divide two number.",
    IconMathXDivideY,
    true,
    (a, b) => `${a} / ${b}`
  ),
  createOperation(
    "Modulo",
    (a, b) => a % b,
    "Give the remainder of the division of A by B.",
    IconPercentage,
    false,
    (a, b) => `${a} % ${b}`
  ),
  createOperation(
    "Pow",
    (a, b) => a % b,
    "Raise A to the power of B.",
    IconMathXPlusY,
    false,
    (a, b) => `pow(${a}, ${b})`
  ),
  createOperation("Max", Math.max, "Returne the biggest of two number.", IconMathMax, true, (a, b) => `max(${a}, ${b})`),
  createOperation("Min", Math.min, "Returne the smallest of two number.", IconMathMin, true, (a, b) => `min(${a}, ${b})`),
  createFunc("Cos", Math.cos, "Return the cosine of a number (in radian).", IconAngle, (a) => `cos(${a})`),
  createFunc("Sin", Math.sin, "Return the sine of a number (in radian).", IconAngle, (a) => `sin(${a})`),

  createFunc(
    "SawtoothWaver",
    (a) => a % 1,
    "Return the number modulo 0",
    IconWaveSawTool,
    (a) => `mod(${a}, 1)`
  ),
  createFunc("Sqrt", Math.sqrt, "Return the square root of a number.", IconMath, (a) => `sqrt(${a})`),
  createFunc("Abs", Math.abs, "Return the absolute root of a number.", IconMathFunction, (a) => `abs(${a})`),
  createFunc("Acos", Math.acos, "Return the inverse cosine (in radian) of a number.", IconAngle, (a) => `acos(${a})`),
  createFunc("Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle, (a) => `asin(${a})`),
  createFunc("Atan", Math.atan, "Return the inverse tangent (in radian) of a number.", IconAngle, (a) => `atan(${a})`),
  createFunc("Floor", Math.floor, "Round down a number to the largest interger smaller or equal to itself.", IconMathFunction, (a) => `floor(${a})`),
  createFunc("Ceil", Math.ceil, "Round up a number to the smallest interger larger or equal to itself.", IconMathFunction, (a) => `ceil(${a})`),
  createFunc("Round", Math.round, "Round a number to the closest integer.", IconMathFunction),
  createFunc("Exp", Math.exp, "Return e to the power of a number.", IconMathFunction, (a) => `exp(${a})`),
  createFunc("Log", Math.log, "Return the natural logarithm of a number (base e).", IconMathFunction, (a) => `log(${a})`),
  createFunc("Sign", Math.sign, "Return -1, 0 or 1 depending of the sign of a number.", IconMathFunction, (a) => `sign(${a})`),
  createFunc(
    "RadianToDegree",
    (a) => (a / 180) * Math.PI,
    "Convert an angle in radian into degree.",
    IconAngle,
    (a) => `degrees(${a})`
  ),
  createFunc(
    "DegreeToRadian",
    (a) => (a * 180) / Math.PI,
    "Convert an angle in degree into radian.",
    IconAngle,
    (a) => `radians(${a})`
  ),
  createFunc(
    "Clamp01",
    (a) => Math.max(Math.min(a, 1), 0),
    "Constrict a number between 0 and 1.",
    IconMathFunction,
    (a) => `clamp(${a}, 0.0, 1.0)`
  ),
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
      var trueMin = Math.min(outmax, outmin);
      var trueMax = Math.max(outmax, outmin);
      return clamp ? Math.min(trueMax, Math.max(trueMin, r)) : r;
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
        defaultValue: "easeInOutQuad",
        options: Object.keys(Easing),
      },
    ],

    getData: (portId, nodeData, context) => {
      var input = context.getInputValue(nodeData, "input");
      var funcName = nodeData.settings.easing as string;
      var func = (Easing as any)[funcName];
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
    description: "Evaluate a position on a bezier curve",
    icon: IconVectorBezier2,
    tags: ["Math"],
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
    canBeExecuted: false,
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

function createOperation(id: string, evalOperation: (a: any, b: any) => any, description?: string, icon?: Icon, allowMoreInput?: boolean, shaderCode?: (a: string, b: string) => string): NodeDefinition {
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
    getShaderCode(node, context) {
      if (shaderCode) {
        if (allowMoreInput) {
          const key = Object.keys(node.dataInputs);
          let start = context.getShaderVar(node, key[0]);
          for (let i = 1; i < key.length; i++) {
            start = shaderCode(`(${start})`, context.getShaderVar(node, key[i]));
          }
          return `float ${context.getShaderVar(node, "result", true)} = ${start};`;
        } else {
          return `float ${context.getShaderVar(node, "result", true)} = ${shaderCode(context.getShaderVar(node, "a"), context.getShaderVar(node, "b"))};`;
        }
      }
      return "";
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

function createFunc(id: string, evalOperation: (input: any) => any, description?: string, icon?: Icon, shaderCode?: (v: string) => string): NodeDefinition {
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
    getShaderCode(node, context) {
      if (shaderCode) {
        return `float ${context.getShaderVar(node, "result", true)} = ${shaderCode(context.getShaderVar(node, "input"))};`;
      }
      return "";
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
    getShaderCode(node, context) {
      return `float ${context.getShaderVar(node, "value", true)} = ${convertToShaderValue(value, "number")};`;
    },
    execute: null,
  };
}
