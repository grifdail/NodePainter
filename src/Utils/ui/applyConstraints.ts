import { Color, Vector } from "../../Types/vectorDataType";
import { validateSwizzleString } from "../math/swizzle/ValidateSwizzleString";

export type ConstrainDeclaration = {
    id: ConstrainTypes;
    params: any[];
};

const NumberConstraint = {
    Clamp(value: number, _previousValue: number, min: number, max: number) {
        return Math.min(Math.max(min, value), max);
    },
    Clamp01(value: number, previousValue: number) {
        return ConstrainDefinition.Clamp(value, previousValue, 0, 1);
    },
    GreaterThan(value: number, _previousValue: number, min: number) {
        return Math.max(value, min);
    },
    LowerThan(value: number, _previousValue: number, max: number) {
        return Math.min(value, max);
    },
    Integer(value: number, _previousValue: number) {
        return Math.floor(value);
    },
    NonZero(value: number, _previousValue: number) {
        if (Math.abs(value) < Number.EPSILON) {
            return 1;
        } else {
            return value;
        }
    },
    MultipleOf(value: number, _previousValue: number, target: number) {
        return Math.round(value / target) * target;
    },
    Positive(value: number, _previousValue: number) {
        return Math.max(value, 0);
    },
    Negative(value: number, _previousValue: number) {
        return Math.min(value, 0);
    },
    Mod(value: number, _previousValue: number, divisor: number) {
        return value % divisor;
    },
    Mod1(value: number, _previousValue: number) {
        return value % 1;
    },
};

type NumberConstrainType = typeof NumberConstraint;
type NumberConstrainTypes = keyof NumberConstrainType;
type VectorConstrainType = { [key in NumberConstrainTypes as `Vec${key}`]: (v: Vector, previousValue: Vector, ...params: Tail<Parameters<NumberConstrainType[key]>>) => Vector };

const VectorConstrains: VectorConstrainType = Object.fromEntries(
    Object.entries(NumberConstraint).map(([key, method]) => {
        return [
            `Vec${key}`,
            (value: Vector, previousValue: Vector, ...params: any[]) => {
                return value.map((v) => (method as any)(v, previousValue, ...params));
            },
        ];
    })
) as any;

const ConstrainDefinition = {
    ...NumberConstraint,
    ...VectorConstrains,
    NonTransparent: (color: Color, _previousValue: string) => {
        return [color[0], color[1], color[2], 1];
    },
    UpperCase: (text: string, _previousValue: string) => {
        return text.toUpperCase();
    },
    LowerCase: (text: string, _previousValue: string) => {
        return text.toLowerCase();
    },
    SwizzleString: validateSwizzleString,
    NoSpace: (text: string, _previousValue: string) => {
        return text.replaceAll(/\s/gm, "");
    },
    NoSpecialChar: (text: string, _previousValue: string) => {
        return text.replaceAll(/\W/gm, "");
    },
    NonDigitStart: (text: string, _previousValue: string) => {
        return text.replaceAll(/^\d+/gm, "");
    },
};

type ConstrainDefinitionType = typeof ConstrainDefinition;
type ConstrainTypes = keyof ConstrainDefinitionType;
type ConstrainGenerator = { [key in ConstrainTypes]: (...params: Tail<Parameters<ConstrainDefinitionType[key]>>) => ConstrainDeclaration };

type Tail<T extends any[]> = T extends [infer _A, infer _B, ...infer R] ? R : never;

export const Constraints: ConstrainGenerator = Object.fromEntries(
    Object.keys(ConstrainDefinition).map((key) => {
        return [
            key as ConstrainTypes,
            (...params: any[]): ConstrainDeclaration => {
                return { id: key as ConstrainTypes, params };
            },
        ];
    })
) as ConstrainGenerator;

export function applyConstraint<T>(value: T, previousValue: T, constraints: ConstrainDeclaration[] | undefined): T {
    if (!constraints) {
        return value;
    }
    constraints.forEach((constraint) => {
        var oldValue = value;
        value = (ConstrainDefinition[constraint.id] as (value: T, previousValue: T, ...params: any[]) => T)(value, previousValue, ...constraint.params) as T;
        previousValue = oldValue;
    });
    return value;
}
