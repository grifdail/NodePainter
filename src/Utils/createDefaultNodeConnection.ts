import { NodeLibrary } from "../Nodes/Nodes";
import { START_NODE } from "../Nodes/System/StartNode";
import { NodeCollection } from "../Types/NodeCollection";
import { createNodeData } from "./createNodeData";

export function createDefaultNodeConnection(): NodeCollection {
  const start = createNodeData(NodeLibrary.Start, 0, 0, START_NODE);

  return {
    [start.id]: start,
  };
}
