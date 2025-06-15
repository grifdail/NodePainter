import { NodeData } from "../Types/NodeData";
import { TreeStore } from "../Types/TreeStore";
import { createNodeData } from "./createNodeData";

export function duplicateNode(state: TreeStore, sourceNode: NodeData, x: number, y: number, graph: string) {
  const clone = createNodeData(state.getNodeTypeDefinition(sourceNode), x, y);
  clone.dataInputs = structuredClone(sourceNode.dataInputs);
  clone.dataOutputs = structuredClone(sourceNode.dataOutputs);
  clone.settings = structuredClone(sourceNode.settings);
  clone.selectedType = sourceNode.selectedType;
  clone.graph = graph;
  clone.pairedNode = sourceNode.pairedNode;
  clone.label = sourceNode.label;
  return clone;
}
