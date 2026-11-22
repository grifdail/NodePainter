import { IconPlane, IconPlus } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";


const createIndexNode = ({ id, positionX, positionY, selectedType, settings }: NodeData): void => {
    const name = settings.name;
    setTimeout(() => {
        useTree.getState().addNode(
            "Misc/PortalOutput", positionX + 400, positionY, (node, def) => {
                node.label = `Portal Output (${name})`
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
        SettingGenerator.string("name", "???"),
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


