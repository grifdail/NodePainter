import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const Floor: NodeDefinition = {
  id: "Floor",
  description: "Round down a number to the largest interger smaller or equal to itself.",
  icon: IconMathFunction,
  tags: ["Math", "Vector"],
  dataInputs: [
    {
      id: "x",
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
  onChangeType: changeTypeGenerator(["x"], ["out"]),
  hasInput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  hasOutput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  getData: (portId, nodeData, context) => {
    var a = context.getInputValueVector(nodeData, "x");
    return enforceCorrectVectorTypeForNode(
      nodeData,
      a.map((value) => Math.floor(value))
    );
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "out", ["x"], ({ x }) => `floor(${x})`);
  },
};
