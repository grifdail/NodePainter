import { PortType } from "../Types/PortType";
import { createColor, createDefaultGradient, createVector2, createVector3, createVector4 } from "../Types/vectorDataType";
import { createDefaultMaterial } from "./createDefaultMaterial";

export const PortTypeDefaultValue: {
  [key in PortType]: () => any;
} = {
  number: () => 0,
  vector: createVector2,
  vector2: createVector2,
  vector3: createVector3,
  vector4: createVector4,
  color: createColor,
  string: () => "",
  bool: () => false,
  gradient: () => createDefaultGradient(),
  image: () => null,
  mesh: () => null,
  execute: () => null,
  material: () => createDefaultMaterial(),
  unknown: () => null,
  struct: () => null,
  "array-string": () => [],
  "array-number": () => [],
  "array-vector2": () => [],
  "array-color": () => [],
  "array-bool": () => [],
  "array-image": () => [],
  "array-gradient": () => [],
  "array-vector": () => [],
  "array-vector3": () => [],
  "array-vector4": () => [],
  "array-material": () => [],
  "array-mesh": () => [],
  "array-struct": () => [],
};

export function createDefaultValue(type: PortType) {
  return PortTypeDefaultValue[type]();
}
export function createDefaultVector(type: PortType) {
  return type === "number" ? [0] : PortTypeDefaultValue[type]();
}
