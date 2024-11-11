import { CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression } from "../../Types/CodeBlock";

export const AssignStatement: CodeBlockStatementGenerator = {
  id: `Assign`,
  execute(block, context) {
    let result = evaluateExpression(block.parameters.value, context);
    let variableName = block.parameters.target.value as string;
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
          value: null,
          defaultValue: 0,
        },
        value: {
          type: "value",
          value: null,
          defaultValue: 0,
        },
      },
    };
    return data;
  },
};
