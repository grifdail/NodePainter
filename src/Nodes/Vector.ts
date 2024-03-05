import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { genShader } from "./genShader";

export type Vector = { x: number; y: number };

export const createVector = (x: number = 0, y: number = 0): Vector => ({ x, y });

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
    dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "vec") {
        var x = context.getInputValue(nodeData, "x");
        var y = context.getInputValue(nodeData, "y");
        return createVector(x, y);
      }
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "vec", ["x", "y"], ([x, y]) => `vec2(${x}, ${y})`);
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
        defaultValue: createVector(),
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
      var vec = context.getInputValue(nodeData, "vec");
      if (portId === "x") {
        return vec.x;
      }
      if (portId === "y") {
        return vec.y;
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
    dataOutputs: [{ id: "vec", type: "vector2", defaultValue: createVector() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "vec") {
        var angle = context.getInputValue(nodeData, "angle");
        var length = context.getInputValue(nodeData, "length");
        return createVector(Math.cos(angle) * length, Math.sin(angle) * length);
      }
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "vec", ["angle", "length"], ([angle, length]) => `vec2(cos(${angle}) * ${length}, sin(${angle}) * ${length})`);
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
        defaultValue: createVector(),
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
      var vec = context.getInputValue(nodeData, "vec") as Vector;
      return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
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
        defaultValue: createVector(),
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
      var vec = context.getInputValue(nodeData, "vec") as Vector;
      return vec.x * vec.x + vec.y * vec.y;
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
        defaultValue: createVector(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "a") as Vector;
      var b = context.getInputValue(nodeData, "b") as Vector;
      return createVector(a.x + b.x, a.y + b.y);
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
        defaultValue: createVector(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "a") as Vector;
      var b = context.getInputValue(nodeData, "b") as Vector;
      return createVector(a.x - b.x, a.y - b.y);
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
        defaultValue: createVector(),
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
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "vec") as Vector;
      var b = context.getInputValue(nodeData, "scale") as number;
      return createVector(a.x * b, a.y * b);
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
        defaultValue: createVector(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "vec") as Vector;
      var length = Math.sqrt(a.x * a.x + a.y * a.y);
      return createVector(a.x / length, a.y / length);
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
        defaultValue: createVector(),
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
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "vec") as Vector;
      var b = context.getInputValue(nodeData, "angle") as number;
      var cos = Math.cos(b);
      var sin = Math.sin(b);
      return createVector(a.x * cos + a.y * sin, a.x * sin + a.y * cos);
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
        defaultValue: createVector(1, 1),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector(1, 1),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector2",
        defaultValue: createVector(1, 1),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "a") as Vector;
      var b = context.getInputValue(nodeData, "b") as Vector;
      return createVector(a.x * b.x, a.y * b.y);
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `vec2(${a}.x * ${b}.x, ${a}.y * ${b}.y)`);
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
        defaultValue: createVector(),
      },
      {
        id: "b",
        type: "vector2",
        defaultValue: createVector(),
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
      var a = context.getInputValue(nodeData, "a") as Vector;
      var b = context.getInputValue(nodeData, "b") as Vector;
      return a.x * b.x + a.y * b.y;
    },
    getShaderCode(node, context) {
      return genShader(node, context, "float", "out", ["vec", "scale"], ([a, b]) => `dot(${a}, ${b})`);
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
        defaultValue: createVector(),
      },
      {
        id: "to",
        type: "vector2",
        defaultValue: createVector(),
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
        defaultValue: createVector(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "from") as Vector;
      var b = context.getInputValue(nodeData, "to") as Vector;
      var t = context.getInputValue(nodeData, "t") as number;
      return createVector(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["from", "to", "t"], ([from, to, t]) => `mix(${from}, ${to}, ${t})`);
    },
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
