import { NodeData } from "../Types/NodeData";

export function copyInputPortsValues(source: NodeData, target: NodeData) {
  if (source) {
    Object.entries(source.dataInputs).forEach(([portId, connection]) => {
      if (target.dataInputs[portId] && target.dataInputs[portId].type === connection.type) {
        target.dataInputs[portId].hasConnection = connection.hasConnection;
        target.dataInputs[portId].connectedNode = connection.connectedNode;
        target.dataInputs[portId].connectedNode = connection.connectedNode;
        target.dataInputs[portId].connectedPort = connection.connectedPort;
      }
    });
  }
}
