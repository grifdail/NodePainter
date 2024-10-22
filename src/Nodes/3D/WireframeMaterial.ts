import { IconBulb } from "@tabler/icons-react";
import { MaterialData } from "../../Types/MaterialData";
import { MaterialNodeDefinition } from "../../Types/NodeDefinition";
import { Color, createColor } from "../../Types/vectorDataType";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";

export const WireframeMaterial: MaterialNodeDefinition = {
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
      defaultValue: createDefaultMaterial(),
    },
  ],
  executeOutputs: [],
  settings: [],
  getData: (portId, nodeData, context) => {
    var m: MaterialData = {
      id: "WireframeMaterial",
      color: context.getInputValueColor(nodeData, "color"),
      colorWireframe: context.getInputValueColor(nodeData, "colorWireframe"),
      wireframeWeight: context.getInputValueNumber(nodeData, "wireFrameWeight"),
    };
    return m;
  },
  applyMaterial(context, mat) {
    var color = mat.color as Color;
    var colorW = mat.colorWireframe as Color;
    var wireframeWeight = mat.wireframeWeight as number;
    if (color[3] > 0) {
      context.target.fill(color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255);
    } else {
      context.target.noFill();
    }
    //
    context.target.stroke(colorW[0] * 255, colorW[1] * 255, colorW[2] * 255, colorW[3] * 255);
    context.target.strokeWeight(wireframeWeight);
  },
};
