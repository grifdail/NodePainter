import { PortDefinition } from "../../../Types/PortDefinition";
import { StatefullElementType } from "../../../Utils/statefullContext";

export abstract class SimpleNodeVirtualNodeType<TMat, TProps extends any[]> extends StatefullElementType<TMat, TProps> {
  abstract getInputs(): PortDefinition[];
  abstract getId(): string;
  abstract getDescription(): string;
  abstract getOutput(): PortDefinition;
  getLabel(): string {
    return this.getId();
  }
  getTags(): string[] {
    return [];
  }
  getHash(...props: TProps): string {
    return "";
  }
}
