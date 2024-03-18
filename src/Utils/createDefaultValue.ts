import { PortType } from "../Types/PortType";
import { createDefaultMaterial } from "./createDefaultMaterial";
import { createVector2, createVector3, createVector4, createColor, createDefaultGradient } from "../Types/vectorDataType";

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
  execute: () => null,
  material: () => createDefaultMaterial(),
  unknown: () => null,
};

export function createDefaultValue(type: PortType) {
  return PortTypeDefaultValue[type]();
}
