import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";

export const Clamp: NodeDefinition = {
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
      var value = context.getInputValueNumber(nodeData, "value");
      var min = context.getInputValueNumber(nodeData, "min");
      var max = context.getInputValueNumber(nodeData, "max");
      return Math.max(Math.min(value, max), min);
    }
  },
  getShaderCode(node, context) {
    return genShader(node, context, "float", "result", ["value", "min", "max"], ([value, min, max]) => `clamp(${value}, ${min}, ${max})`);
  },
};
