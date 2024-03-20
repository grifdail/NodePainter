import { canConvert } from "./convertTypeValue";
import { PortConnection } from "../Types/PortConnection";
import { NodeData } from "../Types/NodeData";

export function ensureValidGraph(state: any) {
  for (let nodeId in state.nodes) {
    const selfNode = state.nodes[nodeId] as NodeData;
    for (let input in selfNode.dataInputs) {
      let port = selfNode.dataInputs[input] as PortConnection;
      if (port.hasConnection) {
        let targetNode = state.nodes[port.connectedNode as string] as NodeData;
        if (!targetNode) {
          var def = state.getNodeTypeDefinition(selfNode);
          if (def.unbindPort != null) {
            def.unbindPort(port.id, selfNode, "inputData");
          }
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }

        let defPort = targetNode.dataOutputs[port.connectedPort as string];
        if (!defPort || !canConvert(defPort.type, port.type)) {
          port.hasConnection = false;
          port.connectedNode = null;
          port.connectedPort = null;
        }
      }
    }
  }
}
