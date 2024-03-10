import { IconArrowsMove } from "@tabler/icons-react";
import { Vector2, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const ExecuteWithScale: NodeDefinition = {
  id: "With scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "scale", type: "vector2", defaultValue: createVector2() }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var scale = context.getInputValueVector(data, "scale") as Vector2;
    context.target.push();
    context.target.scale(scale[0], scale[1]);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
