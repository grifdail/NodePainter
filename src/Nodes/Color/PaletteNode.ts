import { IconColorSwatch } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { ColorPalette, createColor } from "../../Types/vectorDataType";
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
        const palette = context.getSetting<ColorPalette>(node, "palette");
        return palette;
    },
    contextMenu(node) {
        if (!node.overrideGlobalSetting?.["palette"]) {
            return {
                "Convert to global (use global)": (node, tree) => {
                    const nodeId = node.id;
                    setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "palette", false), 0)
                },
                "Convert to global (overwrite)": (node, tree) => {
                    const nodeId = node.id;
                    setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "palette", true), 0)
                }
            }
        }
        return {} as ContextMenuData;

    },
};
