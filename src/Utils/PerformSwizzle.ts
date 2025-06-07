import { Vector } from "../Types/vectorDataType";
import { SwizzleOp } from "./SwizzleOp";
import { ValidateSwizzleString } from "./ValidateSwizzleString";

export const PerformSwizzle = (value: Vector, opText: string, vectorLength: number) => {
  let ops = ValidateSwizzleString(opText, vectorLength);
  ops = ops.slice(0, vectorLength);
  return Array.from(ops).map((item) => SwizzleOp[item](value));
};
