import { IconAssembly } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ForGrid: NodeDefinition = {
  id: "ForGrid",
  label: "For grid",
  description: "Execute an instruction multiple time for elements of a grid",
  icon: IconAssembly,
  tags: ["Control"],
  dataInputs: [
    { id: "width", type: "number", defaultValue: 10 },
    { id: "height", type: "number", defaultValue: 10 },
  ],
  dataOutputs: [
    { id: "x", type: "number", defaultValue: 10 },
    { id: "y", type: "number", defaultValue: 10 },
  ],
  executeOutputs: ["loop"],
  settings: [],
  canBeExecuted: true,
  getData: (portId, nodeData, context) => {
    if (portId === "x") {
      return context.blackboard[`${nodeData.id}-x`] || 0;
    } else return context.blackboard[`${nodeData.id}-y`] || 0;
  },
  execute: (data, context) => {
    var width = context.getInputValueNumber(data, "width");
    var height = context.getInputValueNumber(data, "height");
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        context.blackboard[`${data.id}-x`] = x;
        context.blackboard[`${data.id}-y`] = y;
        if (data.execOutputs.loop) {
          context.execute(data.execOutputs.loop);
        }
      }
    }
  },
};
