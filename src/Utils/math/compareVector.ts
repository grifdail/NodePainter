import { Vector } from "../../Types/vectorDataType";
import { vectorAbsolute, vectorSubstraction } from "./vectorUtils";

export const compareVector = function (a: any, b: any): boolean {
  const av = a as Vector;
  const bv = b as Vector;
  return vectorAbsolute(vectorSubstraction(av, bv)).every((v) => {
    return v < Number.EPSILON;
  });
};
