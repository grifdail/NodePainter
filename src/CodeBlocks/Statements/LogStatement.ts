import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlock/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";

export const LogStatement: CodeBlockStatementGenerator = {
  id: "Debug/Log",
  execute(block, context) {
    var result = evaluateCodeBlockExpression(block.parameters.text, context);
    console.log(result);
  },
  create() {
    var data: CodeBlockStatement = {
      type: LogStatement.id,
      parameters: {
        text: {
          type: "expression",
          targetType: "string",
          expression: null,
          constantValue: "Hello world !",
        },
      },
    };
    return data;
  },
  toString(statement) {
    return `Log ${toStringCodeBlockExpression(statement.parameters.text)}`;
  },
};
