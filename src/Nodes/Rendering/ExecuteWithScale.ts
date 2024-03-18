import { IconArrowsMove } from "@tabler/icons-react";
import { Vector2, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const ExecuteWithScale: NodeDefinition = {
  id: "WithScale",
  label: "Render with scale",
  description: "Execute the next instruction as if the canvas was scaled",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "scale", type: "vector2", defaultValue: createVector2() }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  defaultType: "vector2",
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator(["scale"], []),
  execute: (data, context) => {
    var scale = context.getInputValueVector(data, "scale") as Vector2;
    context.target.push();
    context.target.scale(...scale);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
