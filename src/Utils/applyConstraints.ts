export type ConstrainDeclaration = {
  id: ConstrainTypes;
  params: any[];
};

const ConstrainDefinition = {
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

export function applyConstraint<T>(value: T, constraints: ConstrainDeclaration[]): T {
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
