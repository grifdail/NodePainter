import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";

export const Palette: NodeDefinition = {
  id: "Palette",
  label: "Palette",
  description: "Pick a color from a palette",
  icon: IconColorFilter,
  tags: ["Color", "Array"],
  dataInputs: [],
  dataOutputs: [{ id: "color", type: "array-color", defaultValue: [createColor()] }],
  executeOutputs: [],
  settings: [{ id: "palette", type: "palette", defaultValue: [createColor(0, 0, 0, 1), createColor(1, 1, 1, 1)] }],
  getData: (portId, nodeData, context) => {
    const palette = nodeData.settings.palette as Array<any>;
    return palette;
  },
};
