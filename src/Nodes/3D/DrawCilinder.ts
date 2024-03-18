import { IconRectangle } from "@tabler/icons-react";
import { createVector3 } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { executeMaterial } from "../../Types/MaterialData";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const DrawCilinder: NodeDefinition = {
  id: "DrawCylinder",
  label: "Draw Cylinder",
  description: "Draw a cylinder",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
    {
      id: "side",
      type: "number",
      defaultValue: 10,
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
    var side = Math.floor(context.getInputValueNumber(data, "side"));
    context.target.push();
    if (material) {
      executeMaterial(context, material);
    }
    context.target.noStroke();
    context.target.translate(...position);
    context.target.rotateZ(rotation[2]);
    context.target.rotateX(rotation[0]);
    context.target.rotateY(rotation[1]);
    context.target.scale(...dimension);
    context.target.cylinder(1, 1, side, 1);
    context.target.pop();
  },
};
