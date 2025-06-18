import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    localVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};
