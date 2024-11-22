import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, executeStatementParameter, toStringExpression } from "../../Types/CodeBlock";

export const WhileStatement: CodeBlockStatementGenerator = {
  id: "While",
  execute(block, context) {
    while (evaluateExpression(block.parameters.condition, context) as boolean) {
      executeStatementParameter(block.parameters.do, context);
    }
  },
  create() {
    var data: CodeBlockStatement = {
      type: WhileStatement.id,
      parameters: {
        condition: {
          type: "expression",
          targetType: "bool",
          expression: null,
          constantValue: false,
        },
        do: {
          type: "statements",
          statements: [],
        },
      },
    };
    return data;
  },
  toString(statement) {
    return `While ${toStringExpression(statement.parameters.condition)}`;
  },
};
