import { NodeData } from "../Types/NodeData";
import { PortConnection } from "../Types/PortConnection";
import { canConvertCode } from "./convertTypeValue";

export function ensureValidGraph(state: any) {
  for (let nodeId in state.nodes) {
    const selfNode = state.nodes[nodeId] as NodeData;
    for (let input in selfNode.dataInputs) {
      let port = selfNode.dataInputs[input] as PortConnection;
      if (port.hasConnection) {
        let targetNode = state.nodes[port.connectedNode as string] as NodeData;
        if (!targetNode) {
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }

        let defPort = targetNode.dataOutputs[port.connectedPort as string];
        if (!defPort || !canConvertCode(defPort.type, port.type)) {
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }
      }
    }
  }
}
