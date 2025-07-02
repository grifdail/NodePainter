import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { clamp01 } from "../../Utils/math/clamp01";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const OKLCH: NodeDefinition = {
  id: "Color/OKLCH",
  description: "create a color from perception based Lightness, chroma and hue",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "lightness", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "chroma", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "hue", type: "number", defaultValue: 0, constrains: [Constraints.Mod1()] },
    { id: "alpha", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    var hue = context.getInputValueNumber(nodeData, "hue");
    var chroma = context.getInputValueNumber(nodeData, "chroma");
    var lightness = context.getInputValueNumber(nodeData, "lightness");
    const alpha = context.getInputValueNumber(nodeData, "alpha");
    var result = (convert as any).oklch.rgb(clamp01(lightness) * 100, clamp01(chroma) * 32, clamp01(hue) * 360);
    return createColor(result[0] / 255, result[1] / 255, result[2] / 255, alpha);
  },
};
