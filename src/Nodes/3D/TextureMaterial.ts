import { IconBulb } from "@tabler/icons-react";
import { NodeDefinition } from "../../Data/NodeDefinition";
import { MaterialData, createDefaultMaterial } from "../../Data/MaterialData";

export const TextureMaterial: NodeDefinition = {
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
      defaultValue: createDefaultMaterial,
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var m: MaterialData = {
      id: "texture",
      texture: context.getInputValueImage(nodeData, "texture"),
    };
    return m;
  },
};
