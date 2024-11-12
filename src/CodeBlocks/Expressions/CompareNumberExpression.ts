import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { Comparator, ComparatorOps } from "../../Utils/logicUtils";

export const CompareNumberExpression: CodeBlockExpressionGenerator = {
  id: "CompareNumber",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: CompareNumberExpression.id,
      parameters: {
        A: {
          type: "expression",
          targetType: `number`,
          constantValue: 0,
          expression: null,
        },
        comparator: {
          type: `option`,
          selectedOption: ComparatorOps[0],
          options: ComparatorOps,
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
    return type === "bool";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateExpression(statement.parameters.A, state) as number;
    var b = evaluateExpression(statement.parameters.B, state) as number;

    var comparator = evaluateExpression(statement.parameters.comparator, state) as string;
    var func = Comparator[comparator];
    if (func !== undefined) {
      return func(a, b) as boolean;
    } else {
      return false;
    }
  },
  toString(statement) {
    return `( ${toStringExpression(statement.parameters.A)} is ${toStringExpression(statement.parameters.comparator)} ${toStringExpression(statement.parameters.B)} )`;
  },
};
