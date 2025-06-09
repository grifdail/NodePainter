import { Icon, IconPaint } from "@tabler/icons-react";
import { PortDefinition } from "../../../Types/PortDefinition";
import { createDefaultMaterial } from "../../../Utils/createDefaultMaterial";
import { SimpleNodeVirtualNodeType } from "./SimpleNodeVirtualNodeType";

export abstract class MaterialVirtualNodeType<TMat, TProps extends any[]> extends SimpleNodeVirtualNodeType<TMat, TProps> {
  getOutput(): PortDefinition {
    return {
      id: "out",
      type: "material",
      defaultValue: createDefaultMaterial(),
    };
  }
  getTags(): string[] {
    return ["materials"];
  }
  getIcon(): Icon {
    return IconPaint;
  }
}
