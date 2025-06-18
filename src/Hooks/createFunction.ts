import { original } from "immer";
import { NodeDefinition } from "../Types/NodeDefinition";
import { TreeStore } from "../Types/TreeStore";
import { createNodeData } from "../Utils/graph/modification/createNodeData";
import { createPortConnection } from "../Utils/graph/modification/createPortConnection";
import { resetCamera } from "../Utils/ui/resetCamera";

export function createCustomFunction(def: NodeDefinition, state: TreeStore) {
  const start = getCustomFunctionStartId(def);
  const end = getCustomFunctionEndId(def);
  state.customNodes[def.id] = def;
  const startNodeDef: NodeDefinition = {
    IsUnique: true,
    hideInLibrary: true,
    description: "",
    id: start,
    tags: [],
    dataInputs: [],
    dataOutputs: structuredClone(def.dataInputs),
    settings: [],
    executeAs: "CustomFunction-start",
  };
  const endNodeDef: NodeDefinition = {
    IsUnique: true,
    description: "",
    hideInLibrary: true,
    id: end,
    tags: [],
    dataInputs: structuredClone(def.dataOutputs),
    dataOutputs: [],

    settings: [],
    executeAs: "CustomFunction-end",
  };
  state.customNodes[start] = startNodeDef;
  state.customNodes[end] = endNodeDef;
  const newStartNode = createNodeData(startNodeDef, 0, 0, start, def.id);
  const newEndNode = createNodeData(endNodeDef, 600, 0, end, def.id);
  state.nodes[start] = newStartNode;
  state.nodes[end] = newEndNode;
  for (let nodeId in original(state.nodes)) {
    let node = state.nodes[nodeId];
    if (node.type === def.id) {
      def.dataInputs.forEach((port) => {
        if (node.dataInputs[port.id] === undefined || node.dataInputs[port.id].type !== port.type) {
          node.dataInputs[port.id] = createPortConnection(port);
        }
      });
      def.dataOutputs.forEach((port) => {
        if (node.dataOutputs[port.id] === undefined || node.dataOutputs[port.id].type !== port.type) {
          node.dataOutputs[port.id] = structuredClone(port);
        }
      });
    }
  }
  state.editedGraph = def.id;

  resetCamera();
}
export function getCustomFunctionEndId(def: NodeDefinition | string) {
  const id = typeof def === "string" ? def : def.id;
  return `${id}-end`;
}
export function getCustomFunctionStartId(def: NodeDefinition | string) {
  const id = typeof def === "string" ? def : def.id;
  return `${id}-start`;
}
