import { CodeBlockExpressionTypes, CodeBlockStatementTypes } from "../CodeBlocks/CodeBlockTypes";
import { FunctionContext } from "../Utils/createExecutionContext";
import { PortDefinition } from "./PortDefinition";
import { PortType } from "./PortType";

export type CodeBlock = {
  statements: CodeBlockStatement[];
  localVariables: PortDefinition[];
  inputVariables: PortDefinition[];
  outputVariables: PortDefinition[];
};

export type CodeBlockParameterFieldExpression = {
  label?: string;
  type: "expression";
  targetType: PortType | "any";
  constantValue: any;
  expression: CodeBlockStatement | null;
};

export type CodeBlockParameterFieldOption = {
  label?: string;
  type: "option";
  selectedOption: string;
  options: string[];
};
export type CodeBlockParameterFieldVariable = {
  label?: string;
  type: "variable";
  targetType: PortType | "any";
  variableName?: string;
};
export type CodeBlockParameterFieldStatements = {
  label?: string;
  type: "statements";
  statements: CodeBlockStatement[];
};
export type CodeBlockParameterFieldValue = {
  label?: string;
  type: "value";
  targetType: PortType;
  value: any;
};

export type CodeBlockParameterField = CodeBlockParameterFieldStatements | CodeBlockParameterFieldExpression | CodeBlockParameterFieldOption | CodeBlockParameterFieldVariable | CodeBlockParameterFieldValue;

export type CodeBlockStatement = {
  type: string;
  parameters: { [key: string]: CodeBlockParameterField };
};

export type CodeBlockStatementGenerator = {
  id: string;
  create(): CodeBlockStatement;
  execute(statement: CodeBlockStatement, state: FunctionContext): void;
  toString(statement: CodeBlockStatement): string;
};

export type CodeBlockExpressionGenerator = {
  id: string;
  create(type: PortType): CodeBlockStatement;
  canEvaluateTo(type: PortType): boolean;
  evaluate(statement: CodeBlockStatement, state: FunctionContext): any;
  toString(statement: CodeBlockStatement): string;
};

export const createDefaultCodeBlock = (): CodeBlock => {
  return {
    statements: [],
    localVariables: [],
    inputVariables: [],
    outputVariables: [],
  };
};

export const executeStatementList = (statements: CodeBlockStatement[], context: FunctionContext): void => {
  for (let i = 0; i < statements.length; i++) {
    const element = statements[i];
    const type = CodeBlockStatementTypes[element.type];
    type.execute(element, context);
  }
};

export const executeStatementParameter = (statements: CodeBlockParameterField, context: FunctionContext): void => {
  if (statements.type === "statements") {
    executeStatementList(statements.statements, context);
  } else {
    throw new Error("Trying to execute a non statement parameter");
  }
};

export const evaluateExpression = (expression: CodeBlockParameterField, context: FunctionContext): any => {
  switch (expression.type) {
    case "statements":
      console.warn("Trying to evaluate a list of statements");
      return null;
    case "expression":
      if (expression.expression === null) {
        return expression.constantValue;
      } else {
        var exp = expression.expression;
        return CodeBlockExpressionTypes[exp.type].evaluate(exp, context);
      }
    case "option":
      return expression.selectedOption;
    case "variable":
      return expression.variableName;
    case "value":
      return expression.value;
    default:
      return null;
  }
};

export const toStringExpression = (expression: CodeBlockParameterField): any => {
  switch (expression.type) {
    case "statements":
      return expression.statements.map((item) => {
        return CodeBlockExpressionTypes[item.type].toString(item);
      });
    case "expression":
      if (expression.expression === null) {
        return expression.constantValue.toString();
      } else {
        var exp = expression.expression;
        return CodeBlockExpressionTypes[exp.type].toString(exp);
      }
    case "option":
      return expression.selectedOption;
    case "variable":
      return expression.variableName;
    case "value":
      return expression.value.toString();
    default:
      return null;
  }
};
