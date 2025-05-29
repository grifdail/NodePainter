import { FunctionContext } from "../Utils/createExecutionContext";
import { CodeBlockParameterField } from "./CodeBlockParameterField";
import { executeStatementList } from "./executeStatementList";

export const executeStatementParameter = (statements: CodeBlockParameterField, context: FunctionContext): void => {
  if (statements.type === "statements") {
    executeStatementList(statements.statements, context);
  } else {
    throw new Error("Trying to execute a non statement parameter");
  }
};
