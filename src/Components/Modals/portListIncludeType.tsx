import { PortDefinition } from "../../Types/PortDefinition";
import { PortType } from "../../Types/PortType";

export function portListIncludeType(ports: PortDefinition[], target: PortType) {
    return ports.some((port) => port.type === target);
}
