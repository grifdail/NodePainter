import { IconArrowsMove } from "@tabler/icons-react";
import { Vector2, createVector2 } from "../../Data/vectorDataType";
import { NodeDefinition } from "../../Data/NodeDefinition";

export const ExecuteWithTranslation: NodeDefinition = {
  id: "With translation",
  description: "Execute the next instruction as if the canvas was moved",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "translation", type: "vector2", defaultValue: createVector2() }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var translation = context.getInputValueVector(data, "translation") as Vector2;
    context.target.push();
    context.target.translate(translation[0], translation[1]);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
