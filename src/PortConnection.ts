﻿import { Tree } from "./Tree";

export class PortConnection {
  hasConnection: boolean = false;
  ownValue: any = null;
  connectedNode: string | null = null;
  connectedPort: string | null = null;

  getValue(tree: Tree) {
    if (this.hasConnection && this.connectedNode != null && this.connectedPort != null) {
      var node = tree.getNode(this.connectedNode);
      return node.getType().getData(this.connectedPort, node, tree);
    }
  }
}
