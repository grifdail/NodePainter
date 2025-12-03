import { usePlayerPref } from "../../../Hooks/usePlayerPref";
import { START_NODE, StartNode } from "../../../Nodes/StartNode";
import { NodeCollection } from "../../../Types/NodeCollection";
import { createNodeData } from "./createNodeData";

export function createDefaultNodeConnection(): NodeCollection {
  const start = createNodeData(StartNode, 0, 0, START_NODE);
  start.settings.author = usePlayerPref.getState().authorName;
  return {
    [start.id]: start,
  };
}
