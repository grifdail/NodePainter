import { CodeBlockExpressionGenerator, CodeBlockStatementGenerator } from "../Types/CodeBlock";
import { AssignStatement } from "./Statements/AssignStatement";
import { IfStatement } from "./Statements/IfStatement";
import { LogStatement } from "./Statements/LogStatement";

const CodeBlocks: (CodeBlockStatementGenerator | CodeBlockExpressionGenerator)[] = [LogStatement, IfStatement, AssignStatement];

export const CodeBlockStatementType = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).map((node) => [node.id, node as CodeBlockStatementGenerator]));
export const CodeBlockExpressionType = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).map((node) => [node.id, node as CodeBlockExpressionGenerator]));
