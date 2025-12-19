import { IconLogicXor } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const XOrNode: NodeDefinition = {
    id: "Logic/xOr",
    description: "Return true only if exactly one input is true",
    icon: IconLogicXor,
    tags: ["Logic"],
    dataInputs: [
        { id: "a", type: "bool", defaultValue: false },
        { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],

    settings: [],
    getData: (portId, node, context) => {
        return context.getInputValueBoolean(node, "a") !== context.getInputValueBoolean(node, "b");
    },
};
