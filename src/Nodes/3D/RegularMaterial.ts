import { IconBulb } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { MaterialNodeDefinition } from "../../Types/NodeDefinition";
import { Color, createColor } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const RegularMaterial: MaterialNodeDefinition = {
  id: "RegularMaterial",
  description: "create a material that react to the light",
  icon: IconBulb,
  tags: ["3D"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1, 1),
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
      id: "RegularMaterial",
      color: context.getInputValueColor(nodeData, "color"),
    };
    return m;
  },
  applyMaterial(context, mat) {
    context.target.noStroke();
    var color = mat.color as Color;
    context.target.fill(color[0] * 255, color[1] * 255, color[2] * 255);
    context.target.emissiveMaterial(0);
    context.target.ambientMaterial(color[0] * 255, color[1] * 255, color[2] * 255);
  },
};
