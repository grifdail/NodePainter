import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { FunctionContext } from "../../Utils/createExecutionContext";

export const ReadVariableExpression: CodeBlockExpressionGenerator = {
  id: "ReadVariable",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: ReadVariableExpression.id,
      parameters: {
        variable: {
          type: `variable`,
          targetType: type,
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return true;
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    if (statement.parameters.variable.type !== "variable") {
      throw new Error("Parameter Variable is of the wrong type");
    }
    var variable = evaluateExpression(statement.parameters.variable, state) as string;

    if (variable && state[variable] !== undefined) {
      return state[variable].value;
    }
    return PortTypeDefinitions[statement.parameters.variable.targetType as PortType].createDefaultValue();
  },
  toString(statement) {
    return `$${toStringExpression(statement.parameters.variable)}`;
  },
};
