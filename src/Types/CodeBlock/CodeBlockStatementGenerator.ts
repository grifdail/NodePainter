import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { CodeBlockStatement } from "./CodeBlockStatement";

export type CodeBlockStatementGenerator = {
  id: string;
  create(): CodeBlockStatement;
  execute(statement: CodeBlockStatement, state: FunctionContext): void;
  toString(statement: CodeBlockStatement): string;
};
