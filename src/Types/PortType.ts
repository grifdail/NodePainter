export type PortType = "execute" | "number" | "vector2" | "color" | "string" | "bool" | "image" | "gradient" | "vector" | "vector3" | "vector4" | "material" | "unknown";
export const PortTypeArray: PortType[] = ["number", "vector2", "color", "string", "bool", "image", "gradient", "vector3", "vector4", "material"];
export const VectorTypesFull: PortType[] = ["number", "vector2", "vector3", "color"];
export const VectorTypeslimited: PortType[] = ["vector2", "vector3"];
export const VectorLength: { [key: string]: number } = { number: 1, vector2: 2, vector3: 3, vector4: 4, color: 4 };
export const AllTypes: PortType[] = ["color", "gradient", "image", "number", "string", "vector2", "vector3", "material"];
