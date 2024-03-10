import { IconRotate } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const ExecuteWithRotation: NodeDefinition = {
  id: "With rotation",
  description: "Execute the next instruction as if the canvas was rotated",
  icon: IconRotate,
  tags: ["Transform"],
  dataInputs: [{ id: "angle", type: "number", defaultValue: 0 }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var angle = context.getInputValueNumber(data, "angle");
    context.target.push();
    context.target.rotate(angle);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
