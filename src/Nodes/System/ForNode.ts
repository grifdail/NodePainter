import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ForNode: NodeDefinition = {
  id: "For",
  description: "Execute an instruction multiple time",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [{ id: "count", type: "number", defaultValue: 10 }],
  dataOutputs: [{ id: "index", type: "number", defaultValue: 10 }],
  executeOutputs: ["loop"],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, context) => {
    return context.blackboard[`${nodeData.id}-index`] || 0;
  },
  execute: (data, context) => {
    var count = context.getInputValueNumber(data, "count");
    for (var i = 0; i < count; i++) {
      context.blackboard[`${data.id}-index`] = i;
      if (data.execOutputs.loop) {
        context.execute(data.execOutputs.loop);
      }
    }
  },
};
