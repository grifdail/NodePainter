import { PortDefinition } from "../Types/PortDefinition";
import { PortConnection } from "../Types/PortConnection";

export function createPortConnection(def: PortDefinition): PortConnection {
  return {
    id: def.id,
    type: def.type,
    ownValue: structuredClone(def.defaultValue),
    hasConnection: false,
    connectedNode: null,
    connectedPort: null,
    label: def.label,
  };
}
