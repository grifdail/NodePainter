import { lerp } from "three/src/math/MathUtils";
import { createVector2, Vector, Vector2 } from "../../Types/vectorDataType";

export function vectorDivision(a: number[], b: number[]): any {
  return a.map((p, i) => a[i] / b[i]);
}

export function vectorSubstraction(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] - b[i]);
}

export function vectorAddition(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] + b[i]);
}

export function vectorMultiplication(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] * b[i]);
}
export function vectorAbsolute(a: number[]): number[] {
  return a.map((p, i) => Math.abs(p));
}
export function vectorLerp(a: number[], b: number[], t: number): number[] {
  return zipVector(a, b).map(([a, b]) => lerp(a, b, t));
}
export function vectorDotProduct(a: number[], b: number[]): number {
  return zipVector(a, b).reduce((sum, comp) => sum + comp[0] * comp[1], 0);
}
export function vectorCrossProduct(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  const x = a[1] * b[2] - a[2] * b[1];
  const y = a[2] * b[0] - a[0] * b[2];
  const z = a[0] * b[1] - a[1] * b[0];
  return [x, y, z];
}
export function vectorProject(a: number[], b: number[]): number[] {
  return vectorScale(b, vectorDotProduct(a, b) / vectorDotProduct(b, b));
}
export function vectorReject(a: number[], b: number[]): number[] {
  return vectorSubstraction(a, vectorProject(a, b));
}
export function vectorReflect(d: number[], b: number[]): number[] {
  var n = vectorNormalize(b);
  return vectorSubstraction(d, vectorScale(n, 2 * vectorDotProduct(d, n)));
}

export function vector2Perpendicular(a: Vector2) {
  return createVector2(-a[1], a[0])
}

export function vectorMagnitude(vec: number[]): any {
  return Math.sqrt(vectorSquareMagnitude(vec));
}
export function vectorDistance(a: number[], b: number[]): any {
  return Math.sqrt(vectorSquareDistance(a, b));
}
export function vectorScale(a: number[], b: number): number[] {
  return a.map((value) => value * b);
}

export function vectorClosestPoint<T extends Vector>(start: T, end: T, target: T, bound: boolean): T {
  let v1 = vectorSubstraction(end, start) as T;
  let delta = vectorSubstraction(target, start) as T;
  let p = vectorDotProduct(vectorNormalize(v1), delta);
  if (bound && p < 0) {
    return start;
  } else if (bound && p > vectorMagnitude(v1)) {
    return end;
  } else {
    return vectorAddition(vectorScale(vectorNormalize(v1), p), start) as T
  }
}

export function vectorSquareMagnitude(vec: number[]): number {
  return vec.reduce((old, b) => old + b * b, 0);
}
export function vectorSquareDistance(a: number[], b: number[]): number {
  return vectorSquareMagnitude(vectorSubstraction(a, b));
}



export const zip = <T>(filler: T, ...arr: T[][]) =>
  Array(Math.max(...arr.map((a) => a.length)))
    .fill(null)
    .map((_, i) => arr.map((array) => (i < array.length ? array[i] : filler)));

export const zipVector = (...arr: number[][]) => zip(0, ...arr);

export const vectorComponentOperation = (start: number, fn: (a: number, b: number) => number, ...vector: number[][]) => zipVector(...vector).map((params) => params.reduce(fn, start));

export function vectorIsZero(normal: number[]) {
  return normal.every((comp) => Math.abs(comp) < Number.EPSILON);
}

export function vectorNormalize(a: number[]): number[] {
  const length = vectorMagnitude(a);
  const vec = a.map((comp) => comp / length);
  return vec;
}

export type VectorOperationFunc = (a: number[], b: number[]) => number[];
export const VectorOperations: { [key: string]: VectorOperationFunc } = {
  "+": vectorAddition,
  "-": vectorSubstraction,
  "*": vectorMultiplication,
  "/": vectorDivision,
};

export const VectorOperationTypes = Object.keys(VectorOperations);
