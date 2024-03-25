import { MaterialData } from "../Types/MaterialData";
import { Color, createColor } from "../Types/vectorDataType";

export function createDefaultMaterial(color?: Color): MaterialData {
  return {
    id: "DefaultMaterial",
    color: color || createColor(1, 1, 1),
  };
}
