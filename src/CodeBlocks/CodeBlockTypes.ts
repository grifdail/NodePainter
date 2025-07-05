import { NodeLibrary } from "../Nodes/Nodes";
import { CodeBlockExpressionGenerator } from "../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockGenerator } from "../Types/CodeBlock/CodeBlockGenerator";
import { CodeBlockStatementGenerator } from "../Types/CodeBlock/CodeBlockStatementGenerator";
import { CompareNumberExpression } from "./Expressions/CompareNumberExpression";
import { generateExpressionFromNode } from "./Expressions/generateExpressionFromNode";
import { RandomExpression } from "./Expressions/RandomExpression";
import { ReadVariableExpression } from "./Expressions/ReadVariable";
import { VectorComponentExpressions } from "./Expressions/VectorComponentExpression";
import { VectorComposeExpression } from "./Expressions/VectorComposeExpression";
import { ArrayPushStatements } from "./Statements/ArrayPushStatement";
import { AssignStatement } from "./Statements/AssignStatement";
import { IfStatement } from "./Statements/IfStatement";
import { LogStatement } from "./Statements/LogStatement";
import { WhileStatement } from "./Statements/WhileStatement";

export const CodeBlockStatementTypes: { [key: string]: CodeBlockStatementGenerator } = {}; //Object.fromEntries();
export const CodeBlockExpressionTypes: { [key: string]: CodeBlockExpressionGenerator } = {}; // Object.fromEntries();
export const CodeBlockBlocksTypes: { [key: string]: CodeBlockStatementGenerator | CodeBlockExpressionGenerator } = {};

export function initCodeBlockType() {
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
    VectorComposeExpression,
    ...VectorComponentExpressions,
    RandomExpression,
    ...Object.values(NodeLibrary).flatMap((def) => {
      if (def.codeBlockType === "expression") {
        return generateExpressionFromNode(def);
      }
      return [];
    }),
  ];

  CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).forEach((element) => {
    CodeBlockStatementTypes[element.id] = element as CodeBlockStatementGenerator;
  });

  CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).forEach((node) => {
    CodeBlockExpressionTypes[node.id] = node as CodeBlockExpressionGenerator;
  });
}
