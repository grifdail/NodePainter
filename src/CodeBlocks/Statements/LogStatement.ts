import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression } from "../../Types/CodeBlock";

export const LogStatement: CodeBlockStatementGenerator = {
  id: "Log",
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
};
