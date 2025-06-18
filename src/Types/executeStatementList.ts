import { CodeBlockStatementTypes } from "../CodeBlocks/CodeBlockTypes";
import { FunctionContext } from "../Utils/graph/execution/createExecutionContext";
import { CodeBlockStatement } from "./CodeBlock/CodeBlockStatement";

export const executeStatementList = (statements: CodeBlockStatement[], context: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    const type = CodeBlockStatementTypes[element.type];
    type.execute(element, context);
  }
};
