import { CodeBlockStatementTypes } from "../../CodeBlocks/CodeBlockTypes";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { FunctionContext } from "../graph/execution/createExecutionContext";

export const executeStatementList = (statements: CodeBlockStatement[], context: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    const type = CodeBlockStatementTypes[element.type];
    type.execute(element, context);
  }
};
