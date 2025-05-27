import { NodeCollection } from "../Types/NodeCollection";
import { NodeDefinition } from "../Types/NodeDefinition";

export type SketchTemplate = {
  nodes: NodeCollection;
  customNodes: { [key: string]: NodeDefinition };
  editedGraph?: string;
  globalSettings?: { [key: string]: any };
};
