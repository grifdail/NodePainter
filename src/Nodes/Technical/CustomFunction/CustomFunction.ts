import { IconArrowsMove } from "@tabler/icons-react";
import { getCustomFunctionEndId } from "../../../Hooks/createFunction";
import { NodeDefinition } from "../../../Types/NodeDefinition";

export const CustomFunction: NodeDefinition = {
    id: "Technical/CustomFunction/Base",
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
        const source = context.findNodeOfType(getCustomFunctionEndId(node.type));
        if (!source) {
            return null;
        }
        context.functionStack.push(context.createFunctionContext(node));

        var result = context.getInputValue(source, portId, node.dataOutputs[portId].type);
        context.functionStack.pop();
        return result;
    },
};
