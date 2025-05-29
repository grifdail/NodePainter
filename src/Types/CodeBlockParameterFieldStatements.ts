import { CodeBlockStatement } from "./CodeBlockStatement";

export type CodeBlockParameterFieldStatements = {
  label?: string;
  type: "statements";
  statements: CodeBlockStatement[];
};
