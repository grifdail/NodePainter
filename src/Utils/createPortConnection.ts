import { PortConnection } from "../Types/PortConnection";
import { PortDefinition } from "../Types/PortDefinition";

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
