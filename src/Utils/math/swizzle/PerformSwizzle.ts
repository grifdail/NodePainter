import { Vector } from "../../../Types/vectorDataType";
import { SwizzleOperations } from "./SwizzleOperations";
import { validateSwizzleString } from "./ValidateSwizzleString";

export const performSwizzle = (value: Vector, opText: string, vectorLength: number) => {
  let ops = validateSwizzleString(opText, opText, vectorLength);
  ops = ops.slice(0, vectorLength);
  return Array.from(ops).map((item) => SwizzleOperations[item](value));
};
