import { original } from "immer";
import { copyInputPortsValues } from "../../../../Hooks/copyInputPortsValues";
import { copyNodePosition } from "../../../../Hooks/copyNodePosition";
import { CustomSimulation } from "../../../../Nodes/Technical/Simulation/CustomSimulation";
import { CustomSimulationEnd } from "../../../../Nodes/Technical/Simulation/CustomSimulationEnd";
import { CustomSimulationStart } from "../../../../Nodes/Technical/Simulation/CustomSimulationStart";
import { NodeDefinition } from "../../../../Types/NodeDefinition";
import { TreeStore } from "../../../../Types/TreeStore";
import { resetCamera } from "../../../ui/resetCamera";
import { createNodeData } from "../createNodeData";
import { createPortConnection } from "../createPortConnection";

export function createCustomSimulation(def: NodeDefinition, state: TreeStore) {
    const start = `${def.id}-start`;
    const end = `${def.id}-end`;
    const node: NodeDefinition = {
        ...def,
        dataInputs: [...structuredClone(CustomSimulation.dataInputs), ...structuredClone(def.dataInputs), ...structuredClone(def.dataOutputs)],
        settings: CustomSimulation.settings,
    };
    state.customNodes[def.id] = node;
    const startNodeDef: NodeDefinition = {
        IsUnique: true,
        hideInLibrary: true,
        description: "",
        id: start,
        tags: [],
        dataInputs: [],
        dataOutputs: [...structuredClone(def.dataInputs), ...structuredClone(def.dataOutputs)],

        settings: [],
        executeAs: CustomSimulationStart.id,
    };
    const endNodeDef: NodeDefinition = {
        IsUnique: true,
        description: "",
        hideInLibrary: true,
        id: end,
        tags: [],
        dataInputs: [...structuredClone(def.dataOutputs)],
        dataOutputs: [],

        settings: [],
        executeAs: CustomSimulationEnd.id,
    };
    state.customNodes[start] = startNodeDef;
    state.customNodes[end] = endNodeDef;
    const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
    const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
    copyInputPortsValues(state.nodes[end], newEndNode);
    copyNodePosition(state.nodes[end], newEndNode);
    copyNodePosition(state.nodes[start], newStartNode);
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


