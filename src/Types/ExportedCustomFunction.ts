import { NodeCollection } from "./NodeCollection";
import { NodeDefinition } from "./NodeDefinition";

export type ExportedCustomFunction = {
  definitions: NodeDefinition[];
  nodes: NodeCollection;
};
