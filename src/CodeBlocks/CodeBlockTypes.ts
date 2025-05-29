import { CodeBlockExpressionGenerator } from "../Types/CodeBlockExpressionGenerator";
import { CodeBlockGenerator } from "../Types/CodeBlockGenerator";
import { CodeBlockStatementGenerator } from "../Types/CodeBlockStatementGenerator";
import { CompareNumberExpression } from "./Expressions/CompareNumberExpression";
import { MathOperationExpression } from "./Expressions/MathOperationExpression";
import { RandomExpression } from "./Expressions/RandomExpression";
import { ReadVariableExpression } from "./Expressions/ReadVariable";
import { VectorComponentExpressions } from "./Expressions/VectorComponentExpression";
import { VectorComposeExpression } from "./Expressions/VectorComposeExpression";
import { VectorDistanceExpression } from "./Expressions/VectorDistanceExpression";
import { VectorDotProductExpression } from "./Expressions/VectorDotProductExpression";
import { VectorOperationExpression } from "./Expressions/VectorOperationExpression";
import { ArrayPushStatements } from "./Statements/ArrayPushStatement";
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
  ...ArrayPushStatements,

  //Expression
  ReadVariableExpression,
  CompareNumberExpression,
  MathOperationExpression,
  VectorOperationExpression,
  VectorDistanceExpression,
  VectorDotProductExpression,
  VectorComposeExpression,
  ...VectorComponentExpressions,
  RandomExpression,
];

export const CodeBlockStatementTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).map((node) => [node.id, node as CodeBlockStatementGenerator]));
export const CodeBlockExpressionTypes = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).map((node) => [node.id, node as CodeBlockExpressionGenerator]));
export const CodeBlockBlocksTypes = { ...CodeBlockExpressionTypes, ...CodeBlockStatementTypes };
