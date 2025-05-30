import { CodeBlock } from "./CodeBlock";

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    localVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};
