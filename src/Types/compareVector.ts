import { vectorAbsolute, vectorSubstraction } from "../Utils/math/vectorUtils";
import { Vector } from "./vectorDataType";

export const compareVector = function (a: any, b: any): boolean {
  const av = a as Vector;
  const bv = b as Vector;
  return vectorAbsolute(vectorSubstraction(av, bv)).every((v) => {
    return v < Number.EPSILON;
  });
};
