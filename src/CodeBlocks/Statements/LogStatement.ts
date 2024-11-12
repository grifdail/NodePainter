import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, toStringExpression } from "../../Types/CodeBlock";

export const LogStatement: CodeBlockStatementGenerator = {
  id: "Debug/Log",
  execute(block, context) {
    var result = evaluateExpression(block.parameters.text, context);
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
    return `Log ${toStringExpression(statement.parameters.text)}`;
  },
};
