import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { MathOperationTypes, NumberOperations } from "../../Utils/logicUtils";

export const MathOperationExpression: CodeBlockExpressionGenerator = {
  id: "MathOperation",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: MathOperationExpression.id,
      parameters: {
        A: {
          type: "expression",
          targetType: `number`,
          constantValue: 0,
          expression: null,
        },
        operator: {
          type: `option`,
          selectedOption: MathOperationTypes[0],
          options: MathOperationTypes,
        },
        B: {
          type: "expression",
          targetType: `number`,
          constantValue: 0,
          expression: null,
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "number";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateExpression(statement.parameters.A, state) as number;
    var b = evaluateExpression(statement.parameters.B, state) as number;

    var comparator = evaluateExpression(statement.parameters.operator, state) as string;
    var func = NumberOperations[comparator];
    if (func !== undefined) {
      return func(a, b);
    } else {
      return a;
    }
  },
  toString(statement) {
    return `( ${toStringExpression(statement.parameters.A)} ${toStringExpression(statement.parameters.operator)} ${toStringExpression(statement.parameters.B)} )`;
  },
};
