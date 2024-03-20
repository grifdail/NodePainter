import { IconArrowsMove } from "@tabler/icons-react";
import { Vector3, createVector2 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { changeTypeGenerator } from "../../Utils/changeTypeGenerator";

export const ExecuteWithTranslation: NodeDefinition = {
  id: "WithTranslation",
  label: "Render with translation",
  description: "Execute the next instruction as if the canvas was moved",
  icon: IconArrowsMove,
  tags: ["Transform"],
  dataInputs: [{ id: "translation", type: "vector2", defaultValue: createVector2() }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  defaultType: "vector2",
  availableTypes: ["vector2", "vector3"],
  onChangeType: changeTypeGenerator(["translation"], []),
  execute: (data, context) => {
    var translation = context.getInputValueVector(data, "translation") as Vector3;
    context.target.push();
    context.target.translate(...translation);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
