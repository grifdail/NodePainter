import { IconBulb } from "@tabler/icons-react";
import { Color, createColor } from "../../Types/vectorDataType";
import { MaterialNodeDefinition } from "../../Types/NodeDefinition";
import { MaterialData } from "../../Types/MaterialData";
import { createDefaultMaterial } from "../../Utils/createDefaultMaterial";
import { toP5Color } from "../../Utils/colorUtils";

export const DefaultMaterial: MaterialNodeDefinition = {
  id: "DefaultMaterial",
  description: "The default Material",
  hideInLibrary: true,
  icon: IconBulb,
  tags: ["Material"],
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
      id: "DefaultMaterial",
      color: context.getInputValueColor(nodeData, "color"),
    };
    return m;
  },
  applyMaterial(context, mat, isStrokeOnly) {
    var color = mat.color as Color;
    if (isStrokeOnly) {
      context.target.noFill();
      context.target.stroke(toP5Color(color, context.p5));
      context.target.strokeWeight(2);
    } else {
      context.target.noStroke();
      context.target.fill(toP5Color(color, context.p5));
    }
  },
};
