import { NodeData } from "../Hooks/useTree";

export function VectorDivision(a: number[], b: number[]): any {
  return VectorComponentOperation(1, (old, value) => old / value, a, b);
}

export function VectorSubstraction(a: number[], b: number[]): number[] {
  return zipVector(a, b).map((params) => params.slice(1).reduce((old, valye) => old - valye, params[0]));
}

export function VectorAddition(a: number[], b: number[]): number[] {
  return VectorComponentOperation(0, (old, value) => old + value, a, b);
}

export function VectorMultiplication(a: number[], b: number[]): number[] {
  return VectorComponentOperation(1, (old, value) => old * value, a, b);
}

export function VectorLerp(a: number[], b: number[], t: number): number[] {
  return zipVector(a, b).map(([a, b]) => lerp(a, b, t));
}

export function VectorMagnitude(vec: number[]): any {
  return Math.sqrt(VectorSquareMagnitude(vec));
}

export function VectorSquareMagnitude(vec: number[]): number {
  return vec.reduce((old, b) => old + b * b, 0);
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
