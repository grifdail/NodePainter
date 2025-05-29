import { CodeBlockStatement } from "./CodeBlockStatement";
import { PortDefinition } from "./PortDefinition";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  localVariables: PortDefinition[];
  inputVariables: PortDefinition[];
  outputVariables: PortDefinition[];
};
