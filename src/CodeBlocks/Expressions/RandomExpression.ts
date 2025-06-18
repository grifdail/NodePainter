import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { PortType } from "../../Types/PortType";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";

export const RandomExpression: CodeBlockExpressionGenerator = {
  id: "Random",
  create: function (type: PortType): CodeBlockStatement {
    return {
      type: RandomExpression.id,
      parameters: {},
    };
  },
  canEvaluateTo: function (type: PortType): boolean {
    return type === "number";
  },
  evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
    return Math.random();
  },
  toString(statement) {
    return `random`;
  },
};
