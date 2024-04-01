export type BasePortType = "number" | "vector2" | "color" | "string" | "bool" | "image" | "gradient" | "vector" | "vector3" | "vector4" | "material";
export type PortType = "execute" | BasePortType | `array-${BasePortType}` | "unknown";
export const BasePortTypeArray: PortType[] = ["number", "vector2", "color", "string", "bool", "image", "gradient", "vector3", "vector4", "material"];
export const PortTypeArray: PortType[] = [...BasePortTypeArray, ...BasePortTypeArray.map((key) => `array-${key}` as PortType)];
export const VectorTypesFull: PortType[] = ["number", "vector2", "vector3", "color"];
export const VectorTypeslimited: PortType[] = ["vector2", "vector3"];
export const VectorLength: { [key: string]: number } = { number: 1, vector2: 2, vector3: 3, vector4: 4, color: 4 };
export const CommonTypes: PortType[] = ["color", "gradient", "image", "number", "string", "vector2", "vector3", "material", "bool"];
export const ArrayTypes: PortType[] = BasePortTypeArray.map((key) => `array-${key}` as PortType);
