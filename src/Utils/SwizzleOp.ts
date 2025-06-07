import { Vector } from "../Types/vectorDataType";

export const SwizzleOp: Record<string, (vector: Vector) => number> = {
  x: (a: Vector) => a[0] || 0,
  y: (a: Vector) => a[1] || 0,
  z: (a: Vector) => a[2] || 0,
  w: (a: Vector) => a[3] || 0,
  r: (a: Vector) => a[0] || 0,
  g: (a: Vector) => a[1] || 0,
  b: (a: Vector) => a[2] || 0,
  a: (a: Vector) => a[3] || 0,
  "0": (_: Vector) => 0,
  "1": (_: Vector) => 1,
};
