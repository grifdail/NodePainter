import { IconBook } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";

export const GetNode: NodeDefinition = {
    id: "Dictionary/Get",
    label: "Get From Dictionary",
    description: "Get a specific value from a dictionary",
    icon: IconBook,
    tags: ["Dictionary"],
    dataInputs: [
        Port.struct("dictionary"),
        Port.string("key", "key")
    ],
    dataOutputs: [
        Port.number("out")
    ],
    settings: [
        SettingGenerator.bool("enforceCheck", true, { tooltip: "When this is true, the node will throw an error if the structure doesn't have the right key and right type" })
    ],
    ...changeTypeGenerator(portTypesWithTags(["common"]), [], ["out"]),
    getData(portId, node, context) {
        const struct = context.getInputValue(node, "dictionary", "struct") as Record<string, any> || {}
        const target = context.getInputValueString(node, "key");
        if (node.settings.enforceCheck) {
            if (!struct.__metaFields) {
                throw new Error("Struct is missing meta data information")
            }
            if (!struct.__metaFields[target]) {
                throw new Error(`Struct is missing meta data information on field ${target}`)
            }
            if (struct.__metaFields[target] !== node.dataOutputs.out.type) {
                throw new Error(`Metadata for field ${target} is the wrong type`)
            }
        }

        return struct[target];
    },
}