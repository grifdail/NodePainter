import { Icon, IconSquareRoot2 } from "@tabler/icons-react";
import { NodeDefinition } from "../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../Utils/graph/execution/generateShaderCodeFromNodeData";

export function createFunc(id: string, evalOperation: (input: any) => any, description?: string, icon?: Icon, shaderCode?: (v: string) => string): NodeDefinition {
  return {
    id: id,
    tags: ["Math"],
    icon: icon || IconSquareRoot2,
    description: description,
    dataInputs: [
      {
        id: "input",
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

    codeBlockType: "expression",
    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "result") {
        var a = context.getInputValueNumber(nodeData, "input");
        return evalOperation(a);
      }
    },
    getShaderCode: !shaderCode
      ? undefined
      : (node, context) => {
          if (shaderCode) {
            return generateShaderCodeFromNodeData(node, context, "result", ["input"], ({ input }) => shaderCode(input));
          }
          return "";
        },
  };
}
