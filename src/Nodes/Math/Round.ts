import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { enforceCorrectVectorTypeForNode } from "../../Utils/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/graph/changeTypeGenerator";

export const Round: NodeDefinition = {
  id: "Round",
  description: "Round down a number to the nearest interger.",
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
  availableTypes: portTypesWithTags(["common", "vector"], ["array"]),
  onChangeType: changeTypeGenerator(["input"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  hasOutput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "input");
    return enforceCorrectVectorTypeForNode(
      nodeData,
      a.map((value) => Math.round(value))
    );
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["input"], ({ input }) => `sign(${input})*floor(abs(${input})+0.5);`);
  },
};
