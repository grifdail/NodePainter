import { CodeBlockExpressionType, CodeBlockStatementType } from "../CodeBlocks/CodeBlockTypes";
import { FunctionContext } from "../Utils/createExecutionContext";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";

export type CodeBlockPromptType = PortType | `variable-${PortType}` | "value" | "variable" | "option" | "statements";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  ownVariables: PortDefinition[];
  inputVariables: PortDefinition[];
  outputVariables: PortDefinition[];
};

export type CodeBlockExpressionField = {
  label?: string;
  type: CodeBlockPromptType;
  value: CodeBlockStatement | CodeBlockStatement[] | string | null;
  defaultValue: any;
  options?: string[];
};

export type CodeBlockStatement = {
  type: string;
  parameters: { [key: string]: CodeBlockExpressionField };
};

export type CodeBlockStatementGenerator = {
  id: string;
  create(): CodeBlockStatement;
  execute(statement: CodeBlockStatement, state: FunctionContext): void;
};

export type CodeBlockExpressionGenerator = {
  id: string;
  create(type: PortType): CodeBlockStatement;
  canEvaluateTo(type: PortType): boolean;
  evaluate(statement: CodeBlockStatement, state: FunctionContext): any;
};

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    ownVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};

export const executeStatementList = (statements: CodeBlockStatement[], context: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    const type = CodeBlockStatementType[element.type];
    type.execute(element, context);
  }
};

export const evaluateExpression = (expression: CodeBlockExpressionField, context: FunctionContext): any => {
  var value = expression.value;
  if (!value) {
    return expression.defaultValue;
  }
  if (Array.isArray(value)) {
    console.warn("Trying to evaluate a list of statements");
    return expression.defaultValue;
  }
  if (typeof value === "string") {
    console.warn("Trying to evaluate a name");
    return expression.defaultValue;
  }
  if (value.type && CodeBlockExpressionType[value.type]) {
    return CodeBlockExpressionType[value.type].evaluate(value, context);
  } else {
    return expression.defaultValue;
  }
};
