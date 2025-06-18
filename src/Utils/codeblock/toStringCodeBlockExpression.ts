import { CodeBlockExpressionTypes } from "../../CodeBlocks/CodeBlockTypes";
import { CodeBlockParameterField } from "../../Types/CodeBlock/CodeBlockParameterField";

export const toStringCodeBlockExpression = (expression: CodeBlockParameterField): any => {
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
