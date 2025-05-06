import { IconRectangle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const DrawPlane: NodeDefinition = {
  id: "DrawPlane",
  label: "Draw Plan",
  description: "Draw a Plan",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
    {
      id: "material",
      type: "material",
      defaultValue: createDefaultMaterial(),
    },
    {
      id: "position",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
    {
      id: "dimension",
      type: "vector3",
      defaultValue: createVector3(10, 10, 10),
    },
    {
      id: "rotation",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var material = context.getInputValueMaterial(data, "material");

    var rotation = context.getInputValueVector3(data, "rotation");
    var position = context.getInputValueVector3(data, "position");
    var dimension = context.getInputValueVector3(data, "dimension");
    context.target.push();
    context.target.translate(...position);
    context.target.rotateZ(rotation[2]);
    context.target.rotateX(rotation[0]);
    context.target.rotateY(rotation[1]);
    context.target.scale(...dimension);

    context.target.plane();
    context.target.pop();
  },
};
