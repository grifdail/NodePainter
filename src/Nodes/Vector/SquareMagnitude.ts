import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { vectorSquareMagnitude } from "../../Utils/math/vectorUtils";

export const SquareMagnitude: NodeDefinition = {
  id: "SquareMagnitude",
  description: "Return the squared length of a vector",
  alias: "Square Length",
  icon: IconArrowUpRightCircle,
  tags: ["Vector"],
  dataInputs: [
    {
      id: "vec",
      type: "vector2",
      defaultValue: createVector2(),
    },
  ],
  dataOutputs: [
    {
      id: "length",
      type: "number",
      defaultValue: 0,
    },
  ],

  codeBlockType: "expression",
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["common", "vector"], ["array"]), ["vec"], []),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    return vectorSquareMagnitude(vec);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "length", ["vec"], ({ vec }) => `dot(${vec},${vec})`);
  },
};
