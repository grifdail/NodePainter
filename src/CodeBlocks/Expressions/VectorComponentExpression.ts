import { CodeBlockExpressionGenerator, CodeBlockStatement, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";
import { FunctionContext } from "../../Utils/createExecutionContext";

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
            constantValue: createDefaultValue(type as PortType),
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
      var a = evaluateExpression(statement.parameters.vector, state) as number[];

      var component = evaluateExpression(statement.parameters.component, state) as string;
      return a[Mapping[component as keyof typeof Mapping]];
    },
    toString(statement) {
      return `${toStringExpression(statement.parameters.vector)}.${toStringExpression(statement.parameters.component)}`;
    },
  };
  return self;
});
