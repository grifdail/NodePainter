import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const IfNode: NodeDefinition = {
  id: "If",
  description: "Execute an instruction only if a condition is meet",
  icon: IconAssembly,
  tags: ["Control", "Logic"],
  dataInputs: [{ id: "condition", type: "bool", defaultValue: false }],
  dataOutputs: [],
  executeOutputs: ["then", "else"],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, context) => {
    var input = context.getInputValueBoolean(data, "condition");
    if (input) {
      if (data.execOutputs["then"]) {
        context.execute(data.execOutputs["then"]);
      }
    } else {
      if (data.execOutputs["else"]) {
        context.execute(data.execOutputs["else"]);
      }
    }
  },
};
