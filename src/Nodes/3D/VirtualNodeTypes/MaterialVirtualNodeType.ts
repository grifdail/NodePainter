import { Icon, IconPaint } from "@tabler/icons-react";
import { NodeTags } from "../../../Types/NodeTags";
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
  getTags(): NodeTags[] {
    return ["Material"];
  }
  getIcon(): Icon {
    return IconPaint;
  }
}
