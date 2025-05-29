export type BasePortType = "number" | "vector" | "vector2" | "vector3" | "vector4" | "quaternion" | "color" | "string" | "bool" | "image" | "gradient" | "material" | "mesh" | "struct" | "object3d" | "drawing2d";
export type ArrayPortType = `array-${BasePortType}`;
export type PortType = BasePortType | ArrayPortType | "unknown";
