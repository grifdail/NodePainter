import { IconCalculator, IconMathSymbols, IconSquareRoot2 } from "@tabler/icons-react";
import { NodeDefinition, getInputValue } from "../Data/NodeDefinition";
import { AddNode } from "../Data/NodeLibrary";

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
AddNode(createFunc("SinWave", (a) => Math.sin(a * Math.PI * 2) * 0.5 + 0.5));
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
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var a = getInputValue(nodeData, "y", context);
      var b = getInputValue(nodeData, "x", context);
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
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var value = getInputValue(nodeData, "value", context);
      var min = getInputValue(nodeData, "min", context);
      var max = getInputValue(nodeData, "max", context);
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
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var t = getInputValue(nodeData, "t", context);
      var min = getInputValue(nodeData, "min", context);
      var max = getInputValue(nodeData, "max", context);
      return t * max + (1 - t) * min;
    }
  },
  execute: null,
});

function createOperation(id: string, evalOperation: (a: any, b: any) => any, description?: string): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
    icon: IconMathSymbols,
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
        var a = getInputValue(nodeData, "a", context);
        var b = getInputValue(nodeData, "b", context);
        return evalOperation(a, b);
      }
    },
    execute: null,
  };
}

function createFunc(id: string, evalOperation: (input: any) => any, description?: string): NodeDefinition {
  return {
    id: id,
    tags: ["math"],
    icon: IconSquareRoot2,
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
        var a = getInputValue(nodeData, "input", context);
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
