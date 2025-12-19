import { IconLogicOr } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const OrNode: NodeDefinition = {
    id: "Logic/Or",
    description: "Return true only if one of the input is true",
    icon: IconLogicOr,
    tags: ["Logic"],
    dataInputs: [
        { id: "a", type: "bool", defaultValue: false },
        { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],
    settings: [],
    getData: (portId, node, context) => {
        return context.getInputValueBoolean(node, "a") || context.getInputValueBoolean(node, "b");
    },
};
