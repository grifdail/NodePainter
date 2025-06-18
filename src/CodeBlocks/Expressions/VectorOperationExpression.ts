import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";
import { VectorOperations, VectorOperationTypes } from "../../Utils/math/vectorUtils";

export const VectorOperationExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorOperationExpression",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: VectorOperationExpression.id,
      parameters: {
        A: {
          type: "expression",
          targetType: type,
          constantValue: PortTypeDefinitions[type].createDefaultValue(),
          expression: null,
        },
        operator: {
          type: `option`,
          selectedOption: VectorOperationTypes[0],
          options: VectorOperationTypes,
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

    var comparator = evaluateCodeBlockExpression(statement.parameters.operator, state) as string;
    var func = VectorOperations[comparator];
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
