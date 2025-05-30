import { VectorAbsolute, VectorSubstraction } from "../Utils/vectorUtils";
import { Vector } from "./vectorDataType";

export const compareVector = function (a: any, b: any): boolean {
  const av = a as Vector;
  const bv = b as Vector;
  return VectorAbsolute(VectorSubstraction(av, bv)).every((v) => {
    return v < Number.EPSILON;
  });
};
