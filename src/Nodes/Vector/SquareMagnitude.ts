import { IconArrowUpRightCircle } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { createVector2 } from "../../Types/vectorDataType";
import { changeTypeGenerator, hasInputGenerator } from "../../Utils/changeTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/generateShaderCodeFromNodeData";
import { VectorSquareMagnitude } from "../../Utils/vectorUtils";

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

  settings: [],
  availableTypes: portTypesWithTags(["common", "vector"], ["array"]),
  onChangeType: changeTypeGenerator(["vec"], []),
  hasInput: hasInputGenerator(portTypesWithTags(["common", "vector"], ["array"])),
  getData: (portId, nodeData, context) => {
    var vec = context.getInputValueVector(nodeData, "vec");
    return VectorSquareMagnitude(vec);
  },
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "length", ["vec"], ({ vec }) => `dot(${vec},${vec})`);
  },
};
