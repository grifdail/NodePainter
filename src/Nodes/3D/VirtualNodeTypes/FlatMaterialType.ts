import { MeshBasicMaterial } from "three";
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
