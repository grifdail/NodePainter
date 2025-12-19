import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomFunctionEnd: NodeDefinition = {
    id: "Technical/CustomFunction/End",
    description: "",
    IsUnique: true,
    hideInLibrary: true,
    icon: IconArrowsMove,
    tags: [],
    dataInputs: [],
    dataOutputs: [],
    preventSnippet: true,
    settings: [],
    getData: (portId, node, context) => {
        return context.getInputValue(node, portId, "unknown");
    },
};
