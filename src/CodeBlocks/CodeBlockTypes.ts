import { CodeBlockExpressionGenerator, CodeBlockGenerator, CodeBlockStatementGenerator } from "../Types/CodeBlock";
import { CompareNumberExpression } from "./Expressions/CompareNumberExpression";
import { MathOperationExpression } from "./Expressions/MathOperationExpression";
import { ReadVariableExpression } from "./Expressions/ReadVariable";
import { VectorDistanceExpression } from "./Expressions/VectorDistanceExpression";
import { VectorDotProductExpression } from "./Expressions/VectorDotProductExpression";
import { VectorOperationExpression } from "./Expressions/VectorOperationExpression";
import { AssignStatement } from "./Statements/AssignStatement";
import { IfStatement } from "./Statements/IfStatement";
import { LogStatement } from "./Statements/LogStatement";
import { WhileStatement } from "./Statements/WhileStatement";

const CodeBlocks: CodeBlockGenerator[] = [
  //Statement
  IfStatement,
  AssignStatement,
  LogStatement,
  WhileStatement,

  //Expression
  ReadVariableExpression,
  CompareNumberExpression,
  MathOperationExpression,
  VectorOperationExpression,
  VectorDistanceExpression,
  VectorDotProductExpression,
];

export const CodeBlockStatementTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).map((node) => [node.id, node as CodeBlockStatementGenerator]));
export const CodeBlockExpressionTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).map((node) => [node.id, node as CodeBlockExpressionGenerator]));
export const CodeBlockBlocksTypes = { ...CodeBlockExpressionTypes, ...CodeBlockStatementTypes };
