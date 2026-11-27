import { FakeMaterialData } from "../../../Types/MaterialData";
import { Color, createColor } from "../../../Types/vectorDataType";

//Not using Virtual Node here cause it create a Circular dependency as node are defined using Port
export function createDefaultMaterial(color?: Color): FakeMaterialData {
    return {
        color: color === undefined ? createColor(0, 0.5, 1, 1) : color
    };
}
