import { CodeBlockStatement } from "../../Types/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Types/evaluateCodeBlockExpression";
import { executeStatementParameter } from "../../Types/executeStatementParameter";
import { toStringCodeBlockExpression } from "../../Types/toStringCodeBlockExpression";

export const IfStatement: CodeBlockStatementGenerator = {
  id: "if",
  execute(block, context) {
    var result = evaluateCodeBlockExpression(block.parameters.condition, context) as boolean;
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
    return `If ${toStringCodeBlockExpression(statement.parameters.condition)}`;
  },
};
