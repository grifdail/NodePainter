import { IconBulb } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { MaterialData } from "../../Types/MaterialData";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const RegularMaterial: NodeDefinition = {
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
      defaultValue: createDefaultMaterial,
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var m: MaterialData = {
      id: "regular",
      color: context.getInputValueColor(nodeData, "color"),
    };
    return m;
  },
};
