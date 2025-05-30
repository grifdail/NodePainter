import { CodeBlockStatement } from "../../Types/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";

export const AssignStatement: CodeBlockStatementGenerator = {
  id: `Assign`,
  execute(block, context) {
    let result = evaluateCodeBlockExpression(block.parameters.value, context);
    let variableName = evaluateCodeBlockExpression(block.parameters.target, context);
    if (context[variableName]) {
      context[variableName].value = result;
    } else {
      console.warn(`Trying to asign variable ${variableName} which does not exist`);
    }
  },
  create() {
    var data: CodeBlockStatement = {
      type: AssignStatement.id,
      parameters: {
        target: {
          type: `variable`,
          targetType: "any",
          affectTypes: ["value"],
        },
        value: {
          type: "expression",
          targetType: "any",
          constantValue: 0,
          expression: null,
        },
      },
    };
    return data;
  },
  toString(statement) {
    return `Set ${toStringCodeBlockExpression(statement.parameters.target)} to ${toStringCodeBlockExpression(statement.parameters.value)}`;
  },
};
