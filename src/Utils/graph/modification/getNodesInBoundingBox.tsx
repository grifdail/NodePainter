import { GetNodeHeight } from "../../../Components/Graph/GetNodeHeight";
import { NODE_WIDTH } from "../../../Components/Graph/NodeVisualConst";
import { useTree } from "../../../Hooks/useTree";
import { BoundingBox } from "../../../Types/BoundingBox";

export function getNodesInBoundingBox(box: BoundingBox) {
  const tree = useTree.getState();
  const nodes = Object.values(tree.nodes)
    .filter((node) => {
      if (node.graph !== tree.editedGraph) {
        return false;
      }
      if (node.positionX + NODE_WIDTH < box.left || node.positionX > box.right || node.positionY > box.bottom) {
        return false;
      }
      var nodeHeight = GetNodeHeight(node, tree.getNodeTypeDefinition(node));
      return !(node.positionY + nodeHeight < box.top);
    })
    .map((node) => node.id);
  return nodes;
}
