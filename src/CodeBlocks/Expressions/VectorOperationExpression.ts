import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { FunctionContext } from "../../Utils/createExecutionContext";
import { VectorOperations, VectorOperationTypes } from "../../Utils/vectorUtils";

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
    var a = evaluateExpression(statement.parameters.A, state) as number[];
    var b = evaluateExpression(statement.parameters.B, state) as number[];

    var comparator = evaluateExpression(statement.parameters.operator, state) as string;
    var func = VectorOperations[comparator];
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
