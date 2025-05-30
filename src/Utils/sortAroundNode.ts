import { GetNodeHeight } from "../Components/Graph/GetNodeHeight";
import { NodeData } from "../Types/NodeData";
import { NodeDefinition } from "../Types/NodeDefinition";
import { TreeStore } from "../Types/TreeStore";

export const sortAroundNode = (tree: TreeStore, targetId: string) => {
  const rootNode = tree.nodes[targetId];
  const columns: { [id: number]: number } = {};
  const nodePerColumn: { [id: string]: number } = { [rootNode.id]: 0 };

  function parseInput(rootnode: NodeData, currentColumn: number) {
    var inputs = getInputNodes(tree, rootnode, tree.getNodeTypeDefinition(rootnode));
    let childHeight = 0;
    inputs.forEach((node) => {
      if (node.id === targetId) {
        return;
      }

      if (nodePerColumn[node.id] === undefined) {
        nodePerColumn[node.id] = currentColumn - 1;
      } else {
        nodePerColumn[node.id] = Math.min(currentColumn - 1, nodePerColumn[node.id]);
      }
      var height = parseInput(node, nodePerColumn[node.id]);
      childHeight += height;
    });
    return Math.max(GetNodeHeight(rootnode, tree.getNodeTypeDefinition(rootnode)), childHeight);
  }

  parseInput(rootNode, 0);

  Object.entries(nodePerColumn).forEach(([key, columnId]) => {
    const node = tree.nodes[key];
    var height = GetNodeHeight(node, tree.getNodeTypeDefinition(node));
    var column = columns[columnId] || 0;
    node.positionX = rootNode.positionX + columnId * 500;
    node.positionY = column;
    columns[columnId] = column + height + 100;
  });
};

/*
function findNodeUsing(tree: TreeStore, nodeId: string): NodeData[] {
  return Object.values(tree.nodes).filter((node) => Object.values(node.dataInputs).some((port) => port.hasConnection && port.connectedNode === nodeId));
}*/
function getInputNodes(tree: TreeStore, node: NodeData, nodeDef: NodeDefinition): NodeData[] {
  var result = [];

  result.push(
    ...Object.values(node.dataInputs)
      .filter((port) => port.hasConnection)
      .map((port) => tree.nodes[port.connectedNode as string])
  );

  return result;
}
/*
function getOutputNodes(tree: TreeStore, node: NodeData, nodeDef: NodeDefinition) {
  var result = [];

  result.push(...findNodeUsing(tree, node.id));
  result.push(
    ...Object.values(node.execOutputs)
      .map((nodeId) => tree.nodes[nodeId as string])
      .filter((output) => output !== undefined)
  );
  return result;
}
*/
