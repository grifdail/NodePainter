import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { MathOperation, MathOperationOps } from "../../Utils/logicUtils";

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
          selectedOption: MathOperationOps[0],
          options: MathOperationOps,
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
    var func = MathOperation[comparator];
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
