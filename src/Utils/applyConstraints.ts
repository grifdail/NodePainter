import { Color, Vector } from "../Types/vectorDataType";
import { ValidateSwizzleString } from "./ValidateSwizzleString";

export type ConstrainDeclaration = {
  id: ConstrainTypes;
  params: any[];
};

const NumberConstraint = {
  Clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(min, value), max);
  },
  Clamp01(value: number) {
    return ConstrainDefinition.Clamp(value, 0, 1);
  },
  GreaterThan(value: number, min: number) {
    return Math.max(value, min);
  },
  LowerThan(value: number, max: number) {
    return Math.min(value, max);
  },
  Integer(value: number) {
    return Math.floor(value);
  },
  NonZero(value: number) {
    if (Math.abs(value) < Number.EPSILON) {
      return 1;
    } else {
      return value;
    }
  },
  MultipleOf(value: number, target: number) {
    return Math.round(value / target) * target;
  },
  Positive(value: number) {
    return Math.max(value, 0);
  },
  Negative(value: number) {
    return Math.min(value, 0);
  },
  Mod(value: number, divisor: number) {
    return value % divisor;
  },
  Mod1(value: number) {
    return value % 1;
  },
};

type NumberConstrainType = typeof NumberConstraint;
type NumberConstrainTypes = keyof NumberConstrainType;
type VectorConstrainType = { [key in NumberConstrainTypes as `Vec${key}`]: (v: Vector, ...params: Tail<Parameters<NumberConstrainType[key]>>) => Vector };

const VectorConstrains: VectorConstrainType = Object.fromEntries(
  Object.entries(NumberConstraint).map(([key, method]) => {
    return [
      `Vec${key}`,
      (value: Vector, ...params: any[]) => {
        return value.map((v) => (method as any)(v, ...params));
      },
    ];
  })
) as any;

const ConstrainDefinition = {
  ...NumberConstraint,
  ...VectorConstrains,
  NonTransparent: (color: Color) => {
    return [color[0], color[1], color[2], 1];
  },
  UpperCase: (text: string) => {
    return text.toUpperCase();
  },
  LowerCase: (text: string) => {
    return text.toLowerCase();
  },
  SwizzleString: ValidateSwizzleString,
  NoSpace: (text: string) => {
    return text.replaceAll(/\s/gm, "");
  },
  NoSpecialChar: (text: string) => {
    return text.replaceAll(/\W/gm, "");
  },
};

type ConstrainDefinitionType = typeof ConstrainDefinition;
type ConstrainTypes = keyof ConstrainDefinitionType;
type ConstrainGenerator = { [key in ConstrainTypes]: (...params: Tail<Parameters<ConstrainDefinitionType[key]>>) => ConstrainDeclaration };

type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never;

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

export function applyConstraint<T>(value: T, constraints: ConstrainDeclaration[] | undefined): T {
  if (!constraints) {
    return value;
  }
  constraints.forEach((constraint) => {
    value = (ConstrainDefinition[constraint.id] as (value: T, ...params: any[]) => T)(value, ...constraint.params) as T;
  });
  return value;
}

export function applyConstraintCompose<TParams, TResult>(setValue: (x: TParams) => TResult, constraints: ConstrainDeclaration[]) {
  return (x: TParams) => {
    return setValue(applyConstraint(x, constraints));
  };
}
