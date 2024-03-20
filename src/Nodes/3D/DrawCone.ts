import { IconRectangle } from "@tabler/icons-react";
import { createVector2, createVector3 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const DrawCone: NodeDefinition = {
  id: "DrawCone",
  label: "Draw Cone",
  description: "Draw a Cone",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
    {
      id: "details",
      type: "vector2",
      defaultValue: createVector2(16, 32),
    },
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
    var details = context.getInputValueVector2(data, "details");
    context.target.push();

    context.target.translate(...position);
    context.target.rotateZ(rotation[2]);
    context.target.rotateX(rotation[0]);
    context.target.rotateY(rotation[1]);
    context.target.scale(...dimension);
    if (material) {
      context.applyMaterial(material);
    }
    context.target.cone(1, 1, Math.floor(details[0]), Math.floor(details[1]));
    context.target.pop();
  },
};
