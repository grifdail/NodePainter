import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createDefaultGradient } from "../../Types/vectorDataType";

export const GradientNode: NodeDefinition = {
  id: "Gradient",
  description: "Create a manualy defined gradient",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [],
  dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
  executeOutputs: [],
  settings: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],
  getData: (portId, nodeData, context) => {
    return nodeData.settings.gradient;
  },
};
