import { IconMessage } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";

export const MetaNode: NodeDefinition = {
    id: "Misc/Meta",
    featureLevel: 10,
    description: "Provide information on your node",
    icon: IconMessage,
    tags: ["Misc"],
    dataInputs: [],
    dataOutputs: [],
    settings: [
        { id: "author", type: "string", defaultValue: "" },
        { id: "comment", type: "text-area", defaultValue: "" }
    ],
    getData(portId, node, context) { },
};
