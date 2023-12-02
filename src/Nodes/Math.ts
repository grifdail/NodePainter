import { Icon, IconAngle, IconCalculator, IconEaseInOut, IconGridDots, IconMath, IconMathFunction, IconMathMax, IconMathMin, IconMathSymbols, IconMathXDivideY, IconMathXMinusY, IconMathXPlusY, IconPercentage, IconSquareRoot2, IconWaveSawTool, IconWaveSine } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { AddNode } from "../Data/NodeLibrary";
import { IconMathXy } from "@tabler/icons-react";
import { createVector } from "./Vector";
import { easing } from "ts-easing";

AddNode(createOperation("AddNumber", (a, b) => a + b, "Add two number together.", IconMathXPlusY));
AddNode(createOperation("SubtractNumber", (a, b) => a - b, "Subtract two number.", IconMathXMinusY));
AddNode(createOperation("MultiplyNumber", (a, b) => a * b, "Multiply two number together.", IconMathXy));
AddNode(createOperation("DivideNumber", (a, b) => a / b, "Divide two number.", IconMathXDivideY));
AddNode(createOperation("Modulo", (a, b) => a % b, "Give the remainder of the division of A by B.", IconPercentage));
AddNode(createOperation("Pow", (a, b) => a % b, "Raise A to the power of B.", IconMathXPlusY));
AddNode(createOperation("Max", Math.max, "Returne the biggest of two number.", IconMathMax));
AddNode(createOperation("Min", Math.min, "Returne the smallest of two number.", IconMathMin));
AddNode(createFunc("Cos", Math.cos, "Return the cosine of a number (in radian).", IconAngle));
AddNode(createFunc("Sin", Math.sin, "Return the sine of a number (in radian).", IconAngle));
AddNode(createFunc("SinWave", (a) => Math.sin(a * Math.PI * 2) * 0.5 + 0.5, "Return the cosine of the value in the interval [0,1] and with a frequency of 1.", IconWaveSine));
AddNode(createFunc("SawtoothWaver", (a) => a % 1, "Return the number modulo 0", IconWaveSawTool));
AddNode(createFunc("Sqrt", Math.sqrt, "Return the square root of a number.", IconMath));
AddNode(createFunc("Abs", Math.abs, "Return the absolute root of a number.", IconMathFunction));
AddNode(createFunc("Acos", Math.acos, "Return the inverse cosine (in radian) of a number.", IconAngle));
AddNode(createFunc("Asin", Math.asin, "Return the inverse sine (in radian) of a number.", IconAngle));
AddNode(createFunc("Atan", Math.atan, "Return the inverse tangent (in radian) of a number.", IconAngle));
AddNode(createFunc("Floor", Math.floor, "Round down a number to the largest interger smaller or equal to itself.", IconMathFunction));
AddNode(createFunc("Ceil", Math.ceil, "Round up a number to the smallest interger larger or equal to itself.", IconMathFunction));
AddNode(createFunc("Round", Math.round, "Round a number to the closest integer.", IconMathFunction));
AddNode(createFunc("Exp", Math.exp, "Return e to the power of a number.", IconMathFunction));
AddNode(createFunc("Log", Math.log, "Return the natural logarithm of a number (base e).", IconMathFunction));
AddNode(createFunc("Sign", Math.sign, "Return -1, 0 or 1 depending of the sign of a number.", IconMathFunction));
AddNode(createFunc("RadianToDegree", (a) => (a / 180) * Math.PI, "Convert an angle in radian into degree.", IconAngle));
AddNode(createFunc("DegreeToRadian", (a) => (a * 180) / Math.PI, "Convert an angle in degree into radian.", IconAngle));
AddNode(createFunc("Clamp01", (a) => Math.max(Math.min(a, 1), 0), "Constrict a number between 0 and 1.", IconMathFunction));
AddNode(createConstant("PI", Math.PI));
AddNode(createConstant("TAU", Math.PI * 2));
AddNode(createConstant("E", Math.E));
AddNode(createConstant("SQRT2", Math.SQRT2));
AddNode({
  id: "Atan2",
  tags: ["math"],
  icon: IconAngle,
  description: "Return the angle formed by the given coordinate and the horizontal axis.",
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var a = context.getInputValue(nodeData, "y");
      var b = context.getInputValue(nodeData, "x");
      return Math.atan2(a, b);
    }
  },
  execute: null,
});
AddNode({
  id: "Clamp",
  tags: ["math"],
  icon: IconMathFunction,
  description: "Constrain a number to be between two other number",
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
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
});

AddNode({
  id: "Lerp",
  tags: ["math"],
  icon: IconMathFunction,
  description: "Interpolate between two number according to another one",
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
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
});
AddNode({
  id: "PingPong",
  tags: ["math"],
  icon: IconMathFunction,
  description: "Return a number alternating betwen min and max",
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
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
});

AddNode({
  id: "Remap",
  tags: ["math"],
  icon: IconMathFunction,
  description: "Remap a number from one interval to the other",
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
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
});

AddNode({
  id: "Noise",
  tags: ["math"],
  icon: IconGridDots,
  description: "return a semi random continous value between 0 and 1 for points in 2d. ",
  inputPorts: [
    { id: "pos", type: "vector2", defaultValue: createVector() },
    { id: "scale", type: "vector2", defaultValue: createVector(1, 1) },
    { id: "time", type: "number", defaultValue: 0 },
  ],
  outputPorts: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
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
});

AddNode({
  id: "LoopingNoise",
  tags: ["math"],
  icon: IconGridDots,
  description: "return a semi random continous value between 0 and 1, looping around when in the interval [0,1] .",
  inputPorts: [
    { id: "pos", type: "number", defaultValue: 0 },
    { id: "scale", type: "number", defaultValue: 1 },
    { id: "seed", type: "vector2", defaultValue: createVector(0, 0) },
  ],
  outputPorts: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var pos = context.getInputValue(nodeData, "pos");
    var scale = context.getInputValue(nodeData, "scale");
    var seed = context.getInputValue(nodeData, "seed");
    return context.p5.noise(seed.x + Math.cos(pos * Math.PI * 2) * scale, seed.y + Math.cos(pos * Math.PI * 2) * scale);
  },
  execute: null,
});

AddNode({
  id: "Easing",
  tags: ["math"],
  icon: IconEaseInOut,
  description: "Apply one of the standard easing function to a number .",
  inputPorts: [{ id: "input", type: "number", defaultValue: 0 }],
  outputPorts: [{ id: "result", type: "number", defaultValue: 0 }],
  executeOutputPorts: [],
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
});

function createOperation(id: string, evalOperation: (a: any, b: any) => any, description?: string, icon?: Icon): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
    icon: icon || IconMathSymbols,
    description: description,
    inputPorts: [
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
    outputPorts: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputPorts: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var a = context.getInputValue(nodeData, "a");
        var b = context.getInputValue(nodeData, "b");
        return evalOperation(a, b);
      }
    },
    execute: null,
  };
}

function createFunc(id: string, evalOperation: (input: any) => any, description?: string, icon?: Icon): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
    icon: icon || IconSquareRoot2,
    description: description,
    inputPorts: [
      {
        id: "input",
        type: "number",
        defaultValue: 0,
      },
    ],
    outputPorts: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputPorts: [],
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
    tags: ["math", "constant"],
    inputPorts: [],
    outputPorts: [
      {
        id: "value",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputPorts: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "value") {
        return value;
      }
    },
    execute: null,
  };
}
