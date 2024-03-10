import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition, createDefaultValue } from "../Data/NodeDefinition";
import { genShader } from "./genShader";
import { useTree } from "../Hooks/useTree";
import { canConvert } from "../Data/convertTypeValue";
import { createVector2, createVector3 } from "./vectorDataType";
import { VectorMagnitude, VectorSquareMagnitude, VectorAddition, VectorSubstraction, VectorMultiplication, VectorDivision, zipVector, VectorLerp } from "./vectorUtils";
import { original } from "immer";

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
        type: "vector",
        defaultValue: createVector2(),
      },
      {
        id: "b",
        type: "vector",
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
    bindPort(portId, self, outputPorts, selfPosition) {
      if (portId === "a") {
        console.log(original(self));
        console.log(self.dataInputs);
        self.dataInputs["a"].type = outputPorts.type;
        if (!canConvert(self.dataInputs["b"].type, outputPorts.type)) {
          useTree.getState().removeDataConnection(self.id, "b");
        }
        self.dataInputs["b"].type = outputPorts.type;
        self.dataInputs["a"].ownValue = createDefaultValue(outputPorts.type);
        self.dataInputs["b"].ownValue = createDefaultValue(outputPorts.type);
        self.dataOutputs["out"].type = outputPorts.type;
      }
      return true;
    },
    unbindPort(portId, self, selfPosition) {
      if (portId === "a") {
        if (self.dataInputs["b"].hasConnection) {
          self.dataInputs["a"].connectedNode = self.dataInputs["b"].connectedNode;
          self.dataInputs["a"].connectedPort = self.dataInputs["b"].connectedPort;
          self.dataInputs["a"].hasConnection = self.dataInputs["b"].hasConnection;
          self.dataInputs["b"].hasConnection = false;
          self.dataInputs["a"].type = useTree.getState().getOutputPort(self.dataInputs["a"].connectedNode as string, self.dataInputs["a"].connectedPort as string).type;
          self.dataInputs["a"].ownValue = createDefaultValue(self.dataInputs["a"].type);
          self.dataInputs["b"].ownValue = createDefaultValue(self.dataInputs["a"].type);
          self.dataOutputs["out"].type = self.dataInputs["a"].type;
        } else {
          self.dataInputs["a"].type = "vector";
          self.dataInputs["b"].type = "vector";
          self.dataOutputs["out"].type = "vector";
          self.dataInputs["a"].ownValue = createDefaultValue("vector");
          self.dataInputs["b"].ownValue = createDefaultValue("vector");
        }
      }
      return true;
    },
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
    id: "VvvVector3",
    description: "test",
    icon: IconArrowUpRightCircle,
    tags: ["Vector"],
    dataInputs: [
      {
        id: "a",
        type: "vector3",
        defaultValue: createVector3(),
      },
    ],
    dataOutputs: [
      {
        id: "out",
        type: "vector3",
        defaultValue: createVector3(),
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var a = context.getInputValueVector(nodeData, "a");
      return a;
    },
    getShaderCode(node, context) {
      return genShader(node, context, "vec4", "out", ["a", "b"], ([a, b]) => `${a} - ${b}`);
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
