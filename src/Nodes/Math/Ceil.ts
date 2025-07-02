import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Ceil: NodeDefinition = {
  id: "Math/Ceil",
  description: "Round up a number to the smallest interger larger or equal to itself.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
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
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["input"], ["out"]),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "input");
    return enforceCorrectVectorTypeForNode(
      nodeData,
      a.map((value) => Math.ceil(value))
    );
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `ceil(${input})`);
  },
  codeBlockType: "expression",
};
