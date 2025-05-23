export type BasePortType = "number" | "vector" | "vector2" | "vector3" | "vector4" | "color" | "string" | "bool" | "image" | "gradient" | "material" | "mesh" | "struct" | "object3d" | "drawing2d";
export type PortType = "execute" | BasePortType | `array-${BasePortType}` | "unknown";
export const BasePortTypeArray: PortType[] = ["number", "vector2", "vector3", "vector4", "color", "string", "bool", "image", "gradient", "material", "mesh", "struct", "object3d", "drawing2d"];
export const PortTypeArray: PortType[] = [...BasePortTypeArray, ...BasePortTypeArray.map((key) => `array-${key}` as PortType)];
export const VectorTypesFull: PortType[] = ["number", "vector2", "vector3", "color"];
export const VectorTypesPosition: PortType[] = ["number", "vector2", "vector3", "vector4"];
export const VectorTypeslimited: PortType[] = ["vector2", "vector3"];
export const VectorLength: { [key: string]: number } = { number: 1, vector2: 2, vector3: 3, vector4: 4, color: 4 };
export const CommonTypes: BasePortType[] = ["number", "vector2", "vector3", "color", "gradient", "image", "string", "material", "bool", "mesh", "struct", "object3d", "drawing2d"];
export const ArrayCommonTypes: PortType[] = CommonTypes.map((key) => `array-${key}` as PortType);
export const FullCommonTypes = [...CommonTypes, ...ArrayCommonTypes];

export const ArrayTypes: PortType[] = BasePortTypeArray.map((key) => `array-${key}` as PortType);
export const VectorArrayTypes: PortType[] = VectorTypesFull.map((key) => `array-${key}` as PortType);
