import { createDefaultMaterialGenericData } from "../../../Nodes/3D/VirtualNodeTypes/createDefaultMaterialGenericData";
import { MaterialData } from "../../../Types/MaterialData";
import { Color, createColor } from "../../../Types/vectorDataType";

//Not using Virtual Node here cause it create a Circular dependency as node are defined using Port
export function createDefaultMaterial(color?: Color): MaterialData {
  return {
    type: "FlatMaterialType",
    props: [color === undefined ? createColor(0, 0.5, 1, 1) : color, createDefaultMaterialGenericData()],
    key: "material",
    children: {},
  };
}
