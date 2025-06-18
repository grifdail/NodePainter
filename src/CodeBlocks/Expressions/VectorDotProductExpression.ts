import { VectorDotProduct } from "../../Nodes/Vector/DotProduct";
import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";

export const VectorDotProductExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorDotProduct",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: VectorDotProductExpression.id,
      parameters: {
        A: {
          type: "expression",
          targetType: type,
          constantValue: PortTypeDefinitions[type].createDefaultValue(),
          expression: null,
        },
        B: {
          type: "expression",
          targetType: type,
          constantValue: PortTypeDefinitions[type].createDefaultValue(),
          expression: null,
        },
      },
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "vector2" || type === "vector3" || type === "color" || type === "vector4";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var a = evaluateCodeBlockExpression(statement.parameters.A, state) as number[];
    var b = evaluateCodeBlockExpression(statement.parameters.B, state) as number[];

    return VectorDotProduct(a, b);
  },
  toString(statement) {
    return `${toStringCodeBlockExpression(statement.parameters.A)} ⋅ ${toStringCodeBlockExpression(statement.parameters.B)}`;
  },
};
