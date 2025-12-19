import { IconPackageImport } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const ComposeStruct: NodeDefinition = {
    id: "Technical/Struct/Compose",
    description: "",
    IsUnique: false,
    hideInLibrary: true,
    icon: IconPackageImport,
    tags: [],
    dataInputs: [],
    dataOutputs: [],
    preventSnippet: true,
    settings: [
    ],
    getData: (portId, node, context) => {
        var a = Object.entries(node.dataInputs).reduce((old, [key, value]) => {
            return { ...old, [key]: context.getInputValue(node, key, value.type), __metaFields: { ...old.__metaFields, [key]: value.type } };
        }, { __metaFields: {}, __metaStructType: node.settings.structId });
        return a;
    },
};
