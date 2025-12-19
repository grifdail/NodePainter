import { IconBook } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const SetNode: NodeDefinition = {
    id: "Dictionary/Set",
    label: "Set in Dictionary",
    description: "Set a a value for a specific key in a dictionary",
    icon: IconBook,
    tags: ["Dictionary"],
    dataInputs: [
        Port.struct("dictionary", null, "If left empty, create a new dictionary"),
        Port.string("key", "key"),
        Port.number("value")
    ],
    dataOutputs: [
        Port.struct("out")
    ],
    settings: [],
    ...changeTypeGenerator(portTypesWithTags(["common"]), ["value"], []),
    getData(portId, node, context) {
        const struct = context.getInputValue(node, "dictionary", "struct") as Record<string, any> || {}
        const target = context.getInputValueString(node, "key");
        const type = node.dataInputs.value.type;
        const value = context.getInputValue(node, "value", type)

        return {
            ...struct,
            [target]: value,
            __metaFields: {
                ...(struct.__metaFields || {}),
                [target]: type
            }
        };
    },
}