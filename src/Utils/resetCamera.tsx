import { useTree } from "../Hooks/useTree";
import { GetNodeHeight } from "../Components/Graph/GraphNodeUI";
import { BoundingBox } from "../Types/BoundingBox";
import { useViewbox } from "../Hooks/useViewbox";
import { NodeData } from "../Types/NodeData";
import { NODE_WIDTH } from "../Components/Graph/NodeVisualConst";

export const resetCamera = () => {
  const tree = useTree.getState();

  const toBoundingBox = (node: NodeData) => {
    return new BoundingBox(node.positionY, node.positionX + NODE_WIDTH, node.positionY + GetNodeHeight(node, tree.getNodeTypeDefinition(node)), node.positionX);
  };

  var firstNode = Object.values(tree.nodes).find((node) => node.graph === tree.editedGraph);

  var defaultBB = firstNode ? toBoundingBox(firstNode) : new BoundingBox(0, 100, 100, 0);

  const boundingBox = Object.values(tree.nodes)
    .filter((node) => node.graph === tree.editedGraph)
    .map(toBoundingBox)
    .reduce((old, bb) => old.extend(bb), defaultBB)
    .grow(100, 200, 100, 200);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  var scale = Math.max(boundingBox.width() / windowWidth, boundingBox.height() / windowHeight, 1);
  useViewbox.getState().set(boundingBox.left - Math.max(0, windowWidth - boundingBox.width() / scale) * 0.5 * scale, boundingBox.top - Math.max(0, windowHeight - boundingBox.height() / scale) * 0.5 * scale, scale);
};
