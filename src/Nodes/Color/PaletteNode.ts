import { IconColorSwatch } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createColor } from "../../Types/vectorDataType";
import { Black, White } from "../../Utils/math/colorUtils";

export const PaletteNode: NodeDefinition = {
    id: "Color/Palette",
    label: "Palette",
    description: "Pick a color from a palette",
    icon: IconColorSwatch,
    tags: ["Color", "Array"],
    dataInputs: [],
    dataOutputs: [{ id: "color", type: "array-color", defaultValue: [createColor()] }],

    settings: [{ id: "palette", type: "palette", defaultValue: [Black(), White()] }],
    getData: (portId, node, context) => {
        const palette = node.settings.palette as Array<any>;
        return palette;
    },
};
