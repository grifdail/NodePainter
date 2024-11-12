import { CodeBlockExpressionGenerator, CodeBlockGenerator, CodeBlockStatementGenerator } from "../Types/CodeBlock";
import { CompareNumberExpression } from "./Expressions/CompareNumberExpression";
import { MathOperationExpression } from "./Expressions/MathOperationExpression";
import { ReadVariableExpression } from "./Expressions/ReadVariable";
import { AssignStatement } from "./Statements/AssignStatement";
import { IfStatement } from "./Statements/IfStatement";
import { LogStatement } from "./Statements/LogStatement";

const CodeBlocks: CodeBlockGenerator[] = [
  //Statement
  IfStatement,
  AssignStatement,
  LogStatement,

  //Expression
  ReadVariableExpression,
  CompareNumberExpression,
  MathOperationExpression,
];

export const CodeBlockStatementTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).map((node) => [node.id, node as CodeBlockStatementGenerator]));
export const CodeBlockExpressionTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).map((node) => [node.id, node as CodeBlockExpressionGenerator]));
export const CodeBlockBlocksTypes = { ...CodeBlockExpressionTypes, ...CodeBlockStatementTypes };
