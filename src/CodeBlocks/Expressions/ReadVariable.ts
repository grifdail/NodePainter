import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";
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
    return createDefaultValue(statement.parameters.variable.targetType as PortType);
  },
};
