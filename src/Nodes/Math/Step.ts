import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { genShader } from "../../Data/genShader";
import { VectorTypesFull } from "../../Data/NodeDefinition";
import { clamp01 } from "../../Data/colorUtils";

export const Step: NodeDefinition = {
  id: "Step",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Constrain a number between 0 and 1 to a specific number of discreet step.",
  dataInputs: [
    {
      id: "value",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "step",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "result",
      type: "number",
      defaultValue: 5,
    },
  ],
  executeOutputs: [],
  settings: [],
  availableTypes: VectorTypesFull,
  defaultType: "number",
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var value = context.getInputValueNumber(nodeData, "value");
      var step = context.getInputValueNumber(nodeData, "step");
      return Math.floor(clamp01(value) * step) / step;
    }
  },
  getShaderCode(node, context) {
    return genShader(node, context, "result", ["value", "step"], ({ value, step }) => `floor(clamp(${value},0.0, 1.0) * ${step}) / ${step}`);
  },
};
