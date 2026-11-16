import { IconCodeDots } from "@tabler/icons-react";
import { useTree } from "../../Hooks/useTree";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheStatic, readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";
import { createDefaultJavascriptFunction } from "../../Utils/JavascriptFunction/createDefaultJavascriptFunction";
import { evalFunction } from "../../Utils/JavascriptFunction/javascriptFunctionGlobalScope";

export const JavascriptFunctionNode: NodeDefinition = {
    id: "Misc/JavascriptFunction",
    description: "Execute a javascript function",
    icon: IconCodeDots,
    tags: ["Misc"],
    preventSnippet: false,
    hideInLibrary: false,
    dataInputs: [Port.CacheId(), Port.Version()],
    dataOutputs: [],
    settings: [
        {
            id: "code",
            type: "js-function",
            defaultValue: createDefaultJavascriptFunction(),
            onChange(node, newValue, oldValue, definitions) {
                var tree = useTree.getState();
                tree.replaceInputs((t) => t.id === node.id, [Port.CacheId(), Port.Version(), ...newValue.inputVariables]);
                tree.replaceOutput((t) => t.id === node.id, newValue.outputVariables);
            },
        },
    ],
    getData: (portId, node, context) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = readFromCacheWithVersion(context, node, () => {
            const fn = readFromCacheStatic(context, node, "func", () => {
                var baseFn = evalFunction(node.settings.code.code);
                if (typeof (baseFn) !== "function") {
                    throw new Error(`Function in node id did not return a function`)
                }
                return baseFn;
            })

            let state = context.createFunctionContext(node);
            //State is an object {portId: {value: any, type: PortType}}
            // Therefore we need to convert it to raw {portId: any}
            let stateRaw = Object.entries(state).reduce((old, [key, value]) => ({ ...old, [key]: value.value }))

            var output = fn(stateRaw);
            return output;
        })


        if (!result[portId]) {
            throw new Error(`There's no variable named "${portId}" in the Javascript Function node.`);
        }
        return result[portId];
    },
};
