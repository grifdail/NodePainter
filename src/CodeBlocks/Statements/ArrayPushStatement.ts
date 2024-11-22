import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";
import { CommonTypes, PortType } from "../../Types/PortType";
import { createDefaultValue } from "../../Utils/createDefaultValue";

export const ArrayPushStatements: CodeBlockStatementGenerator[] = CommonTypes.map((type) => {
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
            constantValue: createDefaultValue(type),
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
