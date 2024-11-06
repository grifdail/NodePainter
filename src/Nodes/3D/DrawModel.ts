import { IconCube } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector3 } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const DrawModel: NodeDefinition = {
  id: "DrawModel",
  label: "Draw Model",
  description: "Draw a 3d model",
  icon: IconCube,
  tags: ["3D", "Draw"],
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
      defaultValue: createVector3(1, 1, 1),
    },
    {
      id: "rotation",
      type: "vector3",
      defaultValue: createVector3(0, 0, 0),
    },
    {
      id: "model",
      type: "model",
      defaultValue: null,
    },
  ],
  dataOutputs: [],
  executeOutputs: [],
  settings: [],
  canBeExecuted: true,
  execute: (data, context) => {
    var model = context.getInputValueModel(data, "model");
    if (model === null) {
      return;
    }
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
    if (material) {
      context.applyMaterial(material);
    }
    //context.target.box(10, 10, 10);
    context.target.model(model);
    context.target.pop();
  },
};
