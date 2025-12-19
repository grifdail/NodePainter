import { IconCodeDots } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { cacheBehaviorSettingWithNoCache } from "../../Utils/graph/definition/cacheBehaviorSetting";
import { frameCacheSetting } from "../../Utils/graph/definition/FrameCacheSetting";
import { readFromCache, useFrameCache } from "../../Utils/graph/execution/blackboardCache";
import { ExecutionContext } from "../../Utils/graph/execution/createExecutionContext";
import { createDefaultJavascriptFunction } from "../../Utils/JavascriptFunction/createDefaultJavascriptFunction";
import { evalFunction } from "../../Utils/JavascriptFunction/javascriptFunctionGlobalScope";

export const JavascriptFunctionNode: NodeDefinition = {
    id: "Misc/JavascriptFunction",
    description: "Execute a javascript function",
    icon: IconCodeDots,
    tags: ["Misc"],
    preventSnippet: false,
    hideInLibrary: false,
    dataInputs: [Port.CacheId()],
    dataOutputs: [],
    settings: [
        {
            id: "code",
            type: "js-function",
            defaultValue: createDefaultJavascriptFunction(),
            onChange(node, newValue, oldValue, definitions) {
                console.log("cccc");
                var tree = useTree.getState();
                tree.replaceInputs((t) => t.id === node.id, [Port.CacheId(), ...newValue.inputVariables]);
                tree.replaceOutput((t) => t.id === node.id, newValue.outputVariables);
            },
        },
        frameCacheSetting(), cacheBehaviorSettingWithNoCache()
    ],
    getData: (portId, node, context) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = useFrameCache(context, node, () => {
            const fn = createFunctionFromCache(context, node.id, node.settings.code.code);

            const output = readFromCache(context, node, () => {
                let state = context.createFunctionContext(node);
                //State is an object {portId: {value: any, type: PortType}}
                // Therefore we need to convert it to raw {portId: any}
                let stateRaw = Object.entries(state).reduce((old, [key, value]) => ({ ...old, [key]: value.value }))

                var output = fn(stateRaw);
                return output;
            });
            return output
        })


        if (!result[portId]) {
            throw new Error(`There's no variable named "${portId}" in the Javascript Function node.`);
        }
        return result[portId];
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

