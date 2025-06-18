import { Icon, IconBadge3d } from "@tabler/icons-react";
import { NodeTags } from "../../../Types/NodeTags";
import { PortDefinition } from "../../../Types/PortDefinition";
import { StatefullElementType } from "./statefullContext";

export abstract class SimpleNodeVirtualNodeType<TMat, TProps extends any[]> extends StatefullElementType<TMat, TProps> {
  abstract getInputs(): PortDefinition[];
  abstract getId(): string;
  abstract getDescription(): string;
  abstract getOutput(): PortDefinition;
  getLabel(): string {
    return this.getId();
  }
  getTags(): NodeTags[] {
    return [];
  }
  getHash(...props: TProps): string {
    return "";
  }
  getIcon(): Icon {
    return IconBadge3d;
  }
}
