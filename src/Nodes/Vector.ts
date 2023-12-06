import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";

export type Vector = { x: number; y: number };

export const createVector = (x: number = 0, y: number = 0): Vector => ({ x, y });

AddNode({
  id: "VectorCompose",
  description: "Create a vector from a set of coordinate",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [{ id: "vec", type: "vector2", defaultValue: createVector() }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "vec") {
      var x = context.getInputValue(nodeData, "x");
      var y = context.getInputValue(nodeData, "y");
      return createVector(x, y);
    }
  },
  execute: null,
});

AddNode({
  id: "VectorDecompose",
  description: "split a vector into its individual components",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  outputPorts: [
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
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValue(nodeData, "x");
    if (portId === "x") {
      return vec.x;
    }
    if (portId === "y") {
      return vec.y;
    }
  },
  execute: null,
});

AddNode({
  id: "VectorFromAngle",
  description: "Create a vector based on an Angle and a magnitude",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [{ id: "vec", type: "vector2", defaultValue: createVector() }],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    if (portId === "vec") {
      var angle = context.getInputValue(nodeData, "angle");
      var length = context.getInputValue(nodeData, "length");
      return createVector(Math.cos(angle) * length, Math.sin(angle) * length);
    }
  },
  execute: null,
});

AddNode({
  id: "Magnitude",
  description: "Return the length of a vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  outputPorts: [
    {
      id: "length",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValue(nodeData, "vec") as Vector;
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  },
  execute: null,
});
AddNode({
  id: "SquareMagnitude",
  description: "Return the squared length of a vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  outputPorts: [
    {
      id: "length",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValue(nodeData, "vec") as Vector;
    return vec.x * vec.x + vec.y * vec.y;
  },
  execute: null,
});

AddNode({
  id: "AddVector",
  description: "Add two Vector together",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a") as Vector;
    var b = context.getInputValue(nodeData, "b") as Vector;
    return createVector(a.x + b.x, a.y + b.y);
  },
  execute: null,
});

AddNode({
  id: "SubtractVector",
  description: "Subtract two Vector together",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a") as Vector;
    var b = context.getInputValue(nodeData, "b") as Vector;
    return createVector(a.x - b.x, a.y - b.y);
  },
  execute: null,
});

AddNode({
  id: "ScaleVector",
  description: "Scale a Vector by a scalar",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "vec") as Vector;
    var b = context.getInputValue(nodeData, "scale") as number;
    return createVector(a.x * b, a.y * b);
  },
  execute: null,
});

AddNode({
  id: "MultiplyComponentVector",
  description: "Scale each component of two vector together",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "out",
      type: "vector2",
      defaultValue: createVector(1, 1),
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a") as Vector;
    var b = context.getInputValue(nodeData, "b") as Vector;
    return createVector(a.x * b.x, a.y * b.y);
  },
  execute: null,
});

AddNode({
  id: "DotProduct",
  description: "Return the dot product of two vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "dot",
      type: "number",
      defaultValue: 0,
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "a") as Vector;
    var b = context.getInputValue(nodeData, "b") as Vector;
    return a.x * b.x + a.y * b.y;
  },
  execute: null,
});

AddNode({
  id: "LerpVector",
  description: "interpolate between 2 vector",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  inputPorts: [
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
  outputPorts: [
    {
      id: "result",
      type: "vector2",
      defaultValue: createVector(),
    },
  ],
  executeOutputPorts: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var a = context.getInputValue(nodeData, "from") as Vector;
    var b = context.getInputValue(nodeData, "to") as Vector;
    var t = context.getInputValue(nodeData, "t") as number;
    return createVector(lerp(a.x, b.x, t), lerp(a.y, b.y, t));
  },
  execute: null,
});

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
