import { IconPlane, IconPlus } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";


const createIndexNode = ({ id, positionX, positionY, selectedType }: NodeData): void => {
    setTimeout(() => {
        useTree.getState().addNode(
            "Misc/PortalOutput", positionX + 400, positionY, (node, def) => {
                node.pairedNode = id;
                node.dataOutputs.value.type = selectedType
            }
        );
    }, 10);
};

export const PortalInputNode: NodeDefinition = {
    id: "Misc/PortalInput",
    label: "Portal",
    description: "send input data to Portal Output node with the same Name",
    icon: IconPlane,
    tags: ["Misc"],
    dataInputs: [Port.number("value")],
    dataOutputs: [],
    settings: [
        {
            id: "buttons",
            type: "button",
            button: {
                label: "Create output node",
                icon: IconPlus,
                onClick: createIndexNode,
            },
        },
    ],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["value"], []),
    getData: (portId, node, context) => {

    },

};


