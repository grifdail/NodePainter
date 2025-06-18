import { PortConnection } from "../../../Types/PortConnection";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortType } from "../../../Types/PortType";
import { canConvertCode, convertTypeValue } from "../execution/convertTypeValue";

/**
 * Convert the Port Connection from it's current definition to a new one, converting type if needed
 * @param port The original port connection
 * @param newPort The definition of the new port.
 * @param retrieveConnectedOutputPort A function that must return the output port of any other node
 * @returns
 */
export function convertPortConnection(port: PortConnection, newPort: PortDefinition, retrieveConnectedOutputPort?: (id: string | null, port: string | null) => PortType): PortConnection {
  return {
    ...convertPortConnectionType(port, newPort.type, retrieveConnectedOutputPort),
    label: newPort.label,
    constrains: newPort.constrains,
    tooltip: newPort.tooltip,
  };
}

function convertPortConnectionType(port: PortConnection, newType: PortType, retrieveConnectedOutputPort?: (id: string | null, port: string | null) => PortType): PortConnection {
  return {
    ...port,
    ownValue: convertTypeValue(port.ownValue, port.type, newType),
    type: newType,
    hasConnection: retrieveConnectedOutputPort && port.hasConnection ? canConvertCode(retrieveConnectedOutputPort(port.connectedNode, port.connectedPort), newType) : port.hasConnection,
  };
}
