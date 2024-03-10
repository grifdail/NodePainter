import { IconLogicAnd } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const AndNode: NodeDefinition = {
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
    return context.getInputValueBoolean(nodeData, "a") && context.getInputValueBoolean(nodeData, "b");
  },
};
