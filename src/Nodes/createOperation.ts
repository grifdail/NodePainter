import { Icon, IconMathSymbols } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";

export function createOperation(id: string, evalOperation: (a: number, b: number) => number, description?: string, icon?: Icon, shaderCode?: (a: string, b: string) => string): NodeDefinition {
  var result: NodeDefinition = {
    id: id,
    tags: ["Math"],
    icon: icon || IconMathSymbols,
    description: description,
    dataInputs: [
      {
        id: "a",
        type: "number",
        defaultValue: 0,
      },
      {
        id: "b",
        type: "number",
        defaultValue: 0,
      },
    ],
    dataOutputs: [
      {
        id: "result",
        type: "number",
        defaultValue: 0,
      },
    ],
    executeOutputs: [],
    settings: [],
    getData: (portId, nodeData, context) => {
      const a = context.getInputValueNumber(nodeData, "a");
      const b = context.getInputValueNumber(nodeData, "b");
      return evalOperation(a, b);
    },
    getShaderCode: !shaderCode
      ? undefined
      : (node, context) => {
          if (shaderCode) {
            return `float ${context.getShaderVar(node, "result", true)} = ${shaderCode(context.getShaderVar(node, "a"), context.getShaderVar(node, "b"))};`;
          }
          return "";
        },
  };

  return result;
}