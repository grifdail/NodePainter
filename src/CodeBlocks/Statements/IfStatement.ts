import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, executeStatementParameter, toStringExpression } from "../../Types/CodeBlock";

export const IfStatement: CodeBlockStatementGenerator = {
  id: "if",
  execute(block, context) {
    var result = evaluateExpression(block.parameters.condition, context) as boolean;
    if (result) {
      executeStatementParameter(block.parameters.then, context);
    } else {
      executeStatementParameter(block.parameters.else, context);
    }
  },
  create() {
    var data: CodeBlockStatement = {
      type: "if",
      parameters: {
        condition: {
          type: "expression",
          targetType: "bool",
          expression: null,
          constantValue: false,
        },
        then: {
          type: "statements",
          statements: [],
        },
        else: {
          type: "statements",
          statements: [],
        },
      },
    };
    return data;
  },
  toString(statement) {
    return `If ${toStringExpression(statement.parameters.condition)}`;
  },
};
