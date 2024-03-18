import { IconBulb } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { MaterialData, createDefaultMaterial } from "../../Types/MaterialData";

export const EmissiveMaterial: NodeDefinition = {
  id: "EmissiveMaterial",
  description: "create a material that doesnt react to light",
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
      defaultValue: createDefaultMaterial,
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var m: MaterialData = {
      id: "emisive",
      color: context.getInputValueColor(nodeData, "color"),
    };
    return m;
  },
};
