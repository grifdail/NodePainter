import { IconRectangle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2, createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const DrawTorus: NodeDefinition = {
  id: "DrawTorus",
  label: "Draw torus",
  description: "Draw a torus",
  icon: IconRectangle,
  tags: ["3D"],
  dataInputs: [
    {
      id: "tube-radius",
      type: "number",
      defaultValue: 1,
    },
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
    var tubeRadius = context.getInputValueNumber(data, "tube-radius");
    context.target.push();
    context.target.translate(...position);
    context.target.rotateZ(rotation[2]);
    context.target.rotateX(rotation[0]);
    context.target.rotateY(rotation[1]);
    context.target.scale(...dimension);

    context.target.torus(1, tubeRadius, Math.floor(details[0]), Math.floor(details[1]));
    context.target.pop();
  },
};
