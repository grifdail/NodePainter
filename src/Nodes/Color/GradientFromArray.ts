import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Color, createColor, createDefaultGradient } from "../../Types/vectorDataType";

export const GradientFromArray: NodeDefinition = {
  id: "GradientFromArray",
  label: "Gradient from Array",
  description: "Generate Gradient from the color in a array, spaced evenly",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [{ id: "array", type: "array-color", defaultValue: [createColor()] }],
  dataOutputs: [{ id: "gradient", type: "gradient", defaultValue: createDefaultGradient() }],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    const data = context.getInputValue(nodeData, "array", "array-color") as Color[];
    if (data.length === 0) {
      return [];
    }
    return data.map((color, i) => ({ pos: i / (data.length - 1), color }));
  },
};
