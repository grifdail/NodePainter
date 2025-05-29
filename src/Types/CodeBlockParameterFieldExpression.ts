import { CodeBlockStatement } from "./CodeBlockStatement";
import { PortType } from "./PortType";

export type CodeBlockParameterFieldExpression = {
  label?: string;
  type: "expression";
  targetType: PortType | "any";
  constantValue: any;
  expression: CodeBlockStatement | null;
};
