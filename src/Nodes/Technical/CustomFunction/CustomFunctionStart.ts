import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomFunctionStart: NodeDefinition = {
    id: "Technical/CustomFunction/Start",
    description: "",
    IsUnique: true,
    icon: IconArrowsMove,
    tags: [],
    hideInLibrary: true,
    dataInputs: [],
    dataOutputs: [],
    preventSnippet: true,
    settings: [],
    getData: (portId, node, context) => {
        var contextFn = context.functionStack[context.functionStack.length - 1];
        return contextFn[portId].value;
    },
};
