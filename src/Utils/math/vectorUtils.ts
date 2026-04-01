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
    return vectorBiReduce(a, b, (sum, a, b) => sum + a * b, 0);
}

export function vectorCrossProduct(a: Vector3, b: Vector3): Vector3 {
    const x = a[1] * b[2] - a[2] * b[1];
    const y = a[2] * b[0] - a[0] * b[2];
    const z = a[0] * b[1] - a[1] * b[0];
    return [x, y, z];
}

/**
 * Project a vector along another
 * @param a 
 * @param b 
 * @returns 
 */
export function vectorProject<T extends Vector>(a: T, b: T): T {
    return vectorScale(b, vectorDotProduct(a, b) / vectorDotProduct(b, b));
}
/**
 * Project a vector along a vector perpendicular to the target
 * @param a 
 * @param b 
 * @returns 
 */
export function vectorReject<T extends Vector>(a: T, b: T): T {
    return vectorSubstraction(a, vectorProject(a, b));
}

/**
 * Reflector a vector along a normal vector
 */
export function vectorReflect<T extends Vector>(d: T, b: T): T {
    const n = vectorNormalize(b);
    return vectorSubstraction(d, vectorScale(n, 2 * vectorDotProduct(d, n)));
}


/**
 * Return a 2d vector that is perpendicular to the 
 * @param a 
 * @returns 
 */
export function vector2Perpendicular(a: Vector2) {
    return createVector2(-a[1], a[0])
}

/**
 * Return the magnitude of the vector
 * @param a 
 * @returns 
 */

export function vectorMagnitude<T extends Vector>(a: T): number {
    return Math.sqrt(vectorSquareMagnitude(a));
}

/**
 * Return the distance between two point
 * @param a 
 * @param b 
 * @returns 
 */
export function vectorDistance<T extends Vector>(a: T, b: T): number {
    return Math.sqrt(vectorSquareDistance(a, b));
}

/**
 * Multiply a vector by a scalar Value
 * @param a 
 * @param b 
 * @returns 
 */

export function vectorScale<T extends Vector>(a: T, b: number): T {
    return vectorMap(a, (value) => value * b);
}

/**
 * Restrict a vector magnitude so that it is never longer than 'magnitude'
 * @param a 
 * @param magnitude 
 * @returns 
 */
export function vectorLimitMagnitude<T extends Vector>(a: T, magnitude: number): T {
    const sqrtMag = vectorSquareMagnitude(a);
    return sqrtMag > magnitude * magnitude ? vectorScale(a, magnitude / Math.sqrt(sqrtMag)) : a;
}

/**
 * Return the point on a line segment that is closest to the target point
 * 
 * @param start The origin of the line segment
 * @param end The endpoint of the line segment
 * @param target 
 * @param bound Wheter we want to limit the search to the line segment or to the infinite line
 * @returns 
 */
export function vectorClosestPoint<T extends Vector>(start: T, end: T, target: T, bound: boolean): T {
    const v1 = vectorSubstraction(end, start) as T;
    const delta = vectorSubstraction(target, start) as T;
    const p = vectorDotProduct(vectorNormalize(v1), delta);
    if (bound && p < 0) {
        return start;
    } else if (bound && p > vectorMagnitude(v1)) {
        return end;
    } else {
        return vectorAddition(vectorScale(vectorNormalize(v1), p), start) as T
    }
}

/**
 * Return the square of the magnitude of a vector
 * @param vec 
 * @returns 
 */
export function vectorSquareMagnitude<T extends Vector>(vec: T): number {
    return vec.reduce((old, b) => old + b * b, 0);
}

/**
 * Return the square of the distance between two vector
 * @param a 
 * @param b 
 * @returns 
 */
export function vectorSquareDistance<T extends Vector>(a: T, b: T): number {
    return vectorSquareMagnitude(vectorSubstraction(a, b));
}


/**
 * Return true if every component of the vector is Zero;
 * @param normal 
 * @returns 
 */
export function vectorIsZero(normal: number[]) {
    return normal.every((comp) => Math.abs(comp) < Number.EPSILON);
}

/**
 * Return a vector with the same heading but with length 1
 * @param a 
 * @returns 
 */

export function vectorNormalize<T extends Vector>(a: T): T {
    const length = vectorMagnitude(a);
    if (length === 0) {
        return vectorMap(a, () => 0);
    }
    return vectorMap(a, (comp) => comp / length);
}


/**
 * Cut a vector to the size of a smaller vector
 * @param source 
 * @param length 
 */
export function vectorSlice(source: Vector, length: 4): Vector4;
export function vectorSlice(source: Vector, length: 3): Vector3;
export function vectorSlice(source: Vector3, length: 2): Vector2;
export function vectorSlice(source: Vector4 | Color, length: 3): Vector3;
export function vectorSlice(source: Vector4 | Color, length: 2): Vector2;
export function vectorSlice(source: Vector4 | Color, length: 1): [number];
export function vectorSlice(source: Vector, length: number): Vector | [number] {
    return source.slice(0, length) as Vector
}

/**
 * Apply a map function to every elements of the vector
 * @param a 
 * @param callback 
 * @returns 
 */

export function vectorMap<T extends Vector>(a: T, callback: (n: number, i: number) => number): T {
    return a.map(callback) as T
}


/**
 * Apply a map function to every component of a pair of vector
 * @param a 
 * @param callback 
 * @returns 
 */

export function vectorBimap<T extends Vector>(a: T, b: T, callback: (a: number, b: number, i: number) => number): T {
    return a.map((_, i) => callback(a[i], b[i], i)) as T
}

export function vectorBiReduce<TVector extends Vector, TAccumulator>(a: TVector, b: TVector, callback: (sum: TAccumulator, a: number, b: number, i: number) => TAccumulator, origin: TAccumulator): TAccumulator {
    return a.reduce((prev, _, i) => callback(prev, a[i], b[i], i), origin);
}
/**
 * Return a vector composed of the maximum of each of the two vector coordinate
 *
 * @param a 
 * @param b 
 */
export function vectorMax<T extends Vector>(a: T, b: T): T {
    return vectorBimap(a, b, (b, a) => Math.max(a, b))
}

/**
 * Return a vector composed of the minimum of each of the two vector coordinate
 *
 * @param a 
 * @param b 
 */
export function vectorMin<T extends Vector>(a: T, b: T): T {
    return vectorBimap(a, b, (b, a) => Math.min(a, b))
}

export function vectorComponentSquareRoot<T extends Vector>(a: T): T {
    return vectorMap(a, (b, a) => Math.max(a, b))
}
