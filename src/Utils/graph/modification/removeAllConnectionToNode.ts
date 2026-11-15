import { NodeCollection } from "../../../Types/NodeCollection";
import { NodeData } from "../../../Types/NodeData";

export function removeAllConnectionToNode(nodes: NodeCollection, nodeId: string) {
    Object.values(nodes).forEach((item: NodeData) => {
        Object.values(item.dataInputs).forEach((port) => {
            if (!(port.hasConnection && port.connectedNode === nodeId)) {
                return;
            }
            port.hasConnection = false;
            port.connectedNode = null;
            port.connectedPort = null;
        });
    });
}
