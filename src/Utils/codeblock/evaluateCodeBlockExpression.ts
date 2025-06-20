import { CodeBlockExpressionTypes } from "../../CodeBlocks/CodeBlockTypes";
import { CodeBlockParameterField } from "../../Types/CodeBlock/CodeBlockParameterField";
import { FunctionContext } from "../graph/execution/createExecutionContext";

export const evaluateCodeBlockExpression = (expression: CodeBlockParameterField, context: FunctionContext): any => {
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
