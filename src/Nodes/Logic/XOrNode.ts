import { IconLogicXor } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const XOrNode: NodeDefinition = {
  id: "xOr",
  description: "Return true only if exactly one input is true",
  icon: IconLogicXor,
  tags: ["Logic"],
  dataInputs: [
    { id: "a", type: "bool", defaultValue: false },
    { id: "b", type: "bool", defaultValue: false },
  ],
  dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return context.getInputValueBoolean(nodeData, "a") !== context.getInputValueBoolean(nodeData, "b");
  },
};
