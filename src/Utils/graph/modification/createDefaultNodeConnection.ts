import { START_NODE, StartNode } from "../../../Nodes/StartNode";
import { NodeCollection } from "../../../Types/NodeCollection";
import { createNodeData } from "./createNodeData";

export function createDefaultNodeConnection(): NodeCollection {
  const start = createNodeData(StartNode, 0, 0, START_NODE);
  return {
    [start.id]: start,
  };
}
