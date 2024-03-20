import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";

export const PickFromPalette: NodeDefinition = {
  id: "PickFromPalette",
  label: "Pick from palette",
  description: "Pick a color from a palette",
  icon: IconColorFilter,
  tags: ["Color"],
  dataInputs: [{ id: "index", type: "number", defaultValue: 0 }],
  dataOutputs: [{ id: "color", type: "color", defaultValue: createColor() }],
  executeOutputs: [],
  settings: [{ id: "palette", type: "palette", defaultValue: [createColor(0, 0, 0, 1), createColor(1, 1, 1, 1)] }],
  getData: (portId, nodeData, context) => {
    const index = context.getInputValueNumber(nodeData, "index");
    const palette = nodeData.settings.palette as Array<any>;
    const tindex = Math.floor(index % palette.length);
    return palette[tindex];
  },
};
