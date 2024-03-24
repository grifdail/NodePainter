import { NodeDefinition } from "./NodeDefinition";
import { NodeCollection } from "./NodeCollection";

export type ExportedCustomFunction = {
  definitions: NodeDefinition[];
  nodes: NodeCollection;
};
