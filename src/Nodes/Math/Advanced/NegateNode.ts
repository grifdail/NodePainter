import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorScale } from "../../../Utils/math/vectorUtils";

export const NegateNode: NodeDefinition = {
  id: "Math/Advanced/Negate",
  alias: "Invert",
  description: "Returns the inverse value of input",
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
  ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["x"], ["out"]),
  getData: (portId, nodeData, context) => {
    var input = context.getInputValueVector(nodeData, "input");
    return enforceCorrectVectorTypeForNode(nodeData, vectorScale(input, -1));
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `- ${input}`);
  },
};
