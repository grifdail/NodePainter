import { NodeDefinition } from "./NodeDefinition";

export const NodeLibrary: { [key: string]: NodeDefinition } = {};

export const AddNode = (node: NodeDefinition) => {
  NodeLibrary[node.id] = node;
};
