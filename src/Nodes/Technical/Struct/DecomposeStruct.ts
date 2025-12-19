import { IconPackageImport } from "@tabler/icons-react";
import { SettingGenerator } from "../../../Components/Settings/SettingGenerator";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const DecomposeStruct: NodeDefinition = {
    id: "Technical/Struct/Decompose",
    description: "",
    IsUnique: false,
    hideInLibrary: true,
    icon: IconPackageImport,
    tags: [],
    dataInputs: [],
    dataOutputs: [],
    settings: [
        SettingGenerator.bool("disable check", false, { tooltip: "If this is true, this node will result in an error if the input struct isn't of the valid type" })
    ],
    preventSnippet: true,
    getData: (portId, nodeData, context) => {
        const input = context.getInputValue(nodeData, "struct", "struct") as any;
        const port = nodeData.dataOutputs[portId];

        if (nodeData.settings.enforceCheck && input.__metaStructType !== nodeData.settings.structId) {
            throw new Error(`Input of node ${nodeData.id} is not of the right type`)
        }
        if (portId in input) {
            return input[portId];
        } else {
            console.warn(`Type ${portId} is missing in the passed struct of node ${nodeData.id}`);
            return port.defaultValue;
        }
    },
};
