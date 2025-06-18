import { CodeBlockExpressionGenerator } from "../../Types/CodeBlock/CodeBlockExpressionGenerator";
import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";
import { FunctionContext } from "../../Utils/graph/execution/createExecutionContext";

const Mapping = {
  X: 0,
  Y: 1,
  Z: 2,
  W: 3,
  R: 0,
  G: 1,
  B: 2,
  A: 3,
};

export const VectorComponentExpressions: CodeBlockExpressionGenerator[] = ["vector2", "vector3", "vector4", "color"].map((type: string) => {
  var self: CodeBlockExpressionGenerator = {
    id: `Vector/VectorComponent/${type}`,
    create: function (t: PortType): CodeBlockStatement {
      var options: string[] = [];
      if (type === "vector2") {
        options = ["X", "Y"];
      } else if (type === "vector3") {
        options = ["X", "Y", "Z"];
      } else if (type === "vector4") {
        options = ["X", "Y", "Z", "W"];
      } else if (type === "color") {
        options = ["R", "G", "B", "A"];
      }
      return {
        type: self.id,
        parameters: {
          vector: {
            type: "expression",
            targetType: type as PortType,
            constantValue: PortTypeDefinitions[type as PortType].createDefaultValue(),
            expression: null,
          },
          component: {
            type: `option`,
            selectedOption: options[0],
            options: options,
          },
        },
      };
    },
    canEvaluateTo: function (type: PortType): boolean {
      return type === "number";
    },
    evaluate: function (statement: CodeBlockStatement, state: FunctionContext) {
      var a = evaluateCodeBlockExpression(statement.parameters.vector, state) as number[];

      var component = evaluateCodeBlockExpression(statement.parameters.component, state) as string;
      return a[Mapping[component as keyof typeof Mapping]];
    },
    toString(statement) {
      return `${toStringCodeBlockExpression(statement.parameters.vector)}.${toStringCodeBlockExpression(statement.parameters.component)}`;
    },
  };
  return self;
});
