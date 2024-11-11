import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression } from "../../Types/CodeBlock";

export const AssignStatement: CodeBlockStatementGenerator = {
  id: `Assign`,
  execute(block, context) {
    let result = evaluateExpression(block.parameters.value, context);
    let variableName = evaluateExpression(block.parameters.target, context);
    if (context[variableName]) {
      context[variableName] = result;
    } else {
      console.warn(`Trying to asign variable ${variableName} which does not exist`);
    }
  },
  create() {
    var data: CodeBlockStatement = {
      type: AssignStatement.id,
      parameters: {
        target: {
          type: `variable`,
          targetType: "any",
        },
        value: {
          type: "expression",
          targetType: "any",
          constantValue: 0,
          expression: null,
        },
      },
    };
    return data;
  },
};
