import { IconRotate } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { changeTypeGenerator } from "../../Data/changeTypeGenerator";

export const ExecuteWithRotation: NodeDefinition = {
  id: "WithRotation",
  label: "Render with rotation",
  description: "Execute the next instruction as if the canvas was rotated",
  icon: IconRotate,
  tags: ["Transform"],
  dataInputs: [{ id: "angle", type: "number", defaultValue: 0 }],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  defaultType: "number",
  availableTypes: ["number", "vector3"],
  onChangeType: changeTypeGenerator(["angle"], []),
  execute: (data, context) => {
    context.target.push();
    if (data.selectedType === "number") {
      const angle = context.getInputValueNumber(data, "angle");
      context.target.rotate(angle);
    } else {
      const angle = context.getInputValueVector3(data, "angle");
      context.target.rotateZ(angle[2]);
      context.target.rotateX(angle[0]);
      context.target.rotateY(angle[1]);
    }

    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
