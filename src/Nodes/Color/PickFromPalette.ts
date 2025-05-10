import { IconColorFilter } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { Black, White } from "../../Utils/colorUtils";

export const Palette: NodeDefinition = {
  id: "Palette",
  label: "Palette",
  description: "Pick a color from a palette",
  icon: IconColorFilter,
  tags: ["Color", "Array"],
  dataInputs: [],
  dataOutputs: [{ id: "color", type: "array-color", defaultValue: [createColor()] }],
  executeOutputs: [],
  settings: [{ id: "palette", type: "palette", defaultValue: [Black(), White()] }],
  getData: (portId, nodeData, context) => {
    const palette = nodeData.settings.palette as Array<any>;
    return palette;
  },
};
