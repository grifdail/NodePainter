import { NodeDefinition } from "../Types/NodeDefinition";

export function createExecOutputData(def: NodeDefinition): { [key: string]: string | null } {
  return Object.fromEntries(def.executeOutputs.map((port) => [port, null]));
}
