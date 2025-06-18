import { CodeBlockExpressionGenerator } from "../../Types/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlockStatement";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { vectorDistance, vectorSquareDistance } from "../../Utils/math/vectorUtils";

export const VectorDistanceExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorDistance",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: VectorDistanceExpression.id,
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
    var a = evaluateCodeBlockExpression(statement.parameters.A, state) as number[];
    var b = evaluateCodeBlockExpression(statement.parameters.B, state) as number[];

    var comparator = evaluateCodeBlockExpression(statement.parameters.operation, state) as string;
    return comparator === "Distance" ? vectorDistance(a, b) : vectorSquareDistance(a, b);
  },
  toString(statement) {
    return `${toStringCodeBlockExpression(statement.parameters.operator)} from ${toStringCodeBlockExpression(statement.parameters.A)} to ${toStringCodeBlockExpression(statement.parameters.B)}`;
  },
};
