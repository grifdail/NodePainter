import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { PortType } from "../../Types/PortType";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { MathOperationTypes, NumberOperations } from "../../Utils/math/logicUtils";

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
    var a = evaluateCodeBlockExpression(statement.parameters.A, state) as number;
    var b = evaluateCodeBlockExpression(statement.parameters.B, state) as number;

    var comparator = evaluateCodeBlockExpression(statement.parameters.operator, state) as string;
    var func = NumberOperations[comparator];
    if (func !== undefined) {
      return func(a, b);
    } else {
      return a;
    }
  },
  toString(statement) {
    return `( ${toStringCodeBlockExpression(statement.parameters.A)} ${toStringCodeBlockExpression(statement.parameters.operator)} ${toStringCodeBlockExpression(statement.parameters.B)} )`;
  },
};
