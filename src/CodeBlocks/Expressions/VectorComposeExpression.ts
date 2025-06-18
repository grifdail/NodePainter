import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockParameterField } from "../../Types/CodeBlock/CodeBlockParameterField";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";

export const VectorComposeExpression: CodeBlockExpressionGenerator = {
  id: "Vector/VectorCompose",
  create: function (type: PortType): CodeBlockStatement {
    const createParameters = (label: string): CodeBlockParameterField => ({
      label,
      type: "expression",
      targetType: "number",
      constantValue: 0,
      expression: null,
    });
    var parameters: CodeBlockStatement["parameters"] = {};
    const vec = PortTypeDefinitions[type].vectorLength as number;
    for (let index = 0; index < vec; index++) {
      parameters[index.toString()] = createParameters(type === "color" ? "rgba"[index] : "xyzw"[index]);
    }
    return {
      type: VectorComposeExpression.id,
      parameters: parameters,
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "vector2" || type === "vector3" || type === "color" || type === "vector4";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    var array: number[] = [];
    for (let index = 0; index < 4; index++) {
      if (statement.parameters[index.toString()]) {
        array.push(evaluateCodeBlockExpression(statement.parameters[index.toString()], state) as number);
      }
    }

    return array;
  },
  toString(statement) {
    var array: string[] = [];
    for (let index = 0; index < 4; index++) {
      if (statement.parameters[index.toString()]) {
        array.push(toStringCodeBlockExpression(statement.parameters[index.toString()]));
      }
    }
    return array.toString();
  },
};
