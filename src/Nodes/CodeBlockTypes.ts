import { CodeBlockExpressionGenerator, CodeBlockStatement, CodeBlockStatementGenerator, evaluateExpression, executeStatementList } from "../Types/CodeBlock";
import { PortType } from "../Types/PortType";

const CodeBlocks: (CodeBlockStatementGenerator | CodeBlockExpressionGenerator)[] = [
  {
    id: "if",
    execute(block, context) {
      var result = evaluateExpression(block.subExpressions.condition, context) as boolean;
      if (result) {
        executeStatementList(block.subExpressions.then.value as CodeBlockStatement[], context);
      } else {
        executeStatementList(block.subExpressions.else.value as CodeBlockStatement[], context);
      }
    },
    create() {
      var data: CodeBlockStatement = {
        type: "if",
        subExpressions: {
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
  },
  {
    id: "Log",
    execute(block, context) {
      var result = evaluateExpression(block.subExpressions.text, context);
      console.log(result);
    },
    create() {
      var data: CodeBlockStatement = {
        type: "Log",
        subExpressions: {
          text: {
            type: "string" as PortType,
            value: null,
            defaultValue: "Hello world !",
          },
        },
      };
      return data;
    },
  },
];

export const CodeBlockStatementType = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["execute"] !== undefined).map((node) => [node.id, node as CodeBlockStatementGenerator]));
export const CodeBlockExpressionType = Object.fromEntries(CodeBlocks.filter((b) => (b as any)["evaluate"] !== undefined).map((node) => [node.id, node as CodeBlockExpressionGenerator]));
