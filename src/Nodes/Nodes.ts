import { NodeDefinition } from "../Types/NodeDefinition";

import { Nodes3D } from "./3D/3DNodes";
import { ArrayNodes } from "./Array";
import { ColorNodes } from "./Color";
import { createConstant } from "./createConstant";
import { createFakeContext } from "./createFakeContext";
import { DictionaryNodes } from "./Dictionary";
import { DrawNodes } from "./Draw";
import { EffectNodes } from "./Effects";
import { ImageNodes } from "./Images";
import { InputNodes } from "./Inputs";
import { LogicNodes } from "./Logic";
import { MathNodes } from "./Math";
import { MiscNodes } from "./Misc";
import { ProceduralNodes } from "./Procedural";
import { RandomNodes } from "./Random";
import { ShaderNodes } from "./Shaders";
import { StartNode } from "./StartNode";
import { StateNodes } from "./State";
import { TechnicalNodes } from "./Technical";
import { TextNodes } from "./Text";

export const Nodes: Array<NodeDefinition> = [
    StartNode,

    ...ArrayNodes,
    ...ColorNodes,
    ...DictionaryNodes,
    ...DrawNodes,
    ...EffectNodes,
    ...ImageNodes,
    ...InputNodes,
    ...LogicNodes,
    ...MathNodes,
    ...MiscNodes,
    ...ProceduralNodes,
    ...RandomNodes,
    ...ShaderNodes,
    ...StateNodes,
    ...TechnicalNodes,
    ...TextNodes,

    // Constant
    createConstant("Pi", Math.PI),
    createConstant("Tau", Math.PI * 2),
    createConstant("E", Math.E),
    createConstant("Sqrt2", Math.SQRT2),

    ...Nodes3D,
];

console.log(`Loading ${Nodes.length} nodes.`);

export const NodeLibrary = Object.fromEntries(Nodes.map((node) => [node.id, node]));
function createInjectCache() {
    var nodes = Object.entries(NodeLibrary);
    function set(target: any, path: string[], item: any) {
        var original = target;
        for (let index = 0; index < path.length; index++) {
            if (index === path.length - 1) {
                target[path[index]] = item;
            } else {
                var nextTarget = target[path[index]] || {};
                target[path[index]] = nextTarget;
                target = nextTarget;
            }
        }
        return original;
    }

    const m = {}
    nodes.filter(([id, n]) => {
        return !n.IsUnique && !n.hideInLibrary && !n.hideInJs
    }).map(([id, n]) => {
        if (n.availableTypes && n.availableTypes.length > 1) {

        } else {
            if (n.dataOutputs.length === 1) {
                const fn = (...params: any[]) => {

                    return n.getData?.(n.dataOutputs[0].id, ...createFakeContext(params, n))
                }

                return [id, fn] as const
            }
        }


        return [id, null] as const
    }).filter(([id, n]) => {
        return n !== null;
    }).forEach(([id, n]) => set(m, id.split("/"), n))
    console.log(m);
}
createInjectCache();


