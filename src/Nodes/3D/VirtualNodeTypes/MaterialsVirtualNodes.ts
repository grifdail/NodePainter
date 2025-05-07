import { MeshBasicMaterial, MeshNormalMaterial, MeshStandardMaterial } from "three";
import { PortDefinition } from "../../../Types/PortDefinition";
import { Color } from "../../../Types/vectorDataType";
import { toThreeColor } from "../../../Utils/colorUtils";
import { StatefullElementType } from "../../../Utils/statefullContext";

export class FlatMaterialType extends StatefullElementType<MeshBasicMaterial, [color: Color]> {
  create(color: Color): MeshBasicMaterial {
    return new MeshBasicMaterial({ color: toThreeColor(color) });
  }
  remove(element: MeshBasicMaterial): void {
    element.dispose();
  }
  update(element: MeshBasicMaterial, color: Color): void {
    element.color.set(toThreeColor(color));
  }
}

export class StandardMaterialType extends StatefullElementType<MeshStandardMaterial, [color: Color, roughness: number, metalness: number]> {
  create(color: Color, roughness: number, metalness: number): MeshStandardMaterial {
    return new MeshStandardMaterial({ color: toThreeColor(color), roughness, metalness });
  }
  remove(element: MeshStandardMaterial): void {
    element.dispose();
  }
  update(element: MeshStandardMaterial, color: Color, roughness: number, metalness: number): void {
    element.color.set(toThreeColor(color));
    element.roughness = roughness;
    element.metalness = metalness;
  }
}

export abstract class MaterialVirtualNodeType<TMat, TProps extends any[]> extends StatefullElementType<TMat, TProps> {
  abstract getInputs(): PortDefinition[];
}

export class NormalMaterialVirtualNodeType extends StatefullElementType<MeshNormalMaterial, []> {
  create(): MeshNormalMaterial {
    return new MeshNormalMaterial({});
  }
  remove(element: MeshNormalMaterial): void {
    element.dispose();
  }
  update(element: MeshNormalMaterial): void {}
}
