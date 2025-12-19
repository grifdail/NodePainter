import { IconArrowsMove } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomSimulationStart: NodeDefinition = {
    id: "Technical/Simulation/Start",
    description: "",
    IsUnique: true,
    icon: IconArrowsMove,
    tags: [],
    hideInLibrary: true,
    dataInputs: [],
    preventSnippet: true,
    dataOutputs: [],
    settings: [],
    getData: (portId, node, context) => {
        var contextFn = context.functionStack[context.functionStack.length - 1];
        return contextFn[portId].value;
    },
};
