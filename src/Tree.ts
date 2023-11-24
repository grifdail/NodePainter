import { NodeData } from "./NodeData";

export class Tree {
  nodes: { [key: string]: NodeData } = {};

  getNode(key: string) {
    return this.nodes[key];
  }

  AddNode(arg0: string, posX: number, posY: number) {
    var newNodeData = new NodeData(arg0);
    this.nodes[newNodeData.id] = newNodeData;
    newNodeData.positionX = posX;
    newNodeData.positionY = posY;
    return newNodeData;
  }
}
