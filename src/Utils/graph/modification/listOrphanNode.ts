import { START_NODE } from "../../../Nodes/Misc/StartNode";
import { NodeCollection } from "../../../Types/NodeCollection";
import { listChildOfNode } from "./listChildOfNode";

export function listOrphanNode(tree: NodeCollection) {
  const nonOrphanNode = listChildOfNode(START_NODE, tree);
  return Object.keys(tree).filter((nodeId) => nodeId !== START_NODE && !nonOrphanNode.has(nodeId));
}
