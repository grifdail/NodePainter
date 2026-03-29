import { original } from "immer";
import { copyInputPortsValues } from "../../../../Hooks/copyInputPortsValues";
import { ShaderMaterialEnd } from "../../../../Nodes/Technical/MaterialShader/ShaderMaterialEnd";
import { ShaderMaterialStart } from "../../../../Nodes/Technical/MaterialShader/ShaderMaterialStart";
import { NodeDefinition } from "../../../../Types/NodeDefinition";
import { TreeStore } from "../../../../Types/TreeStore";
import { createColor } from "../../../../Types/vectorDataType";
import { resetCamera } from "../../../ui/resetCamera";
import { createNodeData } from "../createNodeData";
import { createPortConnection } from "../createPortConnection";

export function createCustomShaderMaterial(def: NodeDefinition, state: TreeStore) {
    const start = `${def.id}-start`;
    const end = `${def.id}-end`;
    const callNodDef: NodeDefinition = {
        ...def,
        dataInputs: [...def.dataInputs],
    };
    state.customNodes[def.id] = callNodDef;
    const startNodeDef: NodeDefinition = {
        IsUnique: true,
        hideInLibrary: true,
        description: "",
        id: start,
        tags: [],
        dataInputs: [],
        dataOutputs: [...structuredClone(def.dataInputs)],

        settings: [],
        executeAs: ShaderMaterialStart.id,
    };
    const endNodeDef: NodeDefinition = {
        IsUnique: true,
        description: "",
        hideInLibrary: true,
        id: end,
        tags: [],
        dataInputs: [
            {
                id: "color",
                type: "color",
                defaultValue: createColor(),
            },
        ],
        dataOutputs: [],

        settings: [],
        executeAs: ShaderMaterialEnd.id,
    };
    state.customNodes[start] = startNodeDef;
    state.customNodes[end] = endNodeDef;
    const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
    const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
    copyInputPortsValues(state.nodes[end], newEndNode);
    state.nodes[start] = newStartNode;
    state.nodes[end] = newEndNode;

    for (const nodeId in original(state.nodes)) {
        const node = state.nodes[nodeId];
        if (node.type === def.id) {
            def.dataInputs.forEach((port) => {
                if (node.dataInputs[port.id] === undefined || node.dataInputs[port.id].type !== port.type) {
                    node.dataInputs[port.id] = createPortConnection(port);
                }
            });
        }
    }
    state.editedGraph = def.id;

    resetCamera();
}