import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Constraints } from "../../Utils/applyConstraints";

export const ForNode: NodeDefinition = {
  id: "For",
  description: "Execute an instruction multiple time",
  featureLevel: 100,
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [{ id: "count", type: "number", defaultValue: 10, constrains: [Constraints.Integer(), Constraints.GreaterThan(1)] }],
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
