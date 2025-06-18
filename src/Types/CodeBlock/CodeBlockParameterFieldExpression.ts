import { PortType } from "../PortType";
import { CodeBlockStatement } from "./CodeBlockStatement";

export type CodeBlockParameterFieldExpression = {
  label?: string;
  type: "expression";
  targetType: PortType | "any";
  constantValue: any;
  expression: CodeBlockStatement | null;
};
