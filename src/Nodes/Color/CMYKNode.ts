import { IconColorFilter } from "@tabler/icons-react";
import convert from "color-convert";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const CMYKNode: NodeDefinition = {
  id: "Color/CMYK",
  description: "create a color from cyan, magenta, yellow and black",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [
    { id: "cyan", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "magenta", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "yellow", type: "number", defaultValue: 1, constrains: [Constraints.Clamp01()] },
    { id: "black", type: "number", defaultValue: 0.5, constrains: [Constraints.Clamp01()] },
    { id: "alpha", type: "number", defaultValue: 0.5, constrains: [Constraints.Clamp01()] },
  ],
  dataOutputs: [{ id: "color", type: "color", defaultValue: 1 }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const cyan = context.getInputValueNumber(nodeData, "cyan");
    const magenta = context.getInputValueNumber(nodeData, "magenta");
    const yellow = context.getInputValueNumber(nodeData, "yellow");
    const black = context.getInputValueNumber(nodeData, "black");
    const alpha = context.getInputValueNumber(nodeData, "alpha");
    const base = convert.cmyk.rgb.raw(cyan * 100, magenta * 100, yellow * 100, black * 100);
    return createColor(base[0] / 255, base[1] / 255, base[2] / 255, alpha);
  },
};
