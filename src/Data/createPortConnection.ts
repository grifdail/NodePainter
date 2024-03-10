import { PortDefinition } from "./NodeDefinition";
import { PortConnection } from "../Hooks/useTree";

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
