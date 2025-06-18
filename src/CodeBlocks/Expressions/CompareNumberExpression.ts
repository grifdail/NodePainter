import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { PortType } from "../../Types/PortType";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { Comparator, ComparatorOps } from "../../Utils/math/logicUtils";

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
    var a = evaluateCodeBlockExpression(statement.parameters.A, state) as number;
    var b = evaluateCodeBlockExpression(statement.parameters.B, state) as number;

    var comparator = evaluateCodeBlockExpression(statement.parameters.comparator, state) as string;
    var func = Comparator[comparator];
    if (func !== undefined) {
      return func(a, b) as boolean;
    } else {
      return false;
    }
  },
  toString(statement) {
    return `( ${toStringCodeBlockExpression(statement.parameters.A)} is ${toStringCodeBlockExpression(statement.parameters.comparator)} ${toStringCodeBlockExpression(statement.parameters.B)} )`;
  },
};
