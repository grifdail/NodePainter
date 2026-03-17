import { lerp } from "three/src/math/MathUtils";
import { Color, createVector2, Vector, Vector2, Vector3, Vector4 } from "../../Types/vectorDataType";

export function vectorDivision<T extends Vector>(a: T, b: T): T {
    return vectorMap(a, (p, i) => a[i] / b[i]);
}

export function vectorSubstraction<T extends Vector>(a: T, b: T): T {
    return vectorMap(a, (p, i) => a[i] - b[i]);
}

export function vectorAddition<T extends Vector>(a: T, b: T): T {
    return vectorMap(a, (p, i) => a[i] + b[i]);
}

export function vectorMultiplication<T extends Vector>(a: T, b: T): T {
    return vectorMap(a, (p, i) => a[i] * b[i]);
}
export function vectorAbsolute<T extends Vector>(a: T): T {
    return vectorMap(a, (p, i) => Math.abs(p));
}
export function vectorLerp<T extends Vector>(a: T, b: T, t: number): T {
    return vectorMap(a, (_, i) => lerp(a[i], b[i], t));
}
export function vectorDotProduct<T extends Vector>(a: T, b: T): number {
    return zipVector(a, b).reduce((sum, comp) => sum + comp[0] * comp[1], 0);
}
export function vectorCrossProduct(a: Vector3, b: Vector3): Vector3 {
    const x = a[1] * b[2] - a[2] * b[1];
    const y = a[2] * b[0] - a[0] * b[2];
    const z = a[0] * b[1] - a[1] * b[0];
    return [x, y, z];
}
export function vectorProject<T extends Vector>(a: T, b: T): T {
    return vectorScale(b, vectorDotProduct(a, b) / vectorDotProduct(b, b));
}
export function vectorReject<T extends Vector>(a: T, b: T): T {
    return vectorSubstraction(a, vectorProject(a, b));
}
export function vectorReflect<T extends Vector>(d: T, b: T): T {
    var n = vectorNormalize(b);
    return vectorSubstraction(d, vectorScale(n, 2 * vectorDotProduct(d, n)));
}

export function vector2Perpendicular(a: Vector2) {
    return createVector2(-a[1], a[0])
}

export function vectorMagnitude<T extends Vector>(a: T): number {
    return Math.sqrt(vectorSquareMagnitude(a));
}
export function vectorDistance<T extends Vector>(a: T, b: T): number {
    return Math.sqrt(vectorSquareDistance(a, b));
}
export function vectorScale<T extends Vector>(a: T, b: number): T {
    return vectorMap(a, (value) => value * b);
}
export function vectorLimitMagnitude<T extends Vector>(a: T, magnitude: number): T {
    var sqrtMag = vectorSquareMagnitude(a);
    if (sqrtMag > magnitude * magnitude) {
        return vectorScale(a, magnitude / Math.sqrt(sqrtMag))
    } else {
        return a;
    }
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

export function vectorSquareMagnitude<T extends Vector>(vec: T): number {
    return vec.reduce((old, b) => old + b * b, 0);
}
export function vectorSquareDistance<T extends Vector>(a: T, b: T): number {
    return vectorSquareMagnitude(vectorSubstraction(a, b));
}



export const zip = <T>(filler: T, ...arr: T[][]) =>
    Array(Math.max(...arr.map((a) => a.length)))
        .fill(null)
        .map((_, i) => arr.map((array) => (i < array.length ? array[i] : filler)));

export function zipVector<T extends Vector>(...arr: T[]): T[] {
    return zip(0, ...arr) as T[];
}

export const vectorComponentOperation = <T extends Vector>(start: number, fn: (a: number, b: number) => number, ...vector: T[]) => zipVector(...vector).map((params) => params.reduce(fn, start));

export function vectorIsZero(normal: number[]) {
    return normal.every((comp) => Math.abs(comp) < Number.EPSILON);
}

export function vectorNormalize<T extends Vector>(a: T): T {
    const length = vectorMagnitude(a);
    const vec = a.map((comp) => comp / length);
    return vec as T;
}

export function vectorSlice(source: Vector, length: 4): Vector4;
export function vectorSlice(source: Vector, length: 3): Vector3;
export function vectorSlice(source: Vector4 | Color, length: 2): Vector3;
export function vectorSlice(source: Vector4 | Color, length: 1): [number];
export function vectorSlice(source: Vector, length: number): Vector | [number] {
    return source.slice(0, length) as Vector
}

export function vectorMap<T extends Vector>(a: T, callback: (n: number, i: number) => number): T {
    return a.map(callback) as T
}