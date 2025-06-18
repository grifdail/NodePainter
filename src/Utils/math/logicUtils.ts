type ComparatorFunc = (a: number, b: number) => boolean;
export const Comparator: { [key: string]: ComparatorFunc } = {
  equals: (a, b) => a === b,
  different: (a, b) => a !== b,
  "lower that": (a, b) => a < b,
  "lower than or equals": (a, b) => a <= b,
  "greater than": (a, b) => a > b,
  "greater than or equals": (a, b) => a >= b,
  "approximately equals": (a, b) => Math.abs(a - b) < 0.00001,
  "approximately different": (a, b) => Math.abs(a - b) > 0.00001,
};

export const ComparatorOps = Object.keys(Comparator);

type OperationFunc = (a: number, b: number) => number;
export const NumberOperations: { [key: string]: OperationFunc } = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "%": (a, b) => a % b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b),
  pow: (a, b) => Math.pow(a, b),
};

export const MathOperationTypes = Object.keys(NumberOperations);
