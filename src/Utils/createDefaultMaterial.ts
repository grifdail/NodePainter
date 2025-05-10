import { createDefaultMaterialGenericData } from "../Nodes/3D/VirtualNodeTypes/createDefaultMaterialGenericData";
import { VirtualNodes } from "../Nodes/3D/VirtualNodeTypes/VirtualNodeTypes";
import { MaterialData } from "../Types/MaterialData";
import { Color, createColor } from "../Types/vectorDataType";

export function createDefaultMaterial(color?: Color): MaterialData {
  return VirtualNodes.FlatMaterialType.generate("material", [], color === undefined ? createColor(0, 0.5, 1, 1) : color, createDefaultMaterialGenericData());
}
