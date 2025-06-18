import { CodeBlockStatement } from "../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementGenerator } from "../../Types/CodeBlock/CodeBlockStatementGenerator";
import { evaluateCodeBlockExpression } from "../../Utils/codeblock/evaluateCodeBlockExpression";
import { executeStatementParameter } from "../../Utils/codeblock/executeStatementParameter";
import { toStringCodeBlockExpression } from "../../Utils/codeblock/toStringCodeBlockExpression";

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
