import { Icon, IconArrowUpRightCircle, IconAssembly, IconBrush, IconBucketDroplet } from "@tabler/icons-react";
import { AddNode } from "../Data/NodeLibrary";
import { getInputValue } from "../Data/NodeDefinition";
import * as p5 from "p5";

const createVector = p5.prototype.createVector;

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
      var x = getInputValue(nodeData, "x", context);
      var y = getInputValue(nodeData, "y", context);
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
    var vec = getInputValue(nodeData, "x", context);
    if (portId === "x") {
      var x = vec.x;
    }
    if (portId === "y") {
      var x = vec.y;
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
      var angle = getInputValue(nodeData, "angle", context);
      var length = getInputValue(nodeData, "length", context);
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
    var vec = getInputValue(nodeData, "vec", context) as p5.Vector;
    return vec.mag();
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
    var vec = getInputValue(nodeData, "vec", context) as p5.Vector;
    return vec.magSq();
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
    var a = getInputValue(nodeData, "a", context) as p5.Vector;
    var b = getInputValue(nodeData, "b", context) as p5.Vector;
    return p5.Vector.add(a, b);
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
    var a = getInputValue(nodeData, "a", context) as p5.Vector;
    var b = getInputValue(nodeData, "b", context) as p5.Vector;
    return p5.Vector.sub(a, b);
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
    var a = getInputValue(nodeData, "vec", context) as p5.Vector;
    var b = getInputValue(nodeData, "scale", context) as number;
    return createVector(a.x * b, a.y * b);
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
    var a = getInputValue(nodeData, "a", context) as p5.Vector;
    var b = getInputValue(nodeData, "b", context) as p5.Vector;
    return p5.Vector.dot(a, b);
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
    var a = getInputValue(nodeData, "from", context) as p5.Vector;
    var b = getInputValue(nodeData, "to", context) as p5.Vector;
    var t = getInputValue(nodeData, "t", context) as number;
    return p5.Vector.lerp(a, b, t);
  },
  execute: null,
});
