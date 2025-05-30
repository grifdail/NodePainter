import { CodeBlockStatementTypes } from "../CodeBlocks/CodeBlockTypes";
import { FunctionContext } from "../Utils/createExecutionContext";
import { CodeBlockStatement } from "./CodeBlockStatement";

export const executeStatementList = (statements: CodeBlockStatement[], context: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    const type = CodeBlockStatementTypes[element.type];
    type.execute(element, context);
  }
};
