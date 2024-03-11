import { IconClock } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const Time: NodeDefinition = {
  id: "Time",
  description: "The current time relative to the execution of the preview, in second",
  icon: IconClock,
  tags: ["Input"],
  dataInputs: [],
  dataOutputs: [{ id: "time", type: "number", defaultValue: 0 }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.time / 1000;
  },
  getShaderCode(node, context) {
    return `float ${context.getShaderVar(node, "time", "number", true)} = time / 1000.0;`;
  },
};
