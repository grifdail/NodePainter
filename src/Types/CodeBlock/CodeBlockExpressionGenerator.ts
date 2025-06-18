import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { PortType } from "../PortType";
import { CodeBlockStatement } from "./CodeBlockStatement";

export type CodeBlockExpressionGenerator = {
  id: string;
  create(type: PortType): CodeBlockStatement;
  canEvaluateTo(type: PortType): boolean;
  evaluate(statement: CodeBlockStatement, state: FunctionContext): any;
  toString(statement: CodeBlockStatement): string;
};
