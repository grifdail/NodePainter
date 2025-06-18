import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortDefinition } from "../../../Types/PortDefinition";

export function createObjectFromOutputPortDefinition(def: NodeDefinition): { [key: string]: PortDefinition } {
  return Object.fromEntries(def.dataOutputs.map((port) => [port.id, structuredClone(port)]));
}
