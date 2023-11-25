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

  setNodePosition(id: string, x: number, y: number) {
    this.nodes[id].positionX = x;
    this.nodes[id].positionY = y;
  }

  AddJoin(sourceId: string, sourcePort: string, targetId: string, targetPort: string) {
    var port = this.nodes[targetId].inputs[targetPort];
    // eslint-disable-next-line eqeqeq
    if (port != undefined) {
      port.hasConnection = true;
      port.connectedNode = sourceId;
      port.connectedPort = sourcePort;
    } else {
      this.nodes[sourceId].output[sourcePort] = targetId;
    }
  }
}
