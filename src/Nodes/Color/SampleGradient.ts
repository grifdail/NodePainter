import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor, createDefaultGradient } from "../../Types/vectorDataType";
import { evaluateGradient } from "../../Utils/colorUtils";

export const SampleGradient: NodeDefinition = {
  id: "SampleGradient",
  label: "Sample Gradient",
  description: "Sample a gradient",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "gradient", type: "gradient", defaultValue: createDefaultGradient() },
    { id: "pos", type: "number", defaultValue: 0.5 },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    const gradient = context.getInputValueGradient(nodeData, "gradient") || createDefaultGradient();
    const pos = context.getInputValueNumber(nodeData, "pos");
    return evaluateGradient(gradient, pos);
  },
};
