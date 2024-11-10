import { FunctionContext } from "../Utils/createExecutionContext";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  variables: any[];
};

abstract class CodeBlockStatement {
  abstract Execute(root: FunctionContext): void;
}

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    variables: [],
  };
};

export const executeStatementList = (statements: CodeBlockStatement[], root: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    element.Execute(root);
  }
};
