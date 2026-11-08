import { IconPlane } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";


export const PortalOutputNode: NodeDefinition = {
    id: "Misc/PortalOutput",
    label: "Portal Output",
    hideInLibrary: true,
    description: "Retrieve data from the Portal Input",
    icon: IconPlane,
    tags: ["Misc"],
    dataInputs: [],
    dataOutputs: [Port.number("value")],
    settings: [],
    getData: (portId, node, context) => {
        if (node.pairedNode) {
            var pair = context.getNodeData(node.pairedNode)
            return context.getInputValue(pair, portId, node.selectedType);
        }

    },
};
