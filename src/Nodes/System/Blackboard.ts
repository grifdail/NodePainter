import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const Blackboard: NodeDefinition = {
  id: "Blackboard",
  description: "Execute an instruction multiple time",
  featureLevel: 100,
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [],
  dataOutputs: [{ id: "value", defaultValue: 0, type: "number" }],
  settings: [{ id: "key", defaultValue: null, type: "hidden" }],
  canBeExecuted: false,
  hideInLibrary: true,
  getData: (portId, nodeData, context) => {
    return context.blackboard[nodeData.settings.key] || 0;
  },
  executeOutputs: [],
};
