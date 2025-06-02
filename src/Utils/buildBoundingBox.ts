import { GetNodeHeight } from "../Components/Graph/GetNodeHeight";
import { NODE_WIDTH } from "../Components/Graph/NodeVisualConst";
import { BoundingBox } from "../Types/BoundingBox";
import { TreeStore } from "../Types/TreeStore";

export function buildBoundingBox(nodeIds: string[], state: TreeStore) {
  var nodes = nodeIds.map((id) => {
    const n = state.nodes[id];
    return {
      node: n,
      boundingBox: new BoundingBox(n.positionY, n.positionX + NODE_WIDTH, n.positionY + GetNodeHeight(n, state.getNodeTypeDefinition(n)), n.positionX),
    };
  });
  var defaultBB = nodes[0].boundingBox;
  var bb = nodes.reduce((old, bb) => old.extend(bb.boundingBox), defaultBB);
  return { bb, nodes };
}
