import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";

export const ArrayPushStatements: CodeBlockStatementGenerator[] = portTypesWithTags(["common"], ["array"]).map((type) => {
  var self: CodeBlockStatementGenerator = {
    id: `Array/Push/${type}`,
    execute(block, context) {
      let result = evaluateExpression(block.parameters.value, context);
      let variableName = evaluateExpression(block.parameters.target, context);
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
      return `Push ${toStringExpression(statement.parameters.value)} to array ${toStringExpression(statement.parameters.target)}`;
    },
  };
  return self;
});
