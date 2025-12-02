import { IconCodeDots } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";
import { createDefaultJavascriptFunction } from "../../Utils/JavascriptFunction/createDefaultJavascriptFunction";
import { evalFunction } from "../../Utils/JavascriptFunction/javascriptFunctionGlobalScope";

export const JavascriptFunctionNode: NodeDefinition = {
    id: "Misc/JavascriptFunctionNode",
    description: "Custom function",
    icon: IconCodeDots,
    tags: [],
    preventSnippet: true,
    hideInLibrary: false,
    dataInputs: [Port.CacheId()],
    dataOutputs: [],
    settings: [
        {
            id: "code",
            type: "js-function",
            defaultValue: createDefaultJavascriptFunction(),
        },
    ],
    getData: (portId, node, context) => {
        const stateId = `${node.id}-state`;
        const fn = createFunctionFromCache(context, node.id, node.settings.code.code);

        const output = createOrSelectFromCache(context, node, () => {
            let state = context.createFunctionContext(node);


            var output = fn(Object.entries(state).reduce((old, [key, value]) => ({ ...old, [key]: value.value })));
            return output;
        });

        if (!output[portId]) {
            throw new Error(`There's no variable named "${portId}" in the Javascript Function node.`);
        }
        return output[portId];
    },
};
function createFunctionFromCache(context: ExecutionContext, id: string, code: any) {
    const key = `code-${id}-val`;
    if (!context.blackboard[key]) {

        var baseFn = evalFunction(code);
        if (typeof (baseFn) !== "function") {
            throw new Error(`Function in node id did not return a function`)
        }
        context.blackboard[key] = baseFn;
    }
    return context.blackboard[key]
}

