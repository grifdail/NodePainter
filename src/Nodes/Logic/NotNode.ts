import { IconLogicNot } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const NotNode: NodeDefinition = {
  id: "Not",
  description: "Return the oposite of the input",
  icon: IconLogicNot,
  tags: ["Logic"],
  dataInputs: [{ id: "a", type: "bool", defaultValue: false }],
  dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    return !context.getInputValueBoolean(nodeData, "a");
  },
};
