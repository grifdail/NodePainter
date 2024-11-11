import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, executeStatementList } from "../../Types/CodeBlock";

export const IfStatement: CodeBlockStatementGenerator = {
  id: "if",
  execute(block, context) {
    var result = evaluateExpression(block.parameters.condition, context) as boolean;
    if (result) {
      executeStatementList(block.parameters.then.value as CodeBlockStatement[], context);
    } else {
      executeStatementList(block.parameters.else.value as CodeBlockStatement[], context);
    }
  },
  create() {
    var data: CodeBlockStatement = {
      type: "if",
      parameters: {
        condition: {
          type: "bool",
          value: null,
          defaultValue: false,
        },
        then: {
          type: "statements",
          value: [],
          defaultValue: [],
        },
        else: {
          type: "statements",
          value: [],
          defaultValue: [],
        },
      },
    };
    return data;
  },
};
