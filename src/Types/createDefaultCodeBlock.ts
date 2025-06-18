import { CodeBlock } from "./CodeBlock/CodeBlock";

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    localVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};
