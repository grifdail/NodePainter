import { CodeBlockExpressionGenerator, CodeBlockStatement } from "../../Types/CodeBlock";
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
          type: `variable-${type}`,
          value: null,
          defaultValue: createDefaultValue(type),
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return true;
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var variable = statement.parameters.variable;
    if (variable.value && state[variable.value as string] !== undefined) {
      return state[variable.value as string].value;
    } else {
      return variable.defaultValue;
    }
  },
};
