import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlock/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { executeStatementParameter } from "../../Types/executeStatementParameter";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";

export const WhileStatement: CodeBlockStatementGenerator = {
  id: "While",
  execute(block, context) {
    while (evaluateCodeBlockExpression(block.parameters.condition, context) as boolean) {
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
    return `While ${toStringCodeBlockExpression(statement.parameters.condition)}`;
  },
};
