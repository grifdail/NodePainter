import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ReciprocalNode: NodeDefinition = {
  id: "Math/Advanced/Reciprocal",
  description: "Returns the result of 1 divided by the input",
  icon: IconMathFunction,
  tags: ["Math"],
  dataInputs: [
    {
      id: "input",
      type: "number",
      defaultValue: 0,
    },
  ],
  dataOutputs: [
    {
      id: "out",
      type: "number",
      defaultValue: 0,
    },
  ],

  codeBlockType: "expression",
  settings: [],
  getData: (portId, nodeData, context) => {
    var input = context.getInputValueNumber(nodeData, "input");
    return 1 / input;
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `1 / ${input}`);
  },
};
