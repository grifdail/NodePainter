import { FunctionContext } from "../Utils/graph/execution/createExecutionContext";
import { CodeBlockStatement } from "./CodeBlockStatement";
import { PortType } from "./PortType";

export type CodeBlockExpressionGenerator = {
  id: string;
  create(type: PortType): CodeBlockStatement;
  canEvaluateTo(type: PortType): boolean;
  evaluate(statement: CodeBlockStatement, state: FunctionContext): any;
  toString(statement: CodeBlockStatement): string;
};
