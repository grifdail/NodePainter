import { NodeCollection } from "../../../Types/NodeCollection";

export function listChildOfNode(startNodeId: string, tree: NodeCollection) {
  var child = new Set<string>();
  var activeList: string[] = [startNodeId];
  while (activeList.length > 0) {
    const current = activeList.pop() as string;
    const node = tree[current];
    Object.values(node.dataInputs).forEach((port) => {
      if (port.hasConnection) {
        const connectedNode = port.connectedNode as string;
        if (!child.has(connectedNode)) {
          child.add(connectedNode);
          activeList.push(connectedNode);
        }
      }
    });
  }
  return child;
}
