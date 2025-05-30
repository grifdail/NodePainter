import { CodeBlockExpressionGenerator } from "./CodeBlockExpressionGenerator";
import { CodeBlockStatementGenerator } from "./CodeBlockStatementGenerator";

export type CodeBlockGenerator = CodeBlockExpressionGenerator | CodeBlockStatementGenerator;
