import { IconBulb } from "@tabler/icons-react";
import { createColor } from "../../Types/vectorDataType";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { MaterialData } from "../../Types/MaterialData";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const WireframeMaterial: NodeDefinition = {
  id: "WireframeMaterial",
  description: "create a material with an outline",
  icon: IconBulb,
  tags: ["3D"],
  dataInputs: [
    {
      id: "colorWireframe",
      type: "color",
      defaultValue: createColor(1, 1, 1, 1),
    },
    {
      id: "color",
      type: "color",
      defaultValue: createColor(0, 0, 0, 0),
    },
    {
      id: "wireFrameWeight",
      type: "number",
      defaultValue: 5,
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
      id: "wireframe",
      color: context.getInputValueColor(nodeData, "color"),
      colorWireframe: context.getInputValueColor(nodeData, "colorWireframe"),
      wireframeWeight: context.getInputValueNumber(nodeData, "wireFrameWeight"),
    };
    return m;
  },
};
