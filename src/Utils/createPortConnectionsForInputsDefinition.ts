import { NodeDefinition } from "../Types/NodeDefinition";
import { PortDefinition } from "../Types/PortDefinition";
import { createPortConnection } from "./createPortConnection";
import { PortConnection } from "../Types/PortConnection";

export function createPortConnectionsForInputsDefinition(def: NodeDefinition): { [key: string]: PortConnection } {
  return def.dataInputs.reduce((old: any, port: PortDefinition) => {
    const connection = createPortConnection(port);
    old[port.id] = connection;
    return old;
  }, {});
}
