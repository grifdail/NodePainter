import { IconHash, IconPlus } from "@tabler/icons-react";
import { PortTypeDropdown } from "../../Components/Modals/CustomNodes/PortTypeDropdown";
import { useDialog } from "../../Hooks/useDialog";
import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWith } from "../../Types/PortTypeDefinitions";
import { convertTypeValue } from "../../Utils/graph/execution/convertTypeValue";
import { createPortConnection } from "../../Utils/graph/modification/createPortConnection";

export const HashNode: NodeDefinition = {
    id: "Misc/Hash",
    label: "Hash",
    description: "Combine the various input such that they produce a unique value",
    icon: IconHash,
    tags: ["Misc"],
    dataInputs: [],
    dataOutputs: [{ id: "hash", type: "number", defaultValue: 0 }],
    settings: [
        {
            type: "button",
            id: "button",
            button: {
                label: "Add new input",
                icon: IconPlus,
                onClick: function (node: NodeData): void {
                    var nodeId = node.id;
                    useDialog.getState().open({
                        callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
                            if (button === "cancel" || fieldResult === undefined) {
                                return;
                            }

                            useTree.getState().dangerouselyUpdateNode(nodeId, (node) => {
                                node.dataInputs[fieldResult.name] = createPortConnection({
                                    id: `input-${Object.keys(node.dataInputs).length + 1}`,
                                    type: fieldResult.type,
                                    defaultValue: PortTypeDefinitions[fieldResult.type as PortType].createDefaultValue(),
                                });
                            });
                        },
                        buttons: [
                            {
                                key: "cancel",
                                label: "Cancel",
                                style: "invisible",
                            },
                            {
                                key: "confirm",
                                label: "Confirm",
                                style: "normal",
                            },
                        ],
                        fields: [
                            {
                                key: "type",
                                label: "",
                                input: PortTypeDropdown,
                                defaultValue: "number",
                                passTrough: { availableTypes: portTypesWith((def) => def.convert.string !== undefined) },
                            },
                        ],
                        header: "Add a new input",
                    });
                },
            },
        },
    ],
    getData: (portId, node, context) => {

        var inputs = Object.values(node.dataInputs).map(input => convertTypeValue(context.getInputValue(node, input.id, input.type), input.type, "string")).join("-");
        return hashCode(inputs);
    },
};

function hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}