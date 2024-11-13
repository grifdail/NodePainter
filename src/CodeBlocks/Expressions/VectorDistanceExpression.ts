import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { VectorDistance, VectorSquareDistance } from "../../Utils/vectorUtils";

export const VectorDistanceExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorDistance",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: VectorDistanceExpression.id,
      parameters: {
        A: {
          type: "expression",
          targetType: type,
          constantValue: createDefaultValue(type),
          expression: null,
        },
        B: {
          type: "expression",
          targetType: type,
          constantValue: createDefaultValue(type),
          expression: null,
        },
        operation: {
          type: `option`,
          selectedOption: "Distance",
          options: ["Distance", "Square Distance"],
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "vector2" || type === "vector3" || type === "color" || type === "vector4";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateExpression(statement.parameters.A, state) as number[];
    var b = evaluateExpression(statement.parameters.B, state) as number[];

    var comparator = evaluateExpression(statement.parameters.operation, state) as string;
    return comparator === "Distance" ? VectorDistance(a, b) : VectorSquareDistance(a, b);
  },
  toString(statement) {
    return `${toStringExpression(statement.parameters.operator)} from ${toStringExpression(statement.parameters.A)} to ${toStringExpression(statement.parameters.B)}`;
  },
};
