import { IconLogicOr } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const OrNode: NodeDefinition = {
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
    return context.getInputValueBoolean(nodeData, "a") || context.getInputValueBoolean(nodeData, "b");
  },
};
