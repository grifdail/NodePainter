import { PortDefinition } from "../../../Types/PortDefinition";
import { createDefaultMaterial } from "../../../Utils/createDefaultMaterial";
import { StatefullElementType } from "../../../Utils/statefullContext";

export abstract class SimpleNodeVirtualNodeType<TMat, TProps extends any[]> extends StatefullElementType<TMat, TProps> {
  abstract getInputs(): PortDefinition[];
  abstract getId(): string;
  abstract getDescription(): string;
  abstract getOutput(): PortDefinition;
  getLabel(): string {
    return this.getId();
  }
}
export abstract class MaterialVirtualNodeType<TMat, TProps extends any[]> extends SimpleNodeVirtualNodeType<TMat, TProps> {
  getOutput(): PortDefinition {
    return {
      id: "out",
      type: "material",
      defaultValue: createDefaultMaterial(),
    };
  }
}

export abstract class Object3DVirtualNodeType<TMat, TProps extends any[]> extends SimpleNodeVirtualNodeType<TMat, TProps> {
  getOutput(): PortDefinition {
    return {
      id: "out",
      type: "object3d",
      defaultValue: null,
    };
  }
}
