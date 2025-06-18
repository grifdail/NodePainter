import { lerp } from "three/src/math/MathUtils";

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

export function vectorMagnitude(vec: number[]): any {
  return Math.sqrt(vectorSquareMagnitude(vec));
}
export function vectorDistance(a: number[], b: number[]): any {
  return Math.sqrt(vectorSquareDistance(a, b));
}
export function vectorScale(a: number[], b: number): number[] {
  return a.map((value) => value * b);
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
