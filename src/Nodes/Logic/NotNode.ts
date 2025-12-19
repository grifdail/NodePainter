import { IconLogicNot } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const NotNode: NodeDefinition = {
    id: "Logic/Not",
    description: "Return the oposite of the input",
    icon: IconLogicNot,
    tags: ["Logic"],
    dataInputs: [{ id: "a", type: "bool", defaultValue: false }],
    dataOutputs: [{ id: "result", type: "bool", defaultValue: false }],

    settings: [],
    getData: (portId, node, context) => {
        return !context.getInputValueBoolean(node, "a");
    },
};
