import { MeshStandardMaterial } from "three";
import { Color } from "../../../Types/vectorDataType";
import { toThreeColor } from "../../../Utils/colorUtils";
import { StatefullElementType } from "../../../Utils/statefullContext";

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
