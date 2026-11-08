import { IconColorSwatch } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { ContextMenuData, NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { ColorPairing } from "../../Types/vectorDataType";
import { Black, White } from "../../Utils/math/colorUtils";

export const ColorPairingNode: NodeDefinition = {
    id: "Color/Pairing",
    label: "Color Pairing",
    description: "Use a color from a Pairing",
    icon: IconColorSwatch,
    tags: ["Color", "Array"],
    dataInputs: [],
    dataOutputs: [Port.color("A"), Port.color("B")],

    settings: [{ id: "pairing", type: "color-pairing", defaultValue: [Black(), White()] }],
    getData: (portId, node, context) => {
        if (portId === "A") {
            return context.getSetting<ColorPairing>(node, "pairing")[0]
        } else {
            return context.getSetting<ColorPairing>(node, "pairing")[1]
        }
    },
    contextMenu(node) {
        if (!node.overrideGlobalSetting?.["pairing"]) {
            return {
                "Convert to global (use global)": (node, tree) => {
                    const nodeId = node.id;
                    setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "pairing", false), 0)
                },
                "Convert to global (overwrite)": (node, tree) => {
                    const nodeId = node.id;
                    setTimeout(() => useTree.getState().makeSettingGlobal(nodeId, "pairing", true), 0)
                }
            }
        }
        return {} as ContextMenuData;

    },
};