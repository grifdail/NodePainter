import { IconMathMax } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Max: NodeDefinition = {
  id: "Max",
  tags: ["Math"],
  icon: IconMathMax,
  description: "Returne the biggest of two number.",
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
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 0,
    },
  ],

  settings: [],
  getData: (portId, nodeData, context) => {
    const a = context.getInputValueNumber(nodeData, "a");
    const b = context.getInputValueNumber(nodeData, "b");
    return Math.max(a, b);
  },
};
