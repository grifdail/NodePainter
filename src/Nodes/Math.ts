import { NodeDefinition } from "../Data/NodeDefinition";
import { AddNode, NodeLibrary } from "../Data/NodeLibrary";

AddNode(createOperation("AddNumber", (a, b) => a + b));
AddNode(createOperation("SubtractNumber", (a, b) => a - b));
AddNode(createOperation("MultiplyNumber", (a, b) => a * b));
AddNode(createOperation("DivideNumber", (a, b) => a / b));
AddNode(createOperation("Modulo", (a, b) => a % b));
AddNode(createOperation("Pow", (a, b) => a % b));
AddNode(createOperation("Max", Math.max));
AddNode(createOperation("Pow", Math.min));
AddNode(createFunc("Cos", Math.cos));
AddNode(createFunc("Sin", Math.sin));
AddNode(createFunc("Sqrt", Math.sqrt));
AddNode(createFunc("Abs", Math.abs));
AddNode(createFunc("Acos", Math.acos));
AddNode(createFunc("Asin", Math.asin));
AddNode(createFunc("Atan", Math.atan));
AddNode(createFunc("Floor", Math.floor));
AddNode(createFunc("Ceil", Math.ceil));
AddNode(createFunc("Round", Math.round));
AddNode(createFunc("Exp", Math.exp));
AddNode(createFunc("Log", Math.log));
AddNode(createFunc("Sign", Math.sign));
AddNode(createFunc("RadianToDegree", (a) => (a / 180) * Math.PI));
AddNode(createFunc("DegreeToRadian", (a) => (a * 180) / Math.PI));
AddNode(createFunc("Clamp01", (a) => Math.max(Math.min(a, 1), 0)));
AddNode(createConstant("PI", Math.PI));
AddNode(createConstant("TAU", Math.PI * 2));
AddNode(createConstant("E", Math.E));
AddNode(createConstant("SQRT2", Math.SQRT2));
AddNode({
  id: "Atan2",
  tags: ["math"],
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
  getData: (portId, nodeData, tree) => {
    if (portId === "result") {
      var a = nodeData.inputs.y.getValue(tree);
      var b = nodeData.inputs.x.getValue(tree);
      return Math.atan2(a, b);
    }
  },
  execute: null,
});
AddNode({
  id: "Clamp",
  tags: ["math"],
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
  getData: (portId, nodeData, tree) => {
    if (portId === "result") {
      var value = nodeData.inputs.value.getValue(tree);
      var min = nodeData.inputs.min.getValue(tree);
      var max = nodeData.inputs.max.getValue(tree);
      return Math.max(Math.min(value, max), min);
    }
  },
  execute: null,
});

AddNode({
  id: "Lerp",
  tags: ["math"],
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
  getData: (portId, nodeData, tree) => {
    if (portId === "result") {
      var t = nodeData.inputs.t.getValue(tree);
      var min = nodeData.inputs.min.getValue(tree);
      var max = nodeData.inputs.max.getValue(tree);
      return t * max + (1 - t) * min;
    }
  },
  execute: null,
});

function createOperation(id: string, evalOperation: (a: any, b: any) => any): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
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
    getData: (portId, nodeData, tree) => {
      if (portId === "result") {
        var a = nodeData.inputs.a.getValue(tree);
        var b = nodeData.inputs.b.getValue(tree);
        return evalOperation(a, b);
      }
    },
    execute: null,
  };
}

function createFunc(id: string, evalOperation: (input: any) => any): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
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
    getData: (portId, nodeData, tree) => {
      if (portId === "result") {
        var a = nodeData.inputs.input.getValue(tree);
        return evalOperation(a);
      }
    },
    execute: null,
  };
}

function createConstant(id: string, value: number): NodeDefinition {
  return {
    id: id,
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
    getData: (portId, nodeData, tree) => {
      if (portId === "value") {
        return value;
      }
    },
    execute: null,
  };
}
