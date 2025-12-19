import { IconLogicAnd } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const AndNode: NodeDefinition = {
    id: "Logic/And",
    description: "Return true only if both input are true",
    icon: IconLogicAnd,
    tags: ["Logic"],
    dataInputs: [
        { id: "a", type: "bool", defaultValue: false },
        { id: "b", type: "bool", defaultValue: false },
    ],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],

    settings: [],
    getData: (portId, node, context) => {
        return context.getInputValueBoolean(node, "a") && context.getInputValueBoolean(node, "b");
    },
};
