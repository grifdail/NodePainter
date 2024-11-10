import { FunctionContext } from "../Utils/createExecutionContext";
import { PortDefinition } from "./PortDefinition";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  ownVariables: PortDefinition[];
  inputVariables: PortDefinition[];
  outputVariables: PortDefinition[];
};

abstract class CodeBlockStatement {
  abstract Execute(root: FunctionContext): void;
}

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    ownVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};

export const executeStatementList = (statements: CodeBlockStatement[], root: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    element.Execute(root);
  }
};
