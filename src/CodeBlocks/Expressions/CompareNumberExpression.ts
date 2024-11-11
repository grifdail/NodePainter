import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression } from "../../Types/CodeBlock";
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
          type: `number`,
          value: null,
          defaultValue: 0,
        },
        comparator: {
          type: `option`,
          value: ComparatorOps[0],
          defaultValue: 0,
          options: ComparatorOps,
        },
        B: {
          type: `number`,
          value: null,
          defaultValue: 0,
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "bool";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateExpression(statement.parameters.A, state) as number;
    var b = evaluateExpression(statement.parameters.A, state) as number;
    var comparator = statement.parameters.comparator.value as string;
    var func = Comparator[comparator];
    if (func !== undefined) {
      return func(a, b) as boolean;
    } else {
      return false;
    }
  },
};
