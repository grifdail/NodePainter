import { IconColorSwatch } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { PortDefinition } from "../../Types/PortDefinition";
import { ColorPalette, createColor } from "../../Types/vectorDataType";
import { Black, White } from "../../Utils/math/colorUtils";

const BASE_COLOR_PORT: PortDefinition = { id: "color", type: "array-color", defaultValue: [createColor()] };

export const PaletteNode: NodeDefinition = {
    id: "Color/Palette",
    label: "Palette",
    description: "Pick a color from a palette",
    icon: IconColorSwatch,
    tags: ["Color", "Array"],
    dataInputs: [],
    dataOutputs: [BASE_COLOR_PORT,
    ],
    settings: [{
        id: "palette", type: "palette", defaultValue: [Black(), White()], onChange(node, newValue, oldValue, definitions) {

            refreshPort(newValue, node);
        },
    }],
    getData: (portId, node, context) => {
        const palette = context.getSetting<ColorPalette>(node, "palette");
        if (portId === "color") {
            return palette
        } else {
            return palette[parseInt(portId) % palette.length]
        }
    },
    contextMenu(node) {
        const ctx: ContextMenuData = {}
        if (!node.overrideGlobalSetting?.["palette"]) {

            ctx["Convert to global (use global)"] = (node, tree) => {
                const nodeId = node.id;
                setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "palette", false), 0)
            }
            ctx["Convert to global (overwrite)"] = (node, tree) => {
                const nodeId = node.id;
                setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "palette", true), 0)
            }
        }
        ctx["refresh Port"] = (baseNode) => {
            const id = baseNode.id;
            setTimeout(() => {
                const tree = useTree.getState();
                const node = tree.nodes[id]
                refreshPort(node.overrideGlobalSetting?.["palette"] ? tree.globalSettings[node.overrideGlobalSetting?.["palette"]] : node.settings.palette, node)
            }, 0)
        }

        return ctx;

    },
};
function refreshPort(newValue: any, node: NodeData) {
    console.log(newValue)
    const data = newValue as ColorPalette;
    var tree = useTree.getState();
    const newPort = data.map((color, index) => {
        const t: PortDefinition = {
            id: index.toString(),
            label: `color-${index}`,
            type: "color",
            defaultValue: color
        };
        return t;
    });

    tree.replaceOutput((t) => t.id === node.id, [BASE_COLOR_PORT, ...newPort]);
}

