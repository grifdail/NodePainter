import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { genShader } from "./genShader";

export type Vector2 = [number, number];

export const createVector2 = (x: number = 0, y: number = 0): Vector2 => [x, y];

export const VectorNodes: Array<NodeDefinition> = [
  {
    id: "VectorCompose",
    description: "Create a vector from a set of coordinate",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "x",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "y",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "vec") {
        var x = context._getInputValue<number>(nodeData, "x", "number");
        var y = context._getInputValue<number>(nodeData, "y", "number");
        return createVector2(x, y);
      }
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "vec", ["x", "y"], ([x, y]) => `vec4(${x}, ${y}, 0.0, 0.0)`);
    },
  },
  {
    id: "VectorDecompose",
    description: "split a vector into its individual components",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "x",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "y",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var vec = context.getInputValueVector(nodeData, "vec");
      if (portId === "x") {
        return vec[0];
      }
      if (portId === "y") {
        return vec[1];
      }
    },
    getShaderCode(node, context) {
      return `float ${context.getShaderVar(node, "x", true)} = ${context.getShaderVar(node, "vec")}.x;
float ${context.getShaderVar(node, "y", true)} = ${context.getShaderVar(node, "vec")}.y;`;
    },
  },
  {
    id: "VectorFromAngle",
    description: "Create a vector based on an Angle and a magnitude",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "angle",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "length",
        type: "number",
        defaultValue: 1,
      },
    ],
    dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector2() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "vec") {
        var angle = context.getInputValueNumber(nodeData, "angle");
        var length = context.getInputValueNumber(nodeData, "length");
        return createVector2(Math.cos(angle) * length, Math.sin(angle) * length);
      }
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "vec", ["angle", "length"], ([angle, length]) => `vec4(cos(${angle}) * ${length}, sin(${angle}) * ${length},0.0,0.0)`);
    },
  },
  {
    id: "Magnitude",
    description: "Return the length of a vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "length",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var vec = context.getInputValueVector(nodeData, "vec");
      return VectorMagnitude(vec);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "float", "length", ["vec"], ([vec]) => `length(${vec})`);
    },
  },
  {
    id: "SquareMagnitude",
    description: "Return the squared length of a vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "length",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var vec = context.getInputValueVector(nodeData, "vec");
      return VectorSquareMagnitude(vec);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "float", "length", ["vec"], ([vec]) => `${vec}.x * ${vec}.x + ${vec}.y * ${vec}.y`);
    },
  },
  {
    id: "AddVector",
    description: "Add two Vector together",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      var b = context.getInputValueVector(nodeData, "b");
      return VectorAddition(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `${a} + ${b}`);
    },
  },
  {
    id: "SubtractVector",
    description: "Subtract two Vector together",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      var b = context.getInputValueVector(nodeData, "b");
      return VectorSubstraction(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `${a} - ${b}`);
    },
  },
  {
    id: "ScaleVector",
    description: "Scale a Vector by a scalar",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "scale",
        type: "number",
        defaultValue: 1,
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "vec");
      var b = context.getInputValueNumber(nodeData, "scale");
      return a.map((value) => value * b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["vec", "scale"], ([a, b]) => `${a} * ${b}`);
    },
  },
  {
    id: "UnitVector",
    description: "Scale a Vector by a scalar",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "vec");
      var length = VectorMagnitude(a);
      return a.map((comp) => comp / length);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["vec"], ([a]) => `normalize(${a})`);
    },
  },
  {
    id: "RotateVector",
    description: "Rotate a Vector by a scalar in radiant",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "vec",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "angle",
        type: "number",
        defaultValue: 1,
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "vec");
      var b = context.getInputValueNumber(nodeData, "angle");
      var cos = Math.cos(b);
      var sin = Math.sin(b);
      return createVector2(a[0] * cos + a[1] * sin, a[0] * sin + a[1] * cos);
    },
  },
  {
    id: "MultiplyComponentVector",
    description: "Scale each component of two vector together",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      var b = context.getInputValueVector(nodeData, "b");
      return VectorMultiplication(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `vec4(${a}.x * ${b}.x, ${a}.y * ${b}.y, 0.0, 0.0)`);
    },
  },
  {
    id: "DivideComponentVector",
    description: "Scale each component of two vector together",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector2(1, 1),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      var b = context.getInputValueVector(nodeData, "b");
      return VectorDivision(a, b);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `vec4(${a}.x * ${b}.x, ${a}.y * ${b}.y, 0.0, 0.0)`);
    },
  },
  {
    id: "DotProduct",
    description: "Return the dot product of two vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    dataOutputs: [
      {
        id: "dot",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      var b = context.getInputValueVector(nodeData, "b");
      return zipVector(a, b).reduce((sum, comp) => sum + comp.reduce((old, value) => old * value, 1), 0);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "float", "dot", ["a", "b"], ([a, b]) => `dot(${a}, ${b})`);
    },
  },
  {
    id: "LerpVector",
    description: "interpolate between 2 vector",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "from",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "to",
        type: "vector2",
        defaultValue: createVector2(),
      },
      {
        id: "t",
        type: "number",
        defaultValue: 0.5,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "vector2",
        defaultValue: createVector2(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "from");
      var b = context.getInputValueVector(nodeData, "to");
      var t = context.getInputValueNumber(nodeData, "t");
      return VectorLerp(a, b, t);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "result", ["from", "to", "t"], ([from, to, t]) => `mix(${from}, ${to}, ${t})`);
    },
  },
];

export function VectorDivision(a: number[], b: number[]): any {
  return VectorComponentOperation(1, (old, value) => old / value, a, b);
}

export function VectorSubstraction(a: number[], b: number[]): number[] {
  return VectorComponentOperation(0, (a, b) => a - b, a, b);
}

export function VectorAddition(a: number[], b: number[]): number[] {
  return VectorComponentOperation(0, (old, value) => old + value, a, b);
}

export function VectorMultiplication(a: number[], b: number[]): number[] {
  return VectorComponentOperation(1, (old, value) => old * value, a, b);
}

export function VectorLerp(a: number[], b: number[], t: number): number[] {
  return zipVector(a, b).map(([a, b]) => lerp(a, b, t));
}

export function VectorMagnitude(vec: number[]): any {
  return Math.sqrt(VectorSquareMagnitude(vec));
}

export function VectorSquareMagnitude(vec: number[]): number {
  return vec.reduce((old, b) => old + b * b, 0);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export const zip = <T>(filler: T, ...arr: T[][]) =>
  Array(Math.max(...arr.map((a) => a.length)))
    .fill(null)
    .map((_, i) => arr.map((array) => (i < array.length ? array[i] : filler)));

export const zipVector = (...arr: number[][]) => zip(0, ...arr);

export const VectorComponentOperation = (start: number, fn: (a: number, b: number) => number, ...vector: number[][]) => zipVector(...vector).map((params) => params.reduce(fn, start));
