import { IconMathFunction } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { changeTypeGenerator } from "../../../Utils/graph/definition/changeTypeGenerator";
import { enforceCorrectVectorTypeForNode } from "../../../Utils/graph/execution/enforceCorrectVectorTypeForNode";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ClampNode: NodeDefinition = {
  id: "Math/Advanced/Clamp",
  tags: ["Math"],
  icon: IconMathFunction,
  description: "Constrain a number to be between two other number",
  featureLevel: 5,
  codeBlockType: "expression",
  dataInputs: [
    {
      id: "value",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "min",
      type: "number",
      defaultValue: 0,
    },
    {
      id: "max",
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

  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["value"], ["result"]),
  getData: (portId, nodeData, context) => {
    if (portId === "result") {
      var value = context.getInputValueVector(nodeData, "value");
      var min = context.getInputValueNumber(nodeData, "min");
      var max = context.getInputValueNumber(nodeData, "max");
      return enforceCorrectVectorTypeForNode(nodeData, value.map((v) => Math.max(Math.min(v, max), min)))
    }
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "result", ["value", "min", "max"], ({ value, min, max }) => `clamp(${value}, ${min}, ${max})`);
  },
};
