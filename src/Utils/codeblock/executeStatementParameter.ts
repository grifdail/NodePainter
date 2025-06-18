import { CodeBlockParameterField } from "../../Types/CodeBlock/CodeBlockParameterField";
import { FunctionContext } from "../graph/execution/createExecutionContext";
import { executeStatementList } from "./executeStatementList";

export const executeStatementParameter = (statements: CodeBlockParameterField, context: FunctionContext): void => {
  if (statements.type === "statements") {
    executeStatementList(statements.statements, context);
  } else {
    throw new Error("Trying to execute a non statement parameter");
  }
};
