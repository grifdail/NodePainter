import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression } from "../../Types/CodeBlock";

export const LogStatement: CodeBlockStatementGenerator = {
  id: "Log",
  execute(block, context) {
    var result = evaluateExpression(block.subExpressions.text, context);
    console.log(result);
  },
  create() {
    var data: CodeBlockStatement = {
      type: LogStatement.id,
      subExpressions: {
        text: {
          type: "string",
          value: null,
          defaultValue: "Hello world !",
        },
      },
    };
    return data;
  },
};
