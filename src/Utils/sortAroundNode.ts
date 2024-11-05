import { GetNodeHeight } from "../Components/Graph/GraphNodeUI";
import { NodeData } from "../Types/NodeData";
import { NodeDefinition } from "../Types/NodeDefinition";
import { TreeStore } from "../Types/TreeStore";

export const sortAroundNode = (tree: TreeStore, targetId: string) => {
  const rootNode = tree.nodes[targetId];
  const visited: { [id: string]: boolean } = {};
  const columns: { [id: number]: number } = {};
  const recomputedPosition: { [id: string]: { x: number; y: number } } = { [rootNode.id]: { x: 0, y: 0 } };

  const sortInput = (parentNode: NodeData, column: number) => {
    visited[parentNode.id] = true;
    const nodeDef = tree.getNodeTypeDefinition(parentNode);
    const nodeToTheLeft = getInputNodes(tree, parentNode, nodeDef);
    nodeToTheLeft.forEach((node) => {
      if (visited[node.id]) {
        return;
      }
      const nodeDef = tree.getNodeTypeDefinition(node);
      const height = GetNodeHeight(node, nodeDef) + 100;
      const y = Math.max(+(columns[column] || 0), recomputedPosition[parentNode.id].y);

      node.positionX = rootNode.positionX + column * 500;
      node.positionY = rootNode.positionY + y;
      columns[column] = y + height;
      recomputedPosition[node.id] = { x: rootNode.positionX + column * 500, y: y };
      if (visited[node.id]) {
        return;
      }
      //sortOutput(node, column + 1);
      sortInput(node, column - 1);
    });
  };

  const sortOutput = (parentNode: NodeData, column: number) => {
    visited[parentNode.id] = true;
    const nodeDef = tree.getNodeTypeDefinition(parentNode);
    const nodeToTheRight = getOutputNodes(tree, parentNode, nodeDef);
    nodeToTheRight.forEach((node) => {
      if (visited[node.id]) {
        return;
      }
      const nodeDef = tree.getNodeTypeDefinition(node);
      const height = GetNodeHeight(node, nodeDef) + 100;
      const y = Math.max(+(columns[column] || 0), recomputedPosition[parentNode.id].y);

      node.positionX = rootNode.positionX + column * 500;
      node.positionY = rootNode.positionY + y;
      columns[column] = y + height;
      recomputedPosition[node.id] = { x: rootNode.positionX + column * 500, y: y };

      sortInput(node, column - 1);
      return sortOutput(node, column + 1);
    });
  };

  sortInput(rootNode, -1);
  sortOutput(rootNode, 1);
};
function findNodeExecuting(tree: TreeStore, nodeId: string): NodeData[] {
  return Object.values(tree.nodes).filter((node) => Object.values(node.execOutputs).some((outputNode) => outputNode === nodeId));
}
function findNodeUsing(tree: TreeStore, nodeId: string): NodeData[] {
  return Object.values(tree.nodes).filter((node) => Object.values(node.dataInputs).some((port) => port.hasConnection && port.connectedNode === nodeId));
}
function getInputNodes(tree: TreeStore, node: NodeData, nodeDef: NodeDefinition) {
  var result = [];
  if (nodeDef.canBeExecuted) {
    result.push(...findNodeExecuting(tree, node.id));
  }
  result.push(
    ...Object.values(node.dataInputs)
      .filter((port) => port.hasConnection)
      .map((port) => tree.nodes[port.connectedNode as string])
  );
  return result;
}
function getOutputNodes(tree: TreeStore, node: NodeData, nodeDef: NodeDefinition) {
  var result = [];
  result.push(
    ...Object.values(node.execOutputs)
      .map((nodeId) => tree.nodes[nodeId as string])
      .filter((output) => output !== undefined)
  );
  result.push(...findNodeUsing(tree, node.id));
  return result;
}
