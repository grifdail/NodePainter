import { IconCalculator } from "@tabler/icons-react";
import { NodeDefinition } from "../Types/NodeDefinition";
import { convertToShaderNumber } from "../Utils/graph/execution/convertToShaderNumber";

export function createConstant(id: string, value: number): NodeDefinition {
  return {
    id: id,
    icon: IconCalculator,
    description: `Mathematical constant. Approximately ${value.toPrecision(4)}.`,
    tags: ["Math"],
    dataInputs: [],
    dataOutputs: [
      {
        id: "value",
        type: "number",
        defaultValue: 0,
      },
    ],

    settings: [],
    getData: (portId, nodeData, context) => {
      if (portId === "value") {
        return value;
      }
    },
    getShaderCode(node, context) {
      return `float ${context.getShaderVar(node, "value", "number", true)} = ${convertToShaderNumber(value)};`;
    },
  };
}
