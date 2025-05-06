import { IconBulb } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const FlatMaterial: NodeDefinition = {
  id: "FlatMaterial",
  description: "Render the object in one solid color, unafected by light",
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
    return VirtualNodes.FlatMaterialType.generate(context.getCallId(nodeData), [], context.getInputValueColor(nodeData, "color"));
  },
};
