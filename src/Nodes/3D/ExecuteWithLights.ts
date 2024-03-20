import { IconBulb } from "@tabler/icons-react";
import { Vector3, createColor, createVector3 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const ExecuteWithLight: NodeDefinition = {
  id: "ExecuteWithLight",
  label: "Render with lights",
  description: "Execute the next instruction as if the canvas was moved",
  icon: IconBulb,
  tags: ["3D"],
  dataInputs: [
    { id: "ambiantColor", type: "color", defaultValue: createColor(0.1, 0.1, 0.1, 1) },
    { id: "directionalColor", type: "color", defaultValue: createColor(1, 1, 1, 1) },
    { id: "direction", type: "vector3", defaultValue: createVector3(1, 1, 1) },
  ],
  dataOutputs: [],
  executeOutputs: ["execute"],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var ambiantColor = context.getInputValueVector3(data, "ambiantColor") as Vector3;
    var directionalColor = context.getInputValueVector3(data, "directionalColor") as Vector3;
    var direction = context.getInputValueVector3(data, "direction") as Vector3;
    context.target.push();
    context.target.ambientLight(ambiantColor[0] * 256, ambiantColor[1] * 256, ambiantColor[2] * 256);
    context.target.directionalLight(directionalColor[0] * 256, directionalColor[1] * 256, directionalColor[2] * 256, ...direction);
    if (data.execOutputs.execute) {
      context.execute(data.execOutputs.execute);
    }
    context.target.pop();
  },
};
