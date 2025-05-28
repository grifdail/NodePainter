import { NodeData } from "../Types/NodeData";

export function VectorDivision(a: number[], b: number[]): any {
  return a.map((p, i) => a[i] / b[i]);
}

export function VectorSubstraction(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] - b[i]);
}

export function VectorAddition(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] + b[i]);
}

export function VectorMultiplication(a: number[], b: number[]): number[] {
  return a.map((p, i) => a[i] * b[i]);
}
export function VectorAbsolute(a: number[]): number[] {
  return a.map((p, i) => Math.abs(p));
}
export function VectorLerp(a: number[], b: number[], t: number): number[] {
  return zipVector(a, b).map(([a, b]) => lerp(a, b, t));
}

export function VectorMagnitude(vec: number[]): any {
  return Math.sqrt(VectorSquareMagnitude(vec));
}
export function VectorDistance(a: number[], b: number[]): any {
  return Math.sqrt(VectorSquareDistance(a, b));
}
export function VectorScale(a: number[], b: number): number[] {
  return a.map((value) => value * b);
}

export function VectorSquareMagnitude(vec: number[]): number {
  return vec.reduce((old, b) => old + b * b, 0);
}
export function VectorSquareDistance(a: number[], b: number[]): number {
  return VectorSquareMagnitude(VectorSubstraction(a, b));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export const zip = <T>(filler: T, ...arr: T[][]) =>
  Array(Math.max(...arr.map((a) => a.length)))
    .fill(null)
    .map((_, i) => arr.map((array) => (i < array.length ? array[i] : filler)));

export const zipVector = (...arr: number[][]) => zip(0, ...arr);

export const VectorComponentOperation = (start: number, fn: (a: number, b: number) => number, ...vector: number[][]) => zipVector(...vector).map((params) => params.reduce(fn, start));
export function EnforceGoodType(nodeData: NodeData, arg1: number[]): any {
  return nodeData.selectedType === "number" ? arg1[0] : arg1;
}

export function VectorIsZero(normal: number[]) {
  return normal.every((comp) => Math.abs(comp) < Number.EPSILON);
}

export function VectorNormalize(a: number[]): number[] {
  const length = VectorMagnitude(a);
  const vec = a.map((comp) => comp / length);
  return vec;
}

export type VectorOperationFunc = (a: number[], b: number[]) => number[];
export const VectorOperations: { [key: string]: VectorOperationFunc } = {
  "+": VectorAddition,
  "-": VectorSubstraction,
  "*": VectorMultiplication,
  "/": VectorDivision,
};

export const VectorOperationTypes = Object.keys(VectorOperations);
