import { PortDefinition } from "../../../Types/PortDefinition";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export abstract class Object3DVirtualNodeType<TMat, TProps extends any[]> extends SimpleNodeVirtualNodeType<TMat, TProps> {
  getOutput(): PortDefinition {
    return {
      id: "out",
      type: "object3d",
      defaultValue: null,
    };
  }
}
