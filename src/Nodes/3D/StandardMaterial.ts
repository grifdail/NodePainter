import { IconBulb } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { VirtualNodes } from "./VirtualNodeTypes/VirtualNodeTypes";

export const StandardMaterial: NodeDefinition = {
  id: "StandardMaterial",
  description: "Render the object with a physicaly accurate renderer",
  icon: IconBulb,
  tags: ["3D"],
  dataInputs: [
    {
      id: "color",
      type: "color",
      defaultValue: createColor(1, 1, 1, 1),
    },
    {
      id: "roughness",
      type: "number",
      defaultValue: 0.5,
    },
    {
      id: "metalness",
      type: "number",
      defaultValue: 0.5,
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
    return VirtualNodes.StandardMaterialType.generate(context.getCallId(nodeData), [], context.getInputValueColor(nodeData, "color"), context.getInputValueNumber(nodeData, "roughness"), context.getInputValueNumber(nodeData, "metalness"));
  },
};
