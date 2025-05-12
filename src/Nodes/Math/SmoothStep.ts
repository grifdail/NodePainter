import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";

export const SmoothStep: NodeDefinition = {
  id: "SmoothStep",
  description: "Smoothly interpolate between 0 and 1",
  icon: IconMathFunction,
  tags: ["Math"],
  dataInputs: [
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
    {
      id: "input",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    const min = context.getInputValueNumber(nodeData, "min");
    const max = context.getInputValueNumber(nodeData, "max");
    const value = context.getInputValueNumber(nodeData, "input");
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input", "min", "max"], ({ input, min, max }) => `smoothstep(${min}, ${max}, ${input})`);
  },
};
