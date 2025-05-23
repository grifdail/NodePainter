import { IconCalculator } from "@tabler/icons-react";
import { NodeDefinition } from "../Types/NodeDefinition";
import { convertToShaderValue } from "../Utils/convertToShaderValue";

export function createConstant(id: string, value: number): NodeDefinition {
  return {
    id: id,
    icon: IconCalculator,
    description: `Mathematical constant. Approximately ${value.toPrecision(4)}.`,
    tags: ["Math", "constant"],
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
      return `float ${context.getShaderVar(node, "value", "number", true)} = ${convertToShaderValue(value, "number")};`;
    },
  };
}
