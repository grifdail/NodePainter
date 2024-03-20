import { useTree } from "../Hooks/useTree";
import { GetNodeHeight } from "../Components/Graph/GraphNodeUI";
import { BoundingBox } from "../Types/BoundingBox";
import { useViewbox } from "../Hooks/useViewbox";

export const resetCamera = () => {
  const tree = useTree.getState();

  const boundingBox = Object.values(tree.nodes)
    .filter((node) => node.graph === tree.editedGraph)
    .map((node) => {
      return new BoundingBox(node.positionY, node.positionX + 300, node.positionY + GetNodeHeight(node, tree.getNodeTypeDefinition(node)), node.positionX);
    })
    .reduce((old, bb) => old.extend(bb), new BoundingBox(0, 100, 100, 0))
    .grow(100, 200, 100, 200);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  var scale = Math.max(boundingBox.width() / windowWidth, boundingBox.height() / windowHeight, 1);
  useViewbox.getState().set(boundingBox.left, boundingBox.top, scale);
};
