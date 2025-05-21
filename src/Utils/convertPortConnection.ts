import { PortConnection } from "../Types/PortConnection";
import { PortDefinition } from "../Types/PortDefinition";
import { PortType } from "../Types/PortType";
import { canConvertCode, convertTypeValue } from "./convertTypeValue";

export function convertPortConnection(port: PortConnection, newPort: PortDefinition, getPort?: (id: string | null, port: string | null) => PortType): PortConnection {
  return {
    ...convertPortConnectionType(port, newPort.type, getPort),
    label: newPort.label,
    constrains: newPort.constrains,
    tooltip: newPort.tooltip,
  };
}
export function convertPortConnectionType(port: PortConnection, newType: PortType, getPort?: (id: string | null, port: string | null) => PortType): PortConnection {
  return {
    ...port,
    ownValue: convertTypeValue(port.ownValue, port.type, newType),
    type: newType,
    hasConnection: getPort && port.hasConnection ? canConvertCode(getPort(port.connectedNode, port.connectedPort), newType) : port.hasConnection,
  };
}
