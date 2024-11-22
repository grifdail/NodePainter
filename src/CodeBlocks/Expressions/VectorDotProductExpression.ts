import { VectorDotProduct } from "../../Nodes/Vector/DotProduct";
import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { FunctionContext } from "../../Utils/createExecutionContext";

export const VectorDotProductExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorDotProduct",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: VectorDotProductExpression.id,
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
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "vector2" || type === "vector3" || type === "color" || type === "vector4";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateExpression(statement.parameters.A, state) as number[];
    var b = evaluateExpression(statement.parameters.B, state) as number[];

    return VectorDotProduct(a, b);
  },
  toString(statement) {
    return `${toStringExpression(statement.parameters.A)} ⋅ ${toStringExpression(statement.parameters.B)}`;
  },
};
