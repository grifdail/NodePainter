import { IconArrowUpRightCircle, IconAssembly, IconLogicAnd, IconLogicNot, IconLogicOr, IconLogicXor } from "@tabler/icons-react";
import { createColor } from "./Color";
import { NodeDefinition } from "../Data/NodeDefinition";

export type Vector = { x: number; y: number };

export const createVector = (x: number = 0, y: number = 0): Vector => ({ x, y });

export const LogicNodes: Array<NodeDefinition> = [
  {
    id: "Compare",
    description: "Create a vector from a set of coordinate",
    icon: IconArrowUpRightCircle,
    tags: ["Logic", "Math"],
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
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    executeOutputs: [],
    settings: [
      {
        id: "comparator",
        type: "dropdown",
        defaultValue: "==",
        options: ["equals", "different", "lower that", "lower than or equals", "greater than", "greater than or equals", "approximately equals", "approximately different"],
      },
    ],

    getData: (portId, nodeData, context) => {
      var a = context.getInputValue(nodeData, "a");
      var b = context.getInputValue(nodeData, "b");
      var comparator = nodeData.settings.comparator as string;
      var func = Comparator[comparator];
      if (func !== undefined) {
        return func(a, b) as boolean;
      } else {
        return false;
      }
    },
    execute: null,
  },
  {
    id: "If",
    description: "Execute an instruction only if a condition is meet",
    icon: IconAssembly,
    tags: ["Control", "Logic"],
    dataInputs: [{ id: "condition", type: "bool", defaultValue: false }],
    dataOutputs: [],
    executeOutputs: ["then", "else"],
    settings: [],
    getData: (portId, nodeData, getNodeOutput) => {},
    execute: (data, context) => {
      var input = context.getInputValue(data, "condition");
      if (input) {
        if (data.execOutputs["then"]) {
          context.execute(data.execOutputs["then"]);
        }
      } else {
        if (data.execOutputs["else"]) {
          context.execute(data.execOutputs["else"]);
        }
      }
    },
  },
  {
    id: "SwitchNumber",
    description: "Return one of the input depending on the condition",
    icon: IconAssembly,
    tags: ["Logic"],
    dataInputs: [
      { id: "condition", type: "bool", defaultValue: false },
      { id: "true", type: "number", defaultValue: 1 },
      { id: "false", type: "number", defaultValue: 0 },
    ],
    dataOutputs: [{ id: "result", type: "number", defaultValue: 0 }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var input = context.getInputValue(nodeData, "condition");
      if (input) {
        return context.getInputValue(nodeData, "true");
      } else {
        return context.getInputValue(nodeData, "false");
      }
    },
    execute: null,
  },
  {
    id: "SwitchVector",
    description: "Return one of the input depending on the condition",
    icon: IconAssembly,
    tags: ["Logic"],
    dataInputs: [
      { id: "condition", type: "bool", defaultValue: false },
      { id: "true", type: "vector2", defaultValue: createVector(1, 1) },
      { id: "false", type: "vector2", defaultValue: createVector(0, 0) },
    ],
    dataOutputs: [{ id: "result", type: "vector2", defaultValue: createVector() }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var input = context.getInputValue(nodeData, "condition");
      if (input) {
        return context.getInputValue(nodeData, "true");
      } else {
        return context.getInputValue(nodeData, "false");
      }
    },
    execute: null,
  },
  {
    id: "SwitchColor",
    description: "Return one of the input depending on the condition",
    icon: IconAssembly,
    tags: ["Logic"],
    dataInputs: [
      { id: "condition", type: "bool", defaultValue: false },
      { id: "true", type: "color", defaultValue: createColor(1, 1, 1, 1) },
      { id: "false", type: "color", defaultValue: createColor(0, 0, 0, 1) },
    ],
    dataOutputs: [{ id: "result", type: "color", defaultValue: createColor(0, 0, 0, 1) }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      var input = context.getInputValue(nodeData, "condition");
      if (input) {
        return context.getInputValue(nodeData, "true");
      } else {
        return context.getInputValue(nodeData, "false");
      }
    },
    execute: null,
  },
  {
    id: "And",
    description: "Return true only if both input are true",
    icon: IconLogicAnd,
    tags: ["Logic"],
    dataInputs: [
      { id: "a", type: "bool", defaultValue: false },
      { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, "a") && context.getInputValue(nodeData, "b");
    },
    execute: null,
  },
  {
    id: "Or",
    description: "Return true only if one of the input is true",
    icon: IconLogicOr,
    tags: ["Logic"],
    dataInputs: [
      { id: "a", type: "bool", defaultValue: false },
      { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, "a") || context.getInputValue(nodeData, "b");
    },
    execute: null,
  },
  {
    id: "xOr",
    description: "Return true only if exactly one input is true",
    icon: IconLogicXor,
    tags: ["Logic"],
    dataInputs: [
      { id: "a", type: "bool", defaultValue: false },
      { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return context.getInputValue(nodeData, "a") ^ context.getInputValue(nodeData, "b");
    },
    execute: null,
  },
  {
    id: "not",
    description: "Return the oposite of the input",
    icon: IconLogicNot,
    tags: ["Logic"],
    dataInputs: [{ id: "a", type: "bool", defaultValue: false }],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      return !context.getInputValue(nodeData, "a");
    },
    execute: null,
  },
];

type ComparatorFunc = (a: number, b: number) => boolean;
const Comparator: { [key: string]: ComparatorFunc } = {
  equals: (a, b) => a === b,
  different: (a, b) => a !== b,
  "lower that": (a, b) => a < b,
  "lower than or equals": (a, b) => a <= b,
  "greater than": (a, b) => a > b,
  "greater than or equals": (a, b) => a >= b,
  "approximately equals": (a, b) => Math.abs(a - b) < 0.00001,
  "approximately different": (a, b) => Math.abs(a - b) > 0.00001,
};
