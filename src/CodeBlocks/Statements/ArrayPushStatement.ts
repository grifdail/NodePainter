import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlock/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";

export const ArrayPushStatements: CodeBlockStatementGenerator[] = portTypesWithTags(["common"], ["array"]).map((type) => {
  var self: CodeBlockStatementGenerator = {
    id: `Array/Push/${type}`,
    execute(block, context) {
      let result = evaluateCodeBlockExpression(block.parameters.value, context);
      let variableName = evaluateCodeBlockExpression(block.parameters.target, context);
      if (context[variableName]) {
        context[variableName].value = [...context[variableName].value, result];
      } else {
        console.warn(`Trying to asign variable ${variableName} which does not exist`);
      }
    },
    create() {
      var data: CodeBlockStatement = {
        type: self.id,
        parameters: {
          target: {
            type: `variable`,
            targetType: `array-${type}` as PortType,
          },
          value: {
            type: "expression",
            targetType: type,
            constantValue: PortTypeDefinitions[type].createDefaultValue(),
            expression: null,
          },
        },
      };
      return data;
    },
    toString(statement) {
      return `Push ${toStringCodeBlockExpression(statement.parameters.value)} to array ${toStringCodeBlockExpression(statement.parameters.target)}`;
    },
  };
  return self;
});
