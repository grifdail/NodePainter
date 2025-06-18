import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlock/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";

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
