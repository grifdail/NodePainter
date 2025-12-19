import { IconBook } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";

export const KeysNode: NodeDefinition = {
    id: "Dictionary/Keys",
    description: "List all the keys of the dictionary",
    icon: IconBook,
    tags: ["Dictionary"],
    dataInputs: [
        Port.struct("dictionary")
    ],
    dataOutputs: [
        Port["array-string"]("keys")
    ],
    settings: [

    ],
    getData(portId, node, context) {
        const struct = context.getInputValue(node, "dictionary", "struct") as Record<string, any> || {}
        return Object.keys(struct).filter(key => !key.startsWith("__"));
    },
}