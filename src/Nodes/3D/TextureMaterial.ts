import { IconBulb } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { MaterialNodeDefinition } from "../../Types/NodeDefinition";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const TextureMaterial: MaterialNodeDefinition = {
  id: "TextureMaterial",
  description: "create a material that doesnt react to light",
  icon: IconBulb,
  tags: ["3D"],
  dataInputs: [
    {
      id: "texture",
      type: "image",
      defaultValue: null,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "material",
      defaultValue: createDefaultMaterial(),
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var m: MaterialData = {
      id: "TextureMaterial",
      texture: context.getInputValueImage(nodeData, "texture"),
    };
    return m;
  },
  applyMaterial(context, mat) {
    context.target.noStroke();
    context.target.fill(255, 255, 255);
    if (mat.texture?.image != null) {
      context.target.texture(mat.texture?.image as any);
    }
  },
};
