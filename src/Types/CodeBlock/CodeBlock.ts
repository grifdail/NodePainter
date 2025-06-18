import { PortDefinition } from "../PortDefinition";
import { CodeBlockStatement } from "./CodeBlockStatement";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  localVariables: PortDefinition[];
  inputVariables: PortDefinition[];
  outputVariables: PortDefinition[];
};
